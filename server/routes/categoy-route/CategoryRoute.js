
const express = require('express');
const authMiddelWare = require('../../middleware/AuthMiddleware');
const { createCategory, updateCategory, deleteCategory, categoryList } = require('../../controllers/categoryController');

const router = express.Router();

router.get("/", categoryList)

router.post('/create', authMiddelWare, createCategory)

router.put('/update', authMiddelWare, updateCategory)

router.post('/delete', authMiddelWare, deleteCategory)





module.exports = router