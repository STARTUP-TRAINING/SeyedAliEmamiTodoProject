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
    const newState = { ...state };
    newState.cols.todo.push({ id: ++newState.lastID, title });
    setState(newState);
};

const changeTaskColumn = (taskId, srcColumn, destColumn) => {
    const newState = { ...state };
    const task = newState.cols[srcColumn].filter(({ id }) => id === taskId)[0];
    const otherTasks = newState.cols[srcColumn].filter(
        ({ id }) => id !== taskId
    );
    newState.cols[srcColumn] = otherTasks;
    newState.cols[destColumn].push(task);
    setState(newState);
};

const removeTask = (srcColumn, taskId) => {
    const newState = { ...state };
    const otherTasks = newState.cols[srcColumn].filter(
        ({ id }) => id !== taskId
    );
    newState.cols[srcColumn] = otherTasks;
    setState(newState);
};
