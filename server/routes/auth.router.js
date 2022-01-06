const router =require("express").Router();
const User = require("../models/user.model");
const jwt =require("jsonwebtoken");
const auth= require("../middleware/auth");
const multer=require("multer");

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public/images")
    },
    filename:(req,file,cb)=>{
        const filename= `${Date.now()}_${file.originalname}`;
        cb(null,filename)
    }
})

const upload=multer({storage});
// register user
router.post("/register",async (req,res)=>{
    try{

        const user = await User({...req.body,admin:true});
        !user&&res.status(404).json("error happen")

        const savedUser =await user.save();
        !savedUser&&res.status(404).json("error in saving user");
        const {hash_pass,...other}=savedUser._doc;

        jwt.sign({id:other._id},
            "JWT_SECRET",
            {expiresIn:3600},
            (err,token)=>{
                if(err) throw err;
                res.status(201).json({token,user:other});
            }
        )
        

    }catch(e){
        console.log(e)
    }
})


//login 

router.post("/login",async (req,res)=>{
   if(req.body.email !==null){
    try{

        const user = await User.findOne({email:req.body.email});
        console.log("login user",user)
        !user&&res.status(404).json("must register frist")
        
        if(user.auth(req.body.password)){
            const {hash_pass,...other}=user._doc;
            jwt.sign({id:other._id},
                "JWT_SECRET",
                {expiresIn:3600},
                (err,token)=>{
                    if(err) throw err;
                     res.status(201).json({token,user:other});
                }
            )

        }else{
            return res.status(404).json("wrong password")
        }

    }catch(e){
        console.log(e)
    }
}else{
    return res.status(404).json("enter correct email")
}
})

// update user 
router.put('/:id',upload.fields([{name: 'userProfilePic', maxCount: 1 },{name: 'userBackgroundPic', maxCount: 1 }]),async (req,res)=>{

  
    if(req.params.id === req.body.userId ){

        const user = await User.findByIdAndUpdate(req.params.id,{$set:{
            username:req.body.username,
            city:req.body.city,
            from:req.body.from,
            relationship:req.body.relationship,
            userProfilePic:req.files.userProfilePic[0].filename,
            userBackGroundPic:req.files.userBackgroundPic[0].filename,
        }},{new:true});
        console.log(user)
        !user&&res.status(404).json("error occure");
        await res.status(200).json("your account updated succesfully");
    }else{
        return res.status(404).json("you can update only your account ")
    }
})

// delete user 
router.delete('/:id',auth,async (req,res)=>{

    if(req.params.id === req.user.id){

        const user = await User.findByIdAndDelete(res.user.id);

        !user&&res.status(404).json("error occure");
        await res.status(200).json("your account deleted succesfully");
    }else{
        return res.status(404).json("you can delete only your account ")
    }
})

//get user

router.get("/user",auth,async (req,res)=>{

    try{

        const users = await User.findById(req.user.id);

        !users&&res.status(404).json("user not found");
        const {hash_pass,...other}=users._doc;
        await res.status(200).json({user:other})

    }catch(e){
        console.log(e)
    }
})

// get User with id

router.get("/user/:id",auth,async (req,res)=>{

    try{

        const users = await User.findById(req.params.id);

        !users&&res.status(404).json("user not found");
        const {hash_pass,...other}=users._doc;
        await res.status(200).json({friend:other})

    }catch(e){
        console.log(e)
    }
})

// get all follower user
router.get("/users/all",auth,async (req,res)=>{
    try{
       
        const currentUser=await User.findById(req.user.id);
        //const userPosts=await Post.find({userId:currentUser._id});
        const frinds = await Promise.all(
            currentUser.followings.map(frindId=>{
                return User.findById(frindId);
            })
        )
        
        res.status(200).json({frinds:frinds.concat(currentUser)});
    }catch(e){
        res.status(500).json(e)
    }
})

// get friend follower user
router.get("/users/all/:id",auth,async (req,res)=>{
    try{
       
        const currentUser=await User.findById(req.params.id);
        //const userPosts=await Post.find({userId:currentUser._id});
        const frinds = await Promise.all(
            currentUser.followings.map(frindId=>{
                return User.findById(frindId);
            })
        )
        
        res.status(200).json({frinds:frinds});
    }catch(e){
        res.status(500).json(e)
    }
})

// get all users
router.get("/usersall/all",async (req,res)=>{
    try{
       
        const users = await User.find();
          
        !users&&res.status(404).json("user not found");
        
        await res.status(200).json(users)
        
    }catch(e){
        res.status(500).json(e)
    }
})

// add follewers
router.put("/:id/follower",auth,async (req,res)=>{

    if(req.params.id !== req.user.id){
        try{

        const admin = await User.findById(req.user.id);
        const user = await User.findById(req.params.id);

        if(!admin.followings.includes(req.params.id)){

            await admin.updateOne({$push:{followings:req.params.id}});
            await user.updateOne({$push:{followers:req.user.id}});

            await res.status(200).json("user has been followed")
        }else{
            return res.status(404).json("you already follow this user")
        }
        }catch(e){
            return res.status(404).json(e);
        }
    }else{
        return res.status(404).json("you can not follow your self")
    }
})
// remove follewers
router.put("/:id/unfollow",auth,async (req,res)=>{

    if(req.params.id !== req.user.id){
        try{

        const admin = await User.findById(req.user.id);
        const user = await User.findById(req.params.id);

        if(admin.followings.includes(req.params.id)){

            await admin.updateOne({$pull:{followings:req.params.id}});
            await user.updateOne({$pull:{followers:req.user.id}});

            await res.status(200).json("user has been Unfollowed")
        }else{
            return res.status(404).json("you not  follow this user")
        }
        }catch(e){
            return res.status(404).json(e);
        }
    }else{
        return res.status(404).json("you can not follow your self")
    }
})

// get user 

module.exports=router;