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
