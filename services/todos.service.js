app.get('/api/todos/:todoId', async (req, res) => {
    try {
        const todos = await Todo.findOne({
            _id: req.params.todoId
        }).exec();
        res.json({ todos })
    } catch (error) {
        res.send(error)
    }
})



app.get('/api/new', async (req, res) => {
    const todo = new Todo();
    todo.task = "my new task form node";
    todo.isDone = false;
    todo.user = "lee";
    try {
        await todo.save();

        res.send('created!')
    } catch (error) {
        res.send(error)
    }

})



// deletes all to dos 

app.get('/api/delete-all', async (req, res) => {
    try {
        await Todo.deleteMany({ user: 'lee' });
        res.send('removed')
    } catch (error) {
        res.send(error)
    }

})

// delete one to do 

app.get('/api/delete-one', async (req, res) => {
    try {
        await Todo.deleteOne({ user: 'lee' });
        res.send('removed')
    } catch (error) {
        res.send(error)
    }

})


app.get('/api/update', async (req, res) => {
    try {
        await Todo.updateOne({ _id: isObjectId("") }, { $set: { task: String } })
        res.send('updated')
    } catch (error) {
        res.send(error)
    }
});



app.get('/api/get-all-todos', async (req, res) => {

    try {
        const todos = await Todo.find({})
        res.json({ todos })
    } catch (error) {
        res.send(error)
    }
})

