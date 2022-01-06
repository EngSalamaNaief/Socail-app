const mongoose =require("mongoose");
const bcrypt =require("bcrypt");

const messageSchema =new mongoose.Schema({
    convarsationId:{
        type:String
    },
    sender:{
        type:String
    },
    text:{
        type:String
    },
},{timestamps:true})
module.exports = mongoose.model("Message",messageSchema)