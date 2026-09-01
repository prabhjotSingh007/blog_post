
const { PrismaClient } = require("@prisma/client");
const { returnUserFromToken } = require("../utlits/jwtToken");
const { BlogCreateSchema } = require("../validators/blogValidator");
const { getFileSave } = require("../utlits/multerFileUpload");
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');
const getHomePageBlogList = async (req, res) => {

    const blogList = await prisma.post.findMany({
        orderBy: {
            created_at: 'desc'
        },
        take: 10,
    })

    return res.status(200).send({
        success: true,
        message: "Home Blog fetch Successfully",
        data: blogList
    })


}



const getAllBlogList = async (req, res) => {
    const { limit, currentPage, categoryId } = req.query

    const skip = currentPage == 1 ? 0 : (currentPage - 1) * limit;

    try {

        const allBlogList = await prisma.post.findMany({
            orderBy: {
                created_at: 'desc'
            },
            skip: start,
            take: currentPage * limit,
            limit: limit
        })

        return res.status(200).send({
            success: true,
            message: "All Blog fetch Successfully",
            data: allBlogList
        })

    } catch (err) {
        return res.status(500).send({
            success: false,
            error: err,
            message: 'Error'
        })
    }

}




const getUserCreatedBlogList = async (req, res) => {

    const user = req.user

    if (!user) {
        return res.status(500).send({
            success: false,
            message: "User not found",
        })
    }

    try {

        const allBlogListByUser = await prisma.post.findMany({
            where: {
                createdByID: user?.id
            },
            orderBy: {
                created_at: 'desc'
            },
            skip: start,
            take: currentPage * limit,
            limit: limit
        })

        return res.status(200).send({
            success: true,
            message: "Blog list fetch Successfully",
            data: allBlogListByUser
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            error: err,
            message: 'Error'
        })
    }


}


const addBlog = async (req, res) => {

    const user = req.user;

    if (!user) {
        return res.status(500).send({
            success: false,
            message: "User not found",
        })
    }

    const { categoryId, name, description, status } = req.body;
    const file = req.file;


    if (!categoryId || !name || !description || !status) {
        return res.status(412).send({
            success: false,
            message: `${!categoryId ? 'catrgory Id' : !name ? "name" : !description ? 'description'
                : !status ? 'status' : ''
                } field is missing`
        })
    }

    const { value, error } = BlogCreateSchema.validate(req.body)



    if (error) {
        return res.status(400).send({
            success: false,
            error: error
        })
    }


    try {

        const fileDirectory = '../public/uploads/post'

        let filename = null;
        if (file) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const extension = path.extname(file.originalname);
            filename = file.fieldname + '-' + uniqueSuffix + extension;
        }

        const blogAdded = await prisma.post.create({
            data: { ...value, categoryId: Number(value.categoryId), createdByID: user?.id }
        })

        const mediaFile = await prisma.mediapost.create({
            data: {
                path: '/post',
                fullPath: fileDirectory,
                mediaName: filename,
                mimeType: file?.mimetype,
                userId: user?.id,
                postId: blogAdded?.id
            }
        })

        if (file) {
            const uploadDir = path.join(__dirname, fileDirectory);
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, {
                    recursive: true
                });
            }
            const filePath = path.join(uploadDir, filename);
            fs.writeFileSync(
                filePath,
                file.buffer
            );
        }

        return res.status(200).send({
            success: true,
            message: "Blog created Successfully",
            data: { ...blogAdded, blo: mediaFile },
        })
    } catch (err) {

        console.log(err)

        return res.status(500).send({
            success: false,
            error: err,
            message: 'Error'
        })
    }

}



module.exports = { getHomePageBlogList, getAllBlogList, getUserCreatedBlogList, addBlog }