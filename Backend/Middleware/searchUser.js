const express = require("express");
const User = require("../Models/userModel");
const protect = require("./auth");
const searchUser = express();

searchUser.get("/",async(req,res)=>{
    let id = req.query.id;

    let keyword = req.query.search
    ?{
        $or:[
            {name:{$regex:req.query.search, $options:"i"}},
            {email:{$regex:req.query.search, $options:"i"}},
        ]
    }
    :{};

    const users = await User.find(keyword).find({_id:{$ne:id}});

    res.send(users);
    
})

module.exports = searchUser