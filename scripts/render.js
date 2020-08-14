const addColumn = (name) => {
    name = name.trim();
    if (
        Object.keys(state.cols).filter(
            (c) => c.toUpperCase() === name.toUpperCase()
        ).length
    )
        return alert("Duplicate name!\nPlease choose another name!");
    if (name.length === 0) return alert("Empty name is not allowed");
    state.cols[name] = [];
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
