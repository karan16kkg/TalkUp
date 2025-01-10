const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://karankumargarg1610:NvUNkQZfUjNvGZ6t@cluster0.4fvy5.mongodb.net/Chatting?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("mongodb connected")
}).catch((err)=>{
    console.log("error connecting mongodb : "+ err);
})