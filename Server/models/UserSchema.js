const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
 
    avatar: {             //save the url only
        type:String,
        default:""
    },

    password: {
        type: String,
        required: true
    },

    phone: {
        type:String
    },

    role: {
        type: String,
        enum: ["admin","user"],
        default: "user"
    },

    status: {
        type: String,
        enum: ["Active", "Blocked"],
        default: "Active"
    }
},
{timestamps: true}
)


module.exports= mongoose.model("User", UserSchema);