const { Router } = require('express');
const taskRouter = require('./task');
const userRouter = require('./user');
const groupRouter = require('./group');

const router = Router();

router.use('/users', userRouter);
router.use('/tasks', taskRouter);
router.use('/groups', groupRouter);

module.exports = router;