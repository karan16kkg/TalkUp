const express = require("express");
const user = express();
const userModel = require("../userModel")

user.get("/signup",(req,res)=>{
    res.send("signup dkfgdfg");
})

user.post("/signup",async(req,res)=>{
    let{name,email,password} = req.body;
    if(!name || !email || !password){
        return res.send("All fields required");
    }

    const result = await userModel.create({
        name,
        email,
        password
    })

    res.send("user created")

})

module.exports = user