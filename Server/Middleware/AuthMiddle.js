const jwt= require("jsonwebtoken");
const User= require("../models/UserSchema");
const dotenv= require("dotenv");

dotenv.config()


const Protect= async(req,res,next)=>{
    try{
        const token= req.cookies?.token;

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Not authenticated"
            })
        };
        const decoded= jwt.verify(token, process.env.JWT_SECRET)
        const user= await User.findById(decoded.id).select("-password")
        

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        };

        req.user= user
        next();
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}



module.exports= Protect