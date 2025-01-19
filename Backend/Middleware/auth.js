const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

const protect = async (req, res, next) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];

            console.log(token);

            // Decode token to extract user ID
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decode.id).select("-password");

            return next();
        }

        res.status(401).send("Not Authorized, no token");
    } catch (error) {
        res.status(401).send("Not Authorized, token failed");
    }
};

module.exports = protect;
