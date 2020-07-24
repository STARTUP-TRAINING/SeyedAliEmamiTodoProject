const input = document.getElementById("input");
const colsContainer = document.getElementById("cols-container");
const addCol = document.getElementById("add-col");

const actionClasses = ["box", "action", "clickable"];
let actions = ["Todo", "Doing", "Done"];
let lastID = 0;
const generateTaskId = (id) => `task${id}`;
const getTaskById = (id) => document.getElementById(generateTaskId(id));
const getAllActionBoxes = () => document.getElementsByClassName("action-box");
const remove = (id) => getTaskById(id).remove();
const changeGroup = (id, dest) =>
    document.getElementById(dest).append(getTaskById(id));

const createAction = (id, actionTitle) => {
    const action = document.createElement("div");
    action.classList.add(...actionClasses);
    action.innerText = actionTitle;
    action.addEventListener("click", () => changeGroup(id, actionTitle));
    return action;
};

const createTask = (title) => {
    const id = lastID++;
    const actionsBox = document.createElement("div");
    actionsBox.classList.add("action-box");
    actionsBox.id = "";
    actions.map((actionTitle) => {
        actionsBox.append(createAction(id, actionTitle));
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
});
