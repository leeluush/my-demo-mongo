const Todo = require('../models/todo');


async function getTodo (req,res) {
    try {
        const todo = await Todo.findOne({
            _id: req.params.todoId
        }).exec();

        res.json(todo);
    } catch{
        res.status(500).json({message: 'server error'})
    }
}

 async function createTodo (req, res) {
    const todo = await new Todo();
    todo.task = "my new task form node";
    todo.isDone = false;
    todo.user = "lee";
    try {
        await todo.save();

        res.send('created!')
    } catch (error) {
        res.send(error)
    }

}

// deletes all to dos 

async function deleteAllToDos(req, res) {
    try {
        await Todo.deleteMany({ user: 'lee' });
        res.send('removed')
    } catch (error) {
        res.send(error)
    }

}

 async function deleteToDo (req, res) {
    try {
        await Todo.deleteOne({ user: 'lee' });
        res.send('removed')
    } catch (error) {
        res.send(error)
    }

}


async function updateToDo (req, res)  {
    try {
        await Todo.updateOne({ _id: isObjectId("") }, { $set: { task: String } })
        res.send('updated')
    } catch (error) {
        res.send(error)
    }
}


async function getAllToDo (req, res)  {

    try {
        const todos = await Todo.find({})
        res.json({ todos })
    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    getTodo,
    createTodo,
    deleteAllToDos,
    deleteToDo,
    updateToDo,
    getAllToDo

}