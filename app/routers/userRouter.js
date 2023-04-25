const userController = require('../controllers/userController');
const router = require('express').Router();


router.post('/signUp', userController.signUp);
router.post('/updateUser:id', userController.updateUser);
router.post('/deleteUser', userController.deleteUser);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/forgotPassword', userController.forgotPassword);
router.post('/resetPassword', userController.resetPassword);
router.get('/getUsers', userController.getUsers);
router.get('/getUser', userController.getUser);

module.exports = router;