const userRouter = require('express').Router();

const {isUserExist, isUserValid, checkFiles, checkUserPhotoCount} = require('../../middlewares');
const {userController} = require('../../controllers');

userRouter.get('/', userController.getUsers);
userRouter.post('/', isUserValid, checkFiles, checkUserPhotoCount, userController.createUser);
userRouter.use('/:userId', isUserExist);
userRouter.get('/:userId', userController.getUser);
userRouter.put('/:userId', isUserValid, checkUserPhotoCount, userController.updateUser);
userRouter.delete('/:userId', userController.deleteUser);
userRouter.post('/auth', userController.authUser);

module.exports = userRouter;
