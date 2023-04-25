const router = require('express').Router();
 
const controller = require('../controllers/todos.controllers')
const verifyUser = require("../middlewares/verify-user");

router.get('/api/todos', verifyUser, controller.getAllToDo);
router.get('/api/todos/:todoId', verifyUser, controller.getTodo);
router.post('/api/todos',verifyUser,controller.createTodo)
router.put('/api/todos/:todoId', verifyUser,controller.updateToDo);
router.delete('/api/todos/:todoId', verifyUser,controller.deleteToDo); 


module.exports = router; 
