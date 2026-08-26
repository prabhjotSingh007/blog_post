const express = require('express');
const router = express.Router();
const authMiddelWare = require('../../middleware/AuthMiddleware');
const { getHomePageBlogList, getAllBlogList, getUserCreatedBlogList, addBlog } = require('../../controllers/BlogController');


router.get('/home', getHomePageBlogList);
router.get('/all', getAllBlogList);
router.get('/user', authMiddelWare, getUserCreatedBlogList);


router.post('/create', authMiddelWare, addBlog);



module.exports = router