let storage = [];

const form = document.querySelector("form");
const task = document.querySelector(".tasks")
const doing = document.querySelector(".doing")
const done = document.querySelector(".completed")
const btnDone = document.getElementById("done")


class SetTodo {
    constructor({title, description, endDate}) {
        this.title = title;
        this.description = description;
        this.endDate = endDate;
        const date = new Date()
        this._id = Date.now().toString()
        this.startDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        this.status = "task"
    }
}

form.addEventListener("submit", function (e) {
    e.preventDefault()
    const formData = new FormData(form);
    const todo = new SetTodo(Object.fromEntries(formData));
    storage.push(todo)
    localStorage.setItem("todos", JSON.stringify(storage))
    location.reload()
})

storage = JSON.parse(localStorage.getItem("todos")) ?? []
storage.forEach(item => {
        const html = `
                <div class="todo" id="todo-${item._id}">
                    <div class="header">
                        <p>${item.title}</p>
                        <p class="close" onclick="del.call(this,${item._id})">❌</p>
                    </div>
                    <div class="startDate">
                        <p>Start: ${item.startDate}</p>
                        <p>End: ${item.endDate}</p>
                    </div>
                    <div class="description">
                        <p>${item.description}</p>
                    </div>
                    <div class="footer">
                       ${item.status == "task"?  `<button id="del" disabled onClick="backState.call(this,${item._id})">➖</button>`:`<button id="del" onClick="backState.call(this,${item._id})">➖</button>`}
                        <button id="info" onclick="showInfo.call(this)">ℹ️</button>
                        ${item.status=="done"?`<button id="done" disabled onclick="forwardState.call(this,${item._id})">✔️</button>`:`<button id="done" onclick="forwardState.call(this,${item._id})">✔️</button>`}
                    </div>
                </div>`
        if (item.status === "task") {
            task.insertAdjacentHTML("beforeend", html)
        } else if (item.status === "doing") {
            doing.insertAdjacentHTML("beforeend", html)
        } else if (item.status === "done") {
            done.insertAdjacentHTML("beforeend", html)
        }
    }
)


function forwardState(id) {
    const find = storage.find(item => item._id == id)
    if (find.status === "doing") find.status = "done"
    if (find.status === "task") find.status = "doing"
    localStorage.setItem("todos", JSON.stringify(storage))
    location.reload()

}

function backState(id) {
    const find = storage.find(item => item._id == id)
    if (find.status === "doing") find.status = "task"
    if (find.status === "done") find.status = "doing"
    localStorage.setItem("todos", JSON.stringify(storage))
    location.reload()

}

function showInfo() {
    this.parentElement.previousElementSibling.classList.toggle('show')
}
function del(id) {
    const filter = storage.filter(item => item._id != id)
    storage=filter
    localStorage.setItem("todos", JSON.stringify(storage))
    location.reload()
}