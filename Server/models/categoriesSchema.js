const mongoose= require("mongoose");

const CategorySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim: true
    },

    slug:{
        type:String,
        unique:true,
        lowercase:true,
    },

    image:{
        type:String
    },

    shortdescription:{
        type: String,
        trim: true
    },

    bestSeason:{
        type: String
    },

    idealFor:{
        type:String
    },

    tripStyle:{
        type: String
    },

    specialities:{
        type: [String],
        default: []
    },

    isActive:{
        type:Boolean,
        default:true
    },
},
{timestamps:true} //create at and update at
);


//AUTO GENERATE SLUG BEFORE SAVE
 CategorySchema.pre("save", function (){
    if(this.isModified("name")){
        this.slug = this.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }
 })

module.exports= mongoose.model("category", CategorySchema);