const router = require('express').Router();
 
const controller = require('../controllers/todos.controllers')

router.get('/api/todos/:todoId', controller.getTodo);
router.post('/api/todos', controller.createTodo)
router.put('/api/todos/:todoId', controller.updateToDo);
router.delete('/api/todos/:todoId', controller.deleteToDo); 


module.exports = router; 
