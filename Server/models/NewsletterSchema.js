const mongoose= require("mongoose");

const NewsletterSchema= new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        toLowerCase: true,
        trim: true
    }
},
{ timestamps: true }

)

module.exports= mongoose.model("Newsletter", NewsletterSchema )