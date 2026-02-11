const mongoose= require("mongoose");


const ReviewSchema= new mongoose.Schema({
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true,
        unique: true
    },

        package: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Packages",
            required: true
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },

        review: {
            type: String,
            required: true,
            trim: true
        },

        status: {
            type: String,
            enum: ["Pending","Approved","Rejected"],
            default: "Pending"
        }
},
{timestamps:true}
)


module.exports= mongoose.model("Review", ReviewSchema)