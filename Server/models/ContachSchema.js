const { Type } = require("lucide-react");
const mongoose= require("mongoose");



const ContactSchema= new mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String
    },
    message:{
        type: String
    },
    reply:{
        type: String,
        default: null
    },
    replied:{
        type: Boolean,
        default: false
    },
    repliedAt:{
        type: Date
    }
},
{ timestamps: true}
)


module.exports= mongoose.model("Contact", ContactSchema)