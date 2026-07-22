const { PrismaClient } = require("@prisma/client");
const { createPassword } = require("../utlits/passwordGen");
const prisma = new PrismaClient();

const addAdmin = async () => {

    console.log(process.env.ADMINPASSWORD,"process.env.ADMINPASSWORD")
    const hashPassword = await createPassword(process.env.ADMINPASSWORD);
    const user = await prisma.user.create({

        data: {
            name: 'Admin',
            email: "admin@yopmail.com",
            password: hashPassword,
            role:'ADMIN'
        }
    })

}

addAdmin()
