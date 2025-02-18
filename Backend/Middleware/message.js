const express = require("express");
const Message = require("../Models/messageModel");
const User = require("../Models/userModel");
const Chat = require("../Models/chatModel");
const message = express();

message.get("/",(req,res)=>{
    res.send("Hello");
})

message.post("/sendMessage",async(req,res)=>{
    const {currentId,content,chatId} = req.body;

    if(!content || !chatId){
        res.status(400).send({message:"Invalid data passed into request"});
    }

    var newMessage = {
        sender:currentId,
        content:content,
        chat:chatId
    }

    try{
        var message = await Message.create(newMessage);
        message = await message.populate("sender","name pic");
        message = await message.populate("chat");
        message = await User.populate(message,{
            path:"chat.users",
            select:"name pic email"
        });

        await Chat.findByIdAndUpdate(req.body.chatId,{
            latestMessage:message
        })

        res.json(message);
    }
    catch(error){
        res.status(400).send({message:"An Error Occured"});
    }
})

message.get("/allMessages/:chatId",async(req,res)=>{
    // let x = req.query.chatId;
    // console.log("Chat ID:", x);
    try{
        const messages = await Message.find({chat:req.params.chatId}).populate("sender","name pic email").populate("chat");
        res.json(messages);
    }
    catch(error){
        res.status(400).send({message:"An Error Occured"});

    }
    // console.log(x);
    // res.send(x);
})

module.exports = message