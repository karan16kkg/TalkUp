const mongoose = require("mongoose")

const userModel = mongoose.Schema({
    name:{
        type:String,
        require:true
    },

    email:{
        type:String,
        require:true
    },

    password:{
        type:String,
        require:true
    },
    pic:{
        type:String,
        default:"https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
    }
},{
    timestamps : true,
});

const User = mongoose.model("User",userModel);
module.exports = User ;