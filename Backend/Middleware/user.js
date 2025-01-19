const express = require("express");
const user = express();
const bcrypt = require("bcrypt")
const userModel = require("../Models/userModel");
const generateToken = require("./generateToken");
const jwt = require("jsonwebtoken")


user.post("/signup",async(req,res)=>{
    let{name,email,password} = req.body;
    if(!name || !email || !password){
        return res.send({message:"All fields required"});
    }

    const userExists = await (userModel).findOne({email});

    if(userExists){
        res.send({message:"User Already Exists"});
    }
    else{
        const newPass = await bcrypt.hash(password.toString(),10);
        const result = await userModel.create({
            name,
            email,
            password:newPass
        })

        if(result){
            res.status(201).json({
                message:"Account Created Successfully",
                _id:result._id,
                name:result.name,
                email:result.email,
                password:result.password,
                token:generateToken(result._id)
            });
        }
        else{
            res.status(400).json({
                message:"Failed to create the user"
            });
        }
    }

})

user.post("/login",async(req,res)=>{
    let{email,password} = req.body;

    const userExists = await(userModel).findOne({email});
    if(userExists){
        const match = await  bcrypt.compare(password,userExists.password);

        if(match == true){
            res.json({
                message:"Logged In Successfully",
                _id : userExists._id,
                name:userExists.name,
                email:userExists.email,
                token:generateToken(userExists._id)
            })
        }
        else{
            res.send({message:"Invalid Email or Password"})
        }
    }
    else{
        res.send({message:"User Not Found"})
    }
})

user.post("/jwtverify",(req,res)=>{
    const {token} = req.body;

    if (!token) {
        return res.json({ 
            message: "Token is required", 
            valid: false 
        });
    }

    jwt.verify(token, "secret", (err, decoded) =>{
        if (err) {
            return res.json({ 
                message: "Invalid or expired token", 
                valid: false 
            });
        }

        else{
            const {id} = decoded;
            return res.status(200).json({ 
                message: "Token is valid", 
                valid: true,
                id
            });
        }
    })
})

module.exports = user