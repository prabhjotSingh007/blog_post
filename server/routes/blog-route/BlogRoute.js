const express = require('express');
const router = express.Router();
const authMiddelWare = require('../../middleware/AuthMiddleware');
const { getHomePageBlogList, getAllBlogList, getUserCreatedBlogList, addBlog, getUserBlogList } = require('../../controllers/BlogController');
const { upload } = require('../../utlits/multerFileUpload');


router.get('/', getAllBlogList);
router.get('/home', getHomePageBlogList);
router.post('/create', authMiddelWare, upload.single('blog_image'), addBlog);



module.exports = router