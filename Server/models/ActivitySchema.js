const mongoose= require("mongoose");


const ActivitySchema= new mongoose.Schema({
    type:{
        type: String,
        enum:["Booking","User","Review","Newsletter","Payment","Contact"],
        required: true
    },

    message: {
        type: String,
        required: true
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    relatedId:{
        type: mongoose.Schema.Types.ObjectId
    },

    read:{
        type: Boolean,
        default: false
    }
},
{timestamps:true}
)



module.exports= mongoose.model("Activity", ActivitySchema)