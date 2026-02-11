const categorySchema= require("../models/categoriesSchema");

//create the categories
const CreateCategory= async(req,res)=>{
    try{
        const {name, slug}= req.body;

        const category= await categorySchema.create({name, slug});

        res.status(201).json({
            success:true,
            message:"Category created successfully.",
            category
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            error:err.message
        })
    }
}

//display the categories

const GetCategory=  async(req,res)=>{
    try{
        const categories= await categorySchema.find();

        res.status(201).json({
            success:true,
            categories
        })
    }
    catch(err){
        res.status(500).json({success:false, error:err.message})
    }
}
module.exports= {CreateCategory, GetCategory}