elements.addTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = elements.input.value.trim();
    if (!value.length) return;
    elements.input.value = "";
    addTask(value);
});

elements.addCol.addEventListener("click", () => {
    addColumn(prompt("Enter the column name please"));
});

render();
