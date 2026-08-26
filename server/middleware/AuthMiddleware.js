
const jwt = require('jsonwebtoken');
const { returnUserFromToken } = require('../utlits/jwtToken');

const authMiddelWare = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // Authorization header missing
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send({
            success: false,
            message: "Unauthorized",
        })
    }

    console.log(token)

    try {
        const user = returnUserFromToken(token);
        console.log(user)
        req.user = user;

        next();
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "Error in decode User",
            error: err
        })
    }

}



module.exports = authMiddelWare