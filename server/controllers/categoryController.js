
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createCategory = async (req, res) => {
    const { categoryName } = req.body;

    if (!categoryName) {
        return res.status(422).send({
            success: false,
            message: "Category name is required"
        })
    }
    try {
        const isCategoryExist = await prisma.category.findUnique({
            where: {
                name: categoryName
            }
        })
        if (isCategoryExist) {
            return res.status(409).send({
                success: false,
                message: "Category exisit"
            })
        }

        const newCategory = await prisma.category.create({
            data: { name: categoryName }
        })

        return res.status(200).send({
            success: true,
            message: 'Category created Successfully',
            data: newCategory
        })


    } catch (err) {

        return res.status(500).send({
            success: false,
            message: err,
            error: err
        })
    }




}

const updateCategory = async (req, res) => {
    const { categoryName, categoryId } = req.body;

    if (!categoryName || !categoryId) {
        return res.status(422).send({
            success: false,
            message: `Category ${!categoryName ? ' name' : !categoryId ? "ID" : ''}  is required`
        })
    }
    try {
        const updatedCategory = await prisma.category.update({
            where: {
                id: categoryId
            },
            data: {
                name: categoryName
            }
        })

        return res.status(200).send({
            success: true,
            message: 'Category Updated Successfully',
            data: updatedCategory
        })


    } catch (err) {

        return res.status(500).send({
            success: false,
            message: err,
            error: err
        })
    }




}


const deleteCategory = async (req, res) => {
    const { categoryName, categoryId } = req.body;

    if (!categoryId) {
        return res.status(422).send({
            success: false,
            message: `Category Id is required`
        })
    }
    try {
        const updatedCategory = await prisma.category.update({
            where: {
                id: categoryId
            },
            data: {
                status: "Inactive",
                deleted_at: new Date()
            }

        })

        return res.status(200).send({
            success: true,
            message: 'Category Deleted Successfully',
        })


    } catch (err) {

        return res.status(500).send({
            success: false,
            message: err,
            error: err
        })
    }




}

const categoryList = async (req, res) => {
    try {
        const categoryList = await prisma.category.findMany({
            orderBy: {
                created_at: "desc"
            },
            where: {
                status: "Active"
            }

        })
        return res.status(200).send({
            success: true,
            message: 'All Catehory list',
            data: categoryList
        })


    } catch (err) {

        return res.status(500).send({
            success: false,
            message: err,
            error: err
        })
    }

}

module.exports = { createCategory, updateCategory, deleteCategory, categoryList }