const mongoose = require ('mongoose');

const ObjectId = mongoose.ObjectId;

const TodoSchema = new mongoose.Schema({
    _id: ObjectId,
    userId: ObjectId,
    content: {type: String, required: true},
    isDone: Boolean,
    user:{type: String, default: false},
    task: String,
    catagory: String,
    priority: String,
    created: Date,
    update: Date,
}) 

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo;