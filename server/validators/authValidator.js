const Joi = require('joi');

const LoginSchema = Joi.object({
        email: Joi.string().email().required("Email is required"),
        password: Joi.string().min(1).max(10).required("Password is required")
})


const RegisterSchema = LoginSchema.append({
        name: Joi.string().required("Name is required"),
})

module.exports = { LoginSchema, RegisterSchema }
