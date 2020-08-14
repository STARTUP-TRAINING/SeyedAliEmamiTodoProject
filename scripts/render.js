function render() {
    elements.cols.innerHTML = "";
    let columns = Object.keys(state.cols);

    columns.map((col) => {
        let tasks = state.cols[col];
        let tasksHtml = tasks
            .map((task) => Task(task.title, task.id, col))
            .join("");
        elements.cols.innerHTML += Column(col, tasksHtml);
    });
}
