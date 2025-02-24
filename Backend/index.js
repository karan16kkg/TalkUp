const express = require("express");
require('./connection')
const user = require("./Middleware/user");
const cors = require("cors");
const searchUser = require("./Middleware/searchUser");
const accessChat = require("./Middleware/chatController");
const message = require("./Middleware/message");
const app = express();
const port = 3000

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/user",user)
app.use("/search",searchUser);
app.use("/createChat",accessChat)
app.use("/message",message)
// app.get("/",(req,res)=>{
//     res.send("Hello");
// })

const server = app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`)
})

const io = require("socket.io")(server,{
    pingTimeout:6000,
    cors:{
        origin:"https://talk-up-lac.vercel.app/",
    }
})

io.on("connection",(socket)=>{
    console.log("connected to socket.io")

    socket.on("setup", (userData)=>{
        socket.join(userData._id)
        socket.emit("connected")
    })

    socket.on("join chat",(room)=>{
        socket.join(room)
        console.log("User joined room: "+ room)
    })

    socket.on("typing",(room)=>{
        socket.to(room).emit("typing")
    })

    socket.on("stop typing",(room)=>{
        socket.in(room).emit("stop typing")
    })

    socket.on("new Message",(newMessageReceived)=>{
        const chat = newMessageReceived.chat;

        if(!chat){
            return console.log("Chat.users not defined");
        }

        chat.users.forEach((user)=>{
            if(user._id == newMessageReceived.sender._id){
                return;
            }

            socket.in(user._id).emit("message received",newMessageReceived);
        })
    })

    socket.off("setup",()=>{
        console.log("User Disconnected")
        socket.leave(userData._id)
    })
})