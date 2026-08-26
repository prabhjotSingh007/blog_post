const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');
dotEnv.config()

const generateToken = (data) => {
    return jwt.sign({
        data: data
    }, process.env.JWT_SECRET,);
}

const returnUserFromToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { generateToken, returnUserFromToken }