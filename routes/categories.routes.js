const router = require('express').Router()
 
const controller = require('../controllers/categories.controllers')

router.get('/api/categories/:catagoryId', controller.getCategories);
router.post('/api/categories', controller.createCategory)
router.put('/api/categories/:catagoryId', controller.updateCategory);
router.delete('/api/categories/:catagoryId', controller.removeCategory); 


module.exports = router; 

