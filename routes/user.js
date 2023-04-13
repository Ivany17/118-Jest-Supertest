const {Router} = require('express');
const UserController = require('../controllers/user.controller');
const {checkUser} = require('../middlewares/user.mw');
const {paginate} = require('../middlewares/paginate.mw')

const userRouter = Router();

userRouter.post('/', UserController.createUser);
userRouter.get('/', paginate, UserController.getAllUsers);
userRouter.get('/:userId', UserController.getUser);
userRouter.patch('/:userId', UserController.updateUser);
userRouter.patch('/v2/:userId', checkUser, UserController.updateUserInstance);

module.exports = userRouter;