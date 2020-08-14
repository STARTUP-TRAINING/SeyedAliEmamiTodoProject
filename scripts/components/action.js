const Action = (taskId, srcColumn, destColumn) =>
    `<div class="box action clickable" onclick="changeTaskColumn(
        ${taskId},
        '${srcColumn}',
        '${destColumn}'
    )">
        ${capitalize(destColumn)}
    </div>`;
