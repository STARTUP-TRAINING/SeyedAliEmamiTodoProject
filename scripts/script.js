const input = document.getElementById("input");
const colsContainer = document.getElementById("cols-container");
const addCol = document.getElementById("add-col");

const actionClasses = ["box", "action", "clickable"];
let actions = ["Todo"];
let lastID = 0;
const generateTaskId = (id) => `task${id}`;
const getTaskById = (id) => document.getElementById(generateTaskId(id));
const getAllActionBoxes = () => document.getElementsByClassName("action-box");
const remove = (id) => getTaskById(id).remove();
const changeGroup = (id, dest) => {
    const task = document.getElementById(id);
    if (task.parentNode.id == dest) return;
    document.getElementById(dest).append(task);
};
const createAction = (id, actionTitle) => {
    const action = document.createElement("div");
    action.classList.add(...actionClasses);
    action.innerText = actionTitle;
    action.addEventListener("click", () => changeGroup(id, actionTitle));
    return action;
};

const createGroupColumn = (name) => {
    const EmptyDiv = document.createElement("div");
    const innerDiv = document.createElement("div");
    innerDiv.classList.add("col", "box");
    const header = document.createElement("h3");
    header.innerText = name;
    innerDiv.append(header);
    const taskCat = document.createElement("div");
    taskCat.id = name;
    taskCat.classList.add("task-cat");
    innerDiv.append(taskCat);
    EmptyDiv.append(innerDiv);
    return EmptyDiv;
};

const addGroup = (name) => {
    if (actions.includes(name)) return alert("Duplicate name!");
    actions.push(name);
    colsContainer.insertBefore(createGroupColumn(name), addCol.parentElement);
    const actionBoxes = getAllActionBoxes();
    for (let i = 0, l = actionBoxes.length; i < l; i++) {
        const id = actionBoxes[i].parentElement.id;
        actionBoxes[i].appendChild(createAction(id, name));
    }
};

const createTask = (title) => {
    const id = lastID++;
    const actionsBox = document.createElement("div");
    actionsBox.classList.add("action-box");
    actionsBox.id = "";
    actions.map((actionTitle) => {
        actionsBox.append(createAction(generateTaskId(id), actionTitle));
    });

    const action = document.createElement("div");
    action.classList.add(...actionClasses);
    action.innerText = "Remove";
    action.addEventListener("click", () => remove(id));
    actionsBox.append(action);

    const task = document.createElement("div");
    task.classList.add("box", "task");
    task.id = generateTaskId(id);

    const taskTitle = document.createElement("div");
    taskTitle.classList.add("task-title");
    taskTitle.innerText = title;
    task.append(taskTitle, actionsBox);
    return task;
};

document.getElementById("add-todo").addEventListener("click", () => {
    if (input.value.trim() !== "")
        document.getElementById("Todo").append(createTask(input.value));
    input.value = "";
});
addCol.addEventListener("click", () => {
    addGroup(prompt("Enter the group name please:"));
});
