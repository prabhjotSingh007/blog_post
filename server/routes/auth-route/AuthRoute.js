const express = require('express');
const { login, register, logout } = require('../../controllers/AuthController');
const authMiddelWare = require('../../middleware/AuthMiddleware');
const router = express.Router();

router.post('/login', login)
router.post('/register', register)
router.post('/logout', authMiddelWare, logout)

module.exports = router; 
