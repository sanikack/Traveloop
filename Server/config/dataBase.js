const mongoose= require("mongoose");
const dotenv= require("dotenv");


const ConnectDB= async ()=>{
    try{
        const uri= process.env.Mongo_Url
        console.log(uri);

       await mongoose.connect(uri)
        console.log("Mongodb connected");
        
        

    }
    catch(err){
        console.log("Database connection failed", err);
        process.exit(1)
        
    }
}


module.exports= ConnectDB;