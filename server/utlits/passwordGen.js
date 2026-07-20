const bcrypt = require('bcrypt');
const saltRounds = process.env.BCRYPT_SALT

const createPassword = async (password) => {
    let password = null
    await bcrypt.hash(password, saltRounds, function (err, hash) {
        // Store hash in your password DB.
        password = hash
    });

    return password
}


const comparePassword = async (password, passwordFromDb) => {
    let isMatch = false
    await bcrypt.compare(password, passwordFromDb, function (err, result) {
        isMatch = result
    });

    return isMatch
}