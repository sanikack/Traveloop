const jwt= require("jsonwebtoken");


const AdminAuth= async(req,res,next)=>{
    const token= req.cookies.adminToken;

        if(!token){
            return res.status(401).json({
                success:false,
                message:"UnAuthorized"
            })
        };
    try{

        const decoded= jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.role !== "admin"){
            return res.status(403).json({
                success:false,
                message:"forbidden"
            })
        }
        req.admin= decoded
        next();
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


module.exports= AdminAuth