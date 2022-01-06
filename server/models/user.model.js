const mongoose =require("mongoose");
const bcrypt =require("bcrypt");

const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true,
        max:16,
        min:3
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    hash_pass:{
        type:String,
        required:true,
        max:16,
        min:3
    },
    admin:{
        type:Boolean,
        default:false
    },
    userProfilePic:{
        type:String,
        default:""
    },
    userBackGroundPic:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    },
    city:{
        type:String,
        default:""
    },
    from:{
        type:String,
        default:""
    },
    relationship:{
        type:String,
        default:""
    },
},{timestamps:true});

userSchema.virtual("password").set(function(password){
  this.hash_pass = bcrypt.hashSync(password,10);
})

userSchema.methods={
    auth:function(password){
        return bcrypt.compareSync(password,this.hash_pass);
    }
}


module.exports = mongoose.model("User",userSchema)

