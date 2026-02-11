const mongoose= require("mongoose");


const DestinationSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },

    slug:{
        type: String,
        unique: true
    },

    description:{
        type: String,
        required: true
    },

    district:{
        type:String,
        required:true
    },

    specialities:[
        {
            type: String,
            trim: true
        }
    ],

    image:[{
        type:String,
        required: true
    }],

    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"category",
        required: true
    },

    isActive:{
        type: Boolean,
        default: true
    }
},
{timestamps: true}
)


DestinationSchema.pre("save", function(){
    if(this.isModified("name")){
        this.slug = this.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
    }
})


module.exports= mongoose.model("destinations", DestinationSchema);