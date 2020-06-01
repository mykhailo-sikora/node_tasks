const userRouter = require('express').Router();
const {isUserValid} = require('../../middlewares');

const {userController} = require('../../controllers');

userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUser);
userRouter.post('/', isUserValid, userController.createUser);
userRouter.put('/:id', isUserValid, userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);
userRouter.post('/auth', userController.authUser);

module.exports = userRouter;
