const spress = require("./framework");
const app = spress();

function idCreator() {
    let id = 0;
    return () => id++;
}

const generateId = idCreator();
const database = {
    todo: [],
};

database.todo.push(
    { id: generateId(), title: "t1" },
    { id: generateId(), title: "t2" },
    { id: generateId(), title: "t3" },
    { id: generateId(), title: "t4" }
);

app.use(function (req, res, next) {
    console.log(`${Date().toString()}    [${req.method}]    ${req.url}`);
    next();
});

app.get("/list", function (req, res) {
    res.send(database);
});

app.post("/add/:title", function (req, res) {
    const { title } = req.params;
    if (title === "") {
        return res.send("Empty");
    }
    const task = { id: generateId(), title };
    database.todo.push(task);
    res.send(database);
});

app.post("/changeState/:id/:column", function (req, res) {
    const { id, column } = req.params;
    database[column] = database[column] || [];
    let task = {},
        srcColumn;

    for (let col in database) {
        database[col] = database[col].filter((t) => {
            if (t.id == id) {
                task = t;
                srcColumn = col;
            }
            return t.id != id || col == column;
        });
    }
    if (Object.keys(task).length == 0) return res.send(404, "Task not found");
    if (srcColumn != column) {
        database[column].push(task);
        return res.send(database);
    }
    res.send(400, "Same column");
});

// DELETE
app.post("/remove/:id", function (req, res) {
    const { id } = req.params;
    let isFound = false;
    for (let col in database)
        database[col] = database[col].filter((t) => {
            isFound = isFound || t.id == id;
            return t.id != id;
        });
    if (isFound) return res.send(database);
    res.send(404, "Not found");
});

// PATCH || PUT
app.post("/edit/:id/:title", function (req, res) {
    const { id, title } = req.params;
    let isFound = false;
    for (let col in database) {
        database[col] = database[col].map((t) => {
            if (t.id == id) {
                t.title = title;
                isFound = true;
            }
            return t;
        });
    }
    if (!isFound) return res.send(404, "Task not found");
    return res.send(database);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on :${port}`));
