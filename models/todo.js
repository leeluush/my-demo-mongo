const mongoose = require ('mongoose');

const ObjectId = mongoose.ObjectId;

const TodoSchema = new mongoose.Schema({
    userId: ObjectId,
    content: {type: String, required: true},
    isDone: Boolean,
    user:{type: String, default: false},
    task: String,
    category: String,
    priority: String,
    created: Date,
    update: Date,
}) 

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo;