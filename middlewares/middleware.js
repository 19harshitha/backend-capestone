const jwt = require("jsonwebtoken")

const verifyjwt = (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token) {
            return res
                .status(401)
                .json({ message: 'Unauthorized user' })
        }
        const decode = jwt.verify(token, process.env.jwt_Secret)
        if (!decode) {
            return res
                .status(401)
                .json({ error: 'invalid token' })
        } next();

    } catch (error) {
        console.log(error)
    }
};

module.exports = verifyjwt;