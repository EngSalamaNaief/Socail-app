const jwt =require('jsonwebtoken');

function auth (req,res,next){

    const token=req.header("x-auth-token");

    !token &&res.status(401).json("No Authorization Token");
          
    try{

        const decoded =jwt.verify(token,"JWT_SECRET");

        req.user=decoded;

        next();
    }catch(e){
        res.status(404).json(e);
    }
}

module.exports=auth;