const { LoginSchema, RegisterSchema } = require("../validators/authValidator")
const { PrismaClient } = require("@prisma/client");
const { comparePassword, createPassword } = require("../utlits/passwordGen");
const { generateToken, returnUserFromToken } = require("../utlits/jwtToken");
const prisma = new PrismaClient();

const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        const { value, error } = LoginSchema.validate(req.body);

        if (error) {
            return res.status(400).send({
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
            return res.status(404).send({
                success: false,
                message: 'User not Found'
            })
        }
        const isPasswordMatch = await comparePassword(password, user.password)

        if (!isPasswordMatch) {
            return res.status(400).send({
                success: false,
                message: 'Invalid Password'
            })
        }
        const createToken = generateToken(user)
        const loginSession = await prisma.login_Session.create({
            data: {
                userId: user.id,
                token: createToken
            }
        })

        return res.status(200).send({
            success: true,
            message: "Login Successfully",
            data: { ...user, token: createToken }
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err instanceof Error ? err : "Error in Login"
        })

    }


}

const register = async (req, res) => {
    try {
        const { name, email, password, } = req.body;


        if (!email || !name || !password) {
            return res.status(400).send({
                success: false,
                message: `${email || name || password} is missing`
            })
        }

        const { value, error } = RegisterSchema.validate(req.body);

        if (error) {
            return res.status(400).send({
                success: false,
                error: error
            })
        }
        console.log(name, email, password)

        const isUserExist = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (isUserExist) {
            return res.status(400).send({
                success: false,
                error: error
            })
        }

        const hashPassword = await createPassword(password);

        const createUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashPassword
            }
        })

        const createToken = generateToken(createUser)

        const loginSession = await prisma.login_Session.create({
            data: {
                userId: createUser.id,
                token: createToken
            }
        })

        return res.status(200).send({
            success: true,
            message: "User create Success",
            data: { ...createUser, token: createToken }
        })

    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err instanceof Error ? err : "Error in Login"
        })

    }

}

const logout = async (req, res) => {
    try {
        console.log("lkasdjhlkjasd")
        const user = req.user;
        console.log(user)
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }


        const loginSession = await prisma.login_Session.update({
            where: {
                userId: user.id
            },
            data: {
                logout_at: (new Date()).toISOString()
            }
        })

        return res.status(200).send({
            success: false,
            message: "LogOut successfully"
        })


    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err instanceof Error ? err : "Error in Login"
        })

    }
}

module.exports = { login, register, logout }