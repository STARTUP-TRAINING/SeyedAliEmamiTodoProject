let input = document.getElementById("input");
let actions = ["Todo", "Doing", "Done"];
let lastID = 0;
const generateTaskId = (id) => `task${id}`;
const getTaskById = (id) => document.getElementById(generateTaskId(id));

const remove = (id) => getTaskById(id).remove();
const changeGroup = (id, dest) =>
    document.getElementById(dest).append(getTaskById(id));

const createTask = (title) => {
    const id = lastID++;
    const actionsBox = document.createElement("div");
    actionsBox.classList.add("action-box");
    actions.map((act) => {
        const action = document.createElement("div");
        action.classList.add("box", "action");
        action.innerText = act;
        action.addEventListener("click", () => changeGroup(id, act));
        actionsBox.append(action);
    });

    const action = document.createElement("div");
    action.classList.add("box", "action");
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
