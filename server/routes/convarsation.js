const router =require("express").Router();
const Convarsation = require("../models/convarsation");
const auth= require("../middleware/auth");

// add convarsations

router.post("/",auth,async(req,res)=>{

   

    try{

        const getConv= await Convarsation.find({members:{$in:[req.user.id]}});
        if(!getConv){
            const newConv=Convarsation({
                members:[req.body.receverId,req.user.id]
            })
            const savedConv = await newConv.save();
            res.status(201).json(savedConv);
    
        }
        
    }catch(err){
        console.log(err)
    }
})

// get convarsation 
router.get("/",auth,async (req,res)=>{

    try{

        const newConv= await Convarsation.find({members:{$in:[req.user.id]}});
        res.status(200).json(newConv)
    }catch(err){
        console.log(err)
    }
})

module.exports=router;