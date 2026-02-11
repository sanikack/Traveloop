
const mongoose= require("mongoose");

const BookingSchema= new mongoose.Schema({
    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Packages",
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },

    name: {
        type:String,
        required: true
    },

        email: {
        type:String,
        required: true
    },

        phone: {
        type:String,
        required: true
    },

        adults: {
        type:Number,
        required: true
    },

        childrens: {
        type:Number,
        default: 0
    },

        travelDate: {
        type:Date,
        required: true
    },

        pickup: {
        type:String,
    },

        notes: {
        type:String,
    },

        status: {
        type:String,
        enum: ["Pending","Confirmed","Cancelled"],
        default: "Pending"
    },

    paymentmethod:{
        type: String,
        enum: ["advance", "full", "arrival"]
    },

    payableAmount:{
        type:Number,
        default:0
    },

    paymentStatus:{
        type: String,
        enum: ["pending", "paid", "unpaid"],
        default: "pending"
    },

    transactionId:{
        type: String
    }
},
{timestamps: true}
)



module.exports= mongoose.model("Booking", BookingSchema);