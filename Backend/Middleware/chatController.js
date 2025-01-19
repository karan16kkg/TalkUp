const express = require("express");
const accessChat = express();
const Chat = require("../Models/chatModel");
const User = require("../Models/userModel");

accessChat.get("/",(req,res)=>{
    res.send("hey")
})

accessChat.post("/accessChat",async(req,res)=>{
    const {currentId,userId} = req.body

    if(!userId){
        res.status(401).send({message:"UserId not send with request"});
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and:[
            {users: {$elemMatch : {$eq : currentId}}},
            {users: {$elemMatch : {$eq : userId}}}
        ]
    })
    .populate("users","-password")
    .populate("latestMessage")

    isChat = await User.populate(isChat,{
        path:"latestMessage.sender",
        select:"name pic email",
    });

    if(isChat.length>0){
        res.send(isChat[0]);
    }
    else{
        var chatData = {
            chatName:"sender",
            isGroupChat:false,
            users : [currentId,userId],
        };

        try{
            const createdChat = await Chat.create(chatData)

            const FullChat = await Chat.findOne({_id:createdChat._id}).populate("users,-password")

            res.status(200).send(FullChat)
        }
        catch(error){}
    }
})

accessChat.get("/fetchChats",async(req,res)=>{
    let currentId = req.query.id;
    try{
        Chat.find({users:{$elemMatch:{$eq:currentId}}})
        .populate("users","-password")
        .populate("groupAdmin","-password")
        .populate("latestMessage")
        .sort({updatedAt:-1})
        .then(async(results)=>{
            results:await User.populate(results,{
                path:"latestMessage.sender",
                select:"name pic email"
            })

            res.status(200).send(results)
        })
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

accessChat.post("/groupChat",async(req,res)=>{
    let{user,name,currentId} = req.body

    if(!user || !name){
        return res.status(400).send({message:"All fields required"});
    }

    var users = JSON.parse(user);

    if(users.length<2){
        res.status(400).send({message:"More than 2 users are required to form a group"})
    }

    users.push(currentId);
    try{
        const groupChat = await Chat.create({
            chatName:name,
            users:users,
            isGroupChat:true,
            groupAdmin : currentId
        });

        const fullGroupChat = await Chat.findOne({_id:groupChat._id})
        .populate("users","-password")
        .populate("groupAdmin","-password");

        res.status(200).json(fullGroupChat);
    }
    catch(error){

    }
})

accessChat.put("/renameGroup",async(req,res)=>{
    const {chatId,chatName} = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName,
        },
        {
            new:true,
        },

    )
    .populate("users","-password")
    .populate("groupAdmin","-password");

    if(!updatedChat){
        res.status(404).send({message:"Chat Not Found"})
    }

    else{
        res.json(updatedChat)
    }
})

accessChat.put("/addToGroup",async(req,res)=>{
    let{chatId,userId} = req.body;

    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push:{users:userId},
        },
        {
            new : true,
        }
    )
    .populate("users","-password")
    .populate("groupAdmin","-password")

    if(!added){
        res.status(404).send({message:"Chat Not Found"})
    }

    else{
        res.json(added)
    }
})

accessChat.put("/removeFromGroup",async(req,res)=>{
    let{chatId,userId} = req.body;

    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull:{users:userId},
        },
        {
            new : true,
        }
    )
    .populate("users","-password")
    .populate("groupAdmin","-password")

    if(!removed){
        res.status(404).send({message:"Chat Not Found"})
    }

    else{
        res.json(removed)
    }
})

module.exports = accessChat;