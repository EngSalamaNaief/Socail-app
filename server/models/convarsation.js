const mongoose =require("mongoose");

const convarsationSchema =new mongoose.Schema({
    members:{
        type:Array
    }
})
module.exports = mongoose.model("Convarsation",convarsationSchema)