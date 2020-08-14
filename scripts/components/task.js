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

const addTask = (title) => {
    state.cols.todo.push({ id: ++state.lastID, title });
    render();
};

const changeTaskColumn = (taskId, srcColumn, destColumn) => {
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
