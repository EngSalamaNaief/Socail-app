const mongoose =require("mongoose");
const bcrypt =require("bcrypt");

const convarsationSchema =new mongoose.Schema({
    members:{
        type:Array
    }
})
module.exports = mongoose.model("Convarsation",convarsationSchema)