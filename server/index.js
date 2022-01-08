const express=require("express");
const mongoose =require("mongoose");
const path =require("path");
const app=express();
const multer =require("multer")
const auth = require("./routes/auth.router");
const post = require("./routes/post.router");
const convarsation = require("./routes/convarsation");
const messages = require("./routes/messages");
// middleware 

app.use("/images",express.static(path.join(__dirname,"public/images")));

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

app.post("/api/upload",upload.single("file"),(req,res)=>{
    
    try{
        return res.status(200).json("file uploaded successfuly.")
    }catch(err){
        console.log(err)
    }
})


app.use(express.json());
app.use("/api",auth);
app.use("/api/posts",post);
app.use("/api/messages",messages);
app.use("/api/convarsation",convarsation);

//databse connection 

mongoose.connect("mongodb+srv://salama:1522813884@cluster0.tkrqm.mongodb.net/test")
        .then(()=>{
            console.log("the database is connected")
        })
        .catch(()=>{
            console.log("error in  database connection")
        })

app.listen(5000,()=>{
    console.log('the server is running on port 5000')
})