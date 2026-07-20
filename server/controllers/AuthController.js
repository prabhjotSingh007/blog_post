const { LoginSchema } = require("../validators/authValidator")
const { PrismaClient } = require('../generated/prisma/client');
const prisma = new PrismaClient();

const login = async (req, res) => {
    const { email, password } = req.body

    const { value, error } = LoginSchema.validate()

    if (error) {
        res.status(400).send({
            success: false,
            error: error
        })
    }

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (!user) {
        res.status(404).send({
            success: false,
            message:'User not Found' 
        })
    }


}

module.exports = { login }