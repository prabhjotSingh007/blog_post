const Joi = require('joi');

const LoginSchema = Joi.object({
        email : Joi.string().email().required("Email is required"),
        password : Joi.string().max(10,"Max 10 character is allowed").required("Password is required")
})


module.exports = {LoginSchema}
