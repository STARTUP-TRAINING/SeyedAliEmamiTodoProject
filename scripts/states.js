let state = {
    lastID: 0,
    cols: {
        todo: [],
    },
};

setState = (newState) => {
    state = { ...newState };
    render();
};
