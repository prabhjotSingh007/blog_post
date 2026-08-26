
const { PrismaClient } = require("@prisma/client");
const { returnUserFromToken } = require("../utlits/jwtToken");
const { BlogCreateSchema } = require("../validators/blogValidator");
const prisma = new PrismaClient();

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

    const { categoryId, name, description } = req.body;

    if (!categoryId || !name || !description) {
        return res.status(412).send({
            success: false,
            message: `${!categoryId ? 'catrgory Id' : !name ? "name" : !description ? 'description'
                : ''
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
        const blogAdded = await prisma.post.create({
            data: { ...value, categoryId: user?.id }
        })
        return res.status(200).send({
            success: success,
            message: "Blog created Successfully",
            data: blogAdded,
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            error: err,
            message: 'Error'
        })
    }

}



module.exports = { getHomePageBlogList, getAllBlogList, getUserCreatedBlogList, addBlog }