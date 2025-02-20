const jwt = require("jsonwebtoken")

const generateToken = (id)=>{
    return jwt.sign({id},"secret",{expiresIn:"3s"});
}

module.exports = generateToken;