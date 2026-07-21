const jwt = require('jsonwebtoken');


const generateToken = (data) => {
    return jwt.sign({
        data: data
    }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

const returnUserFromToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { generateToken , returnUserFromToken }