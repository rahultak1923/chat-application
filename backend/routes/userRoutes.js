const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// User registration
router.post('/register', userController.registerUser);
// User login
router.post('/login', userController.loginUser);
// Get user profile
// router.get('/profile/:id', userController.getProfile);
// Update user profile
router.put("/profile/:id",userController.updateProfile);
// Get all users
router.get('/allusers', userController.getAllUsers);
// user delete
router.delete('/delete/:id',userController.deleteUser);
// logout user
router.put("/logout/:id",userController.logoutUser)

module.exports = router;