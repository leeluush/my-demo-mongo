const router = require('express').Router();
const postsRouter = require('./post.routes');
const categoriesRouter = require('./categories.routes');
const todosRouter = require('./todos.routes');
const authRouter = require('./auth');

router.use(todosRouter);
router.use(postsRouter);
router.use(categoriesRouter);
router.use(authRouter);


module.exports = router;
