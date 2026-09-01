const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');
dotEnv.config()

const generateToken = (data) => {

    console.log(jwt.sign({
        data
    }, process.env.JWT_SECRET))

    return jwt.sign({
        data
    }, process.env.JWT_SECRET);
}

const returnUserFromToken = (token) => {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    return user?.data;
}

module.exports = { generateToken, returnUserFromToken }