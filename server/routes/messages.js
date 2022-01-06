const router =require("express").Router();
const Messages = require("../models/messages");
const auth= require("../middleware/auth");

// add convarsations

router.post("/",auth,async(req,res)=>{

    const newMessage=Messages({...req.body,sender:req.user.id})

    try{

        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);

    }catch(err){
        console.log(err)
    }
})

// get convarsation 
router.get("/:convarsationId",auth,async (req,res)=>{

    try{

        const newMessage= await Messages.find({convarsationId:req.params.convarsationId});
        res.status(200).json(newMessage)
    }catch(err){
        console.log(err)
    }
})

module.exports=router;