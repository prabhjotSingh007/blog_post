const { PrismaClient } = require("@prisma/client");
const { createPassword } = require("../utlits/passwordGen");
const prisma = new PrismaClient();

const addAdmin = async () => {

    try {
        const hashPassword = await createPassword(process.env.ADMINPASSWORD);
        const user = await prisma.user.create({

            data: {
                name: 'Admin',
                email: "admin@yopmail.com",
                password: hashPassword,
                role: 'ADMIN'
            }
        })
    } catch (err) {
        console.log(err)
    }

}

addAdmin()
