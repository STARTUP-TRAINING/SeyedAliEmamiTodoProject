const elements = {
    cols: document.getElementById("cols"),
    addTaskForm: document.getElementById("add-task-form"),
    input: document.getElementById("input"),
    addCol: document.getElementById("add-col"),
};

const capitalize = (str) => str[0].toUpperCase() + str.slice(1, str.length);

const generateTaskId = (id) => `task${id}`;
