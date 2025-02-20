const jwt = require("jsonwebtoken")

const generateToken = (id)=>{
    return jwt.sign({id},"secret",{expiresIn:"5d"});
}

module.exports = generateToken;