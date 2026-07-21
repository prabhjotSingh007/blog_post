const express = require('express');
const { login, register } = require('../../controllers/AuthController');
const router = express.router();

router.post('/login', login)
router.post('/register',register )

