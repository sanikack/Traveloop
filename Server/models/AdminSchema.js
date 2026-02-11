const mongoose= require("mongoose");

const AdminSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },

    email:{
        type:String,
        required: true,
        unique:true
    },

    phone:{
        type: String,
        trim: true
    },

    avatar: {             //save the url only
        type:String,
        default:""
    },

    password:{
        type:String,
        required:true
    }

},
{ timestamps: true}
)

module.exports= mongoose.model("admin", AdminSchema)