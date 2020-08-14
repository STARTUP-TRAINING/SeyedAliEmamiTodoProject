const Column = (name, children = "") =>
    `<div class="box col">
        <h3>${capitalize(name)}</h3>
        <div id="${name}" class="task-cat">${children}</div>
    </div>`;

const Action = (taskId, srcColumn, destColumn) =>
    `<div class="box action clickable" onclick="changeColumn(
        ${taskId},
        '${srcColumn}',
        '${destColumn}'
    )">
        ${capitalize(destColumn)}
    </div>`;

const Task = (title, id, column) =>
    `<div class="box task" id="${generateTaskId(id)}">
        <div class="task-title">${title}</div>
        <div class="action-box">
            ${Object.keys(state.cols)
                .filter((c) => c !== column)
                .map((c) => Action(id, column, c))
                .join("")}
            <div class="box action clickable" onclick="removeTask('${column}',${id})">Remove</div>
        </div>
    </div>`;

const addColumn = (name) => {
    if (
        Object.keys(state.cols).filter(
            (c) => c.toUpperCase() === name.toUpperCase()
        ).length
    )
        return alert("Duplicate name!\nPlease choose another name!");

    state.cols[name] = [];
    render();
};

const changeColumn = (taskId, srcColumn, destColumn) => {
    const task = state.cols[srcColumn].filter(({ id }) => id === taskId)[0];
    const otherTasks = state.cols[srcColumn].filter(({ id }) => id !== taskId);
    state.cols[srcColumn] = otherTasks;
    state.cols[destColumn].push(task);
    render();
};

const removeTask = (srcColumn, taskId) => {
    const otherTasks = state.cols[srcColumn].filter(({ id }) => id !== taskId);
    state.cols[srcColumn] = otherTasks;
    render();
};
const addTask = (title) => {
    console.log(title);
    state.cols.todo.push({ id: ++state.lastID, title });
    console.log(state);
    render();
};
const render = () => {
    elements.cols.innerHTML = "";
    let columns = Object.keys(state.cols);

    columns.map((col) => {
        let tasks = state.cols[col];
        let tasksHtml = tasks
            .map((task) => Task(task.title, task.id, col))
            .join("");
        elements.cols.innerHTML += Column(col, tasksHtml);
    });
};
