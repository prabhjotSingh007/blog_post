const bcrypt = require('bcrypt');
const dotEnv = require('dotenv')
dotEnv.config()
const saltRounds = Number(process.env.BCRYPT_SALT)

const createPassword = async (password) => {
    const salt =await bcrypt.genSaltSync((saltRounds));
    const hash =await bcrypt.hashSync(password, saltRounds);
    // const hash = await bcrypt.hash(password, saltRounds);
    return hash;
};


const comparePassword = async (password, passwordFromDb) => {
    return await bcrypt.compare(password, passwordFromDb);
}

module.exports = { createPassword, comparePassword }