const express = require("express");
require('./connection')
const user = require("./Middleware/user");
const cors = require("cors");
const searchUser = require("./Middleware/searchUser");
const accessChat = require("./Middleware/chatController");
const app = express();
const port = 3000

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/user",user)
app.use("/search",searchUser);
app.use("/createChat",accessChat)
// app.get("/",(req,res)=>{
//     res.send("Hello");
// })

app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`)
})