elements.addTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value.trim();
    if (!value.length) return;
    addTask(value);
});

elements.addCol.addEventListener("click", () => {
    addColumn(prompt("Enter the column name please"));
});

render();
