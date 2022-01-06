const router =require("express").Router();
const Post = require("../models/post.model");
const auth= require("../middleware/auth");
const User =require('../models/user.model');
const multer = require("multer");

// create post

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
/*
app.post("/api/upload",upload.single("file"),(req,res)=>{
    
    
    try{
        return res.status(200).json("file uploaded successfuly.")
    }catch(err){
        console.log(err)
    }
})  
*/

router.post("/create",upload.single("file"),async (req,res)=>{
    console.log("req file",req.file);
    console.log("req body",req.body);
    try{
       // console.log(req.file)

        const post = await Post({...req.body,userId:req.body.userId,postPhoto:req.file.filename});
        const savedPost =await post.save();
        !savedPost&& res.status(404).json("error in save post ")
        res.status(201).json(savedPost);

    }catch(e){
      console.log(e);
    }
})

// update post

router.put("/:id",upload.single("postPhoto"),async (req,res)=>{
    console.log(req.file)
    try{

        const post = await Post.findById(req.params.id);
        if(post.userId===req.body.userId){
        const updatedPost = await post.updateOne({$set:{
            userId:req.body.userId,
            desc:req.body.desc,
            postPhoto:req.file.filename
        }},{new:true});
        !updatedPost&& res.status(404).json("error in update post ")
        res.status(201).json("post has been updated");
        }else{
            return res.status(404).json("you can update only your post")
        }

    }catch(e){
      console.log(e);
    }
})
// delete post
router.delete("/:id",auth,async (req,res)=>{
 
    try{

        const post = await Post.findById(req.params.id);
        if(post.userId===req.user.id){
        const deletedPost = await post.deleteOne();
        !deletedPost&& res.status(404).json("error in delete post ")
        res.status(201).json("post has been deleted");
        }else{
            return res.status(404).json("you can delete only your post")
        }

    }catch(e){
      console.log(e);
    }
})
// like posts

router.put("/:id/like/likes",auth,async (req,res)=>{

    try{
         
        
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.user.id)){

            await post.updateOne({$push:{likes:req.user.id}});
            res.status(200).json("you likes this post ")
        }else{
            await post.updateOne({$pull:{likes:req.user.id}},{new:true});
            res.status(200).json("you dislikes this post ")
        }

    }catch(e){
        console.log(e); 
    }

})
// posts timelines
router.get("/timeline/all",auth,async (req,res)=>{
    try{
       
        const currentUser=await User.findById(req.user.id);
        const userPosts=await Post.find({userId:currentUser._id});
        const frindsPosts = await Promise.all(
            currentUser.followings.map(frindId=>{
                return Post.find({userId:frindId});
            })
        )
        
        res.status(200).json({posts:userPosts.concat(...frindsPosts)});
    }catch(e){
        res.status(500).json(e)
    }
})

// get user posts
router.get("/userposts/all",auth,async (req,res)=>{
    try{
       
        const userPosts=await Post.find({userId:req.user.id});
        
        res.status(200).json({posts:userPosts});
    }catch(e){
        res.status(500).json(e)
    }
})

// get user posts
router.get("/friendposts/:id/all",auth,async (req,res)=>{
    try{
       
        const userPosts=await Post.find({userId:req.params.id});
        
        res.status(200).json({posts:userPosts});
    }catch(e){
        res.status(500).json(e)
    }
})

module.exports=router;