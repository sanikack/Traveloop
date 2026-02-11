
const mongoose= require("mongoose");

const PackageSchema= new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },

    days:{
        type: Number,
        required: true,
        min: 1
    },

    nights:{
        type: Number,
        required: true,
        min: 0
    },

    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    },

    destination:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "destinations",
        required: true
    },

    type:{
        type: String,
        enum: ["Honeymoon", "Adventure", "Family", "Premium","Budget"]
    },

    description:{
        type: String,
    },

    gallery:[ String],

    itinerary:[{
        day: Number,
        title: String,
        description: String
    }],

    inclusion:[String],

    exclusion:[String],

    featured:{
        type: Boolean,
        default: false  //true in hoghtlight package, false in normal package
    },

    location:{
        type: String,
        required: true,
        trim: true
    },

    price:{
        type: Number,
        required: true
    },

    image:{
        type: String,
        required: true
    },

    status:{
        type: String,
        enum: ["Active", "Blocked"],
        default: "Active"
    }
},
{timestamps: true}
)


module.exports= mongoose.model("Packages", PackageSchema)