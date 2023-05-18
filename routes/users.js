const controller = require('../controllers/users');
const authController = require('../controllers/userAuthController');
const authMiddleware = require('../middleware/userAuth');
const router = require('express').Router();

// signup endpoint
//passing the middleware function to the signup
router.post('/signup', authMiddleware.saveUser, authController.signup)

// CRUD Routes /users
router.get('/', controller.getUsers); // /users
router.get('/:userId', controller.getUser); // /users/:userId
router.post('/', controller.createUser); // /users
router.put('/:userId', controller.updateUser); // /users/:userId
router.delete('/:userId', controller.deleteUser); // /users/:userId

module.exports = router;