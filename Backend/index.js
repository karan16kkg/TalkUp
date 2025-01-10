const express = require("express");
require('./connection')
const user = require("./Middleware/user");
const app = express();
const port = 3000

app.use(express.urlencoded({extended:false}));
app.use("/user",user)
app.get("/",(req,res)=>{
    res.send("Hello");
})

app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`)
})