const Joi = require('joi');

const LoginSchema = Joi.object({
        email: Joi.string().email().required("Email is required"),
        password: Joi.string().max(10, "Max 10 character is allowed").required("Password is required")
})


const RegisterSchema = LoginSchema.append({
        name: Joi.string().required("Name is required"),
})

module.exports = { LoginSchema, RegisterSchema }
