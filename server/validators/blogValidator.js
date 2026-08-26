const Joi = require('joi');

const BlogCreateSchema = Joi.object({
    categoryId: Joi.string().required("Category Id is required"),
    name: Joi.string().required("Name is required"),
    description: Joi.string().required("Description is required"),
})


module.exports = { BlogCreateSchema }
