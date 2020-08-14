const Column = (name, children = "") =>
    `<div class="box col">
        <h3>${capitalize(name)}</h3>
        <div id="${name}" class="task-cat">${children}</div>
    </div>`;

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
