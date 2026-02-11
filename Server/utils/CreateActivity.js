const ActivitySchema = require("../models/ActivitySchema")


const CreateActivity= async({
    type,
    message,
    user,
    relatedId
}) =>{
    try{
        console.log("ACTIVITY TRYING TO CREATE 👉", { type, message, user })
        await ActivitySchema.create({
            type,
            message,
            user,
            relatedId
        })
        console.log("✅ ACTIVITY CREATED");
    }
    catch(err){
        console.error(err); 
    }
}


module.exports= CreateActivity