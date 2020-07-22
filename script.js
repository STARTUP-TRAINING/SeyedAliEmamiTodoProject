let input = document.getElementById("input");
let actions = ["Todo", "Doing", "Done"];
let lastID = 0;

function change(id, dest) {
    let element = document.getElementById(`task${id}`);
    document.getElementById(dest).append(element);
}
function remove(id) {
    let element = document.getElementById(`task${id}`);
    element.remove();
}
function createTask(title) {
    let actionsBox = document.createElement("div");
    actionsBox.classList.add("action-box");
    let id = lastID;
    actions.map((act) => {
        let action = document.createElement("div");
        action.classList.add("box", "action");
        action.innerText = act;
        action.addEventListener("click", function (e) {
            change(id, act);
        });
        actionsBox.append(action);
    });

    let action = document.createElement("div");
    action.classList.add("box", "action");
    action.innerText = "Remove";
    action.addEventListener("click", function (e) {
        remove(id);
    });

    actionsBox.append(action);

    let task = document.createElement("div");
    task.classList.add("box", "task");
    task.id = `task${lastID}`;
    let taskTitle = document.createElement("div");
    taskTitle.classList.add("task-title");
    taskTitle.innerText = title;
    lastID++;
    task.append(taskTitle);
    task.append(actionsBox);
    return task;
}
document.getElementById("add-todo").addEventListener("click", function (e) {
    if (input.value.trim() == "") return;

    document.getElementById("Todo").append(createTask(input.value));
});
