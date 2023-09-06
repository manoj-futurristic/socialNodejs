const userController = require('../controllers/userController');
const router = require('express').Router();


/**
 * @swagger
 * /test:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
 router.get('/test', (req, res) => {
    res.send('Hello World!');
  });


router.post('/signUp', userController.signUp);
router.post('/updateUser:id', userController.updateUser);
router.delete('/deleteUser', userController.deleteUser);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/forgotPassword', userController.forgotPassword);
router.post('/resetPassword', userController.resetPassword);
router.get('/getUsers', userController.getUsers);
router.get('/getUser', userController.getUser);

module.exports = router;