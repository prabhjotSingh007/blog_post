const bcrypt = require('bcrypt');
const saltRounds = process.env.BCRYPT_SALT

const createPassword = async (password) => {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log(hash , "hashhash")
    return hash;
};


const comparePassword = async (password, passwordFromDb) => {
    let isMatch = false
    await bcrypt.compare(password, passwordFromDb, function (err, result) {
        isMatch = result
    });

    return isMatch
}

module.exports = { createPassword, comparePassword }