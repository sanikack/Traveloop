// const { data } = require("react-router-dom");
const categoriesSchema= require("../models/categoriesSchema");
const destinationSchema = require("../models/destinationSchema");
const UserSchema= require("../models/UserSchema")
const bcrypt= require("bcryptjs");
const PackageSchema= require("../models/PackageSchema");
const BookingSchema= require("../models/BookingSchema")
const NewsletterSchema= require("../models/NewsletterSchema")
const ContactSchema= require("../models/ContachSchema");
const AdminSchema= require("../models/AdminSchema");
const ReviewSchema= require("../models/ReviewSchema");
const jwt= require("jsonwebtoken");
const ActivitySchema = require("../models/ActivitySchema");
const cloudinary= require("../config/cloudinary")
const fs= require("fs")



//**************CATEGORY SECTION *****************/


const createCategory= async (req, res)=>{
    try{
    
        const {name, isActive, specialities, shortdescription,
            bestSeason, idealFor, tripStyle }= req.body;

        let image="";

        if(!name){
           return res.status(400).json({
                success:false,
                message: "category name is required"
            });
        }

        const ExistingCategory= await categoriesSchema.findOne({name})

        if(ExistingCategory){
            return res.status(400).json({
                success:false,
                message: "Category already exists."
            })
        };

        if(req.file){
            const result= await cloudinary.uploader.upload(req.file.path, {
                folder: "category"
            });
            image= result.secure_url;

            // delete local file
            fs.unlinkSync(req.file.path);
        }

        const category= await categoriesSchema.create({
            name,
            image,
            isActive,
            shortdescription,
            idealFor,
            bestSeason,
            tripStyle,
            specialities: specialities? JSON.parse(specialities) : []
        });

        res.status(201).json({
            success:true,
            message: "Category created successfully",
            category,
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message: "failed to create category",
            error: err.message
        })
    }
}


const GetCategories= async(req,res)=>{
    try{
        const categories= await categoriesSchema.find().sort({createdAt:-1});

        res.status(200).json({
            success: true,
            categories
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
            message: "Failed to fetch categories",
            error: err.message
        })
    }
}


const GetcategoryById= async (req,res)=> {
    try{
        const categories= await categoriesSchema.findById(req.params.id);

        if(!categories){
            return res.status(400).json({
                success: false,
                message: "Category not found"
            })
        }

        res.status(200).json({
            success: true,
            categories
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "failed to fetch category"
        })
    }
}


const UpdateCategory= async (req,res)=>{
    try{
        const {name, isActive, shortdescription, bestSeason,
               idealFor, tripStyle, specialities} = req.body

        // const image = req.file ? req.file.filename : undefined
        let image= "";

        if(req.file){
            const result= await cloudinary.uploader.upload(req.file.path, {
                folder: "category"
            });
            image= result.secure_url;

            //DELETE LOCAL FILE
            fs.unlinkSync(req.file.path)
        }

        const updatedData= {
            name,
            isActive,
            shortdescription,
            bestSeason,
            idealFor,
            tripStyle,
        };

        if(specialities){
            updatedData.specialities = JSON.parse(specialities)
        }

        if(image) updatedData.image= image;

        const categories= await categoriesSchema.findByIdAndUpdate(
            req.params.id,
            updatedData,
            {new:true}
        )
        if(!categories){
            return res.status(400).json({
                success: false,
                message: "Category not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            categories
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Failed to update category"
        })
    }
}


const DeleteCategory = async(req,res)=>{
    try{
        const categories= await categoriesSchema.findById(req.params.id);

        if(!categories){
            return res.status(400).json({
                success: false,
                message: "Category not found"
            });
        }

          await categoriesSchema.findByIdAndDelete(req.params.id);
            
          res.status(200).json({
            success: true,
            message: "Category deleted successfully"
          })
    }
    catch(err){
        res.status(500).json({
            success: false
        })
    }
}



//**************DESTINATION SECTION *****************/

const CreateDestination = async (req,res)=>{
    try{
        const {name, description, district, category, specialities, isActive}= req.body;

        if(!name || !description || !district || !category){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        
        let imageUrl= "";

        if(req.file){
            const result= await cloudinary.uploader.upload(req.file.path, {
                folder: "destination"
            });
            imageUrl = result.secure_url;

            //DELETE LOCAL FILE
            fs.unlinkSync(req.file.path)
        }

        const destinations= await destinationSchema.create({
            name,
            description,
            district,
            category,
            specialities: specialities? Array.isArray(specialities)? specialities
            :JSON.parse(specialities) : [],
            image: imageUrl,
            isActive,
        });

        res.status(201).json({
            success: true,
            message: "Destination created successfully",
            destinations
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}



const GetDestinations= async(req,res) => {
    try{
        const destination= await destinationSchema.find()
        .sort({createdAt: -1})

        res.status(200).json({
            success: true,
            destination
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


const GetDestinationById= async (req,res)=>{
    try{
        const destination= await destinationSchema.findById(req.params.id)

        if(!destination){
            return res.status(400).json({
                success: false,
                message: data.message
            })
        }

        res.status(200).json({
            success: true,
            destination
        })
    }
    catch(err){
       res.status(500).json({
         success: false,
         message: err.message
       })
    }
}


const UpdateDestination= async(req,res)=>{
    try{
        const{name, description, district, isActive, category, specialities}= req.body;
       
        let image= "";

        if(req.file){
            const result= await cloudinary.uploader.upload(req.file.path,{
                folder: "destination"
            });
            image= result.secure_url;
            fs.unlinkSync(req.file.path)
        }

        const updatedData= {
            name,
            description,
            district,
            isActive,
            category
        }
        if(image) updatedData.image = image;
        if(specialities){
            updatedData.specialities= JSON.parse(specialities)
        }

        const destination= await destinationSchema.findByIdAndUpdate(
            req.params.id,
            updatedData,
            {new: true}
        );

        if(!destination){
            res.status(400).json({
                success: false,
                message: "Destination not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Destination created successfully",
            destination
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const DeleteDestination= async (req,res)=> {
    try{
        const destination= await destinationSchema.findByIdAndDelete(req.params.id);

        if(!destination){
           return res.status(400).json({
                success: false,
                message: "Destination not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Destination created successfully"
        })
    }
     catch(err){
       res.status(500).json({
         success: false,
         message: err.message
       })
    }
}


const CreateUser= async(req,res)=>{
    try{
        const {name, email, password, role, status}= req.body;

        
        if(!name || !email || !password || !role || !status){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const hashedPassword= await bcrypt.hash(password, 10);


        const users= await UserSchema.create({
            name,
            email,
            password: hashedPassword,
            role,
            status
        })

        res.status(201).json({
            success: true,
            message: "User created successfully.",
            users
        })
    }
    catch(err){
       res.status(500).json({
    success: false,
    message: err.message
  });
    }
}



const GetUser= async(req,res)=>{
    try{
        const user= await UserSchema.find().select("-password").sort({createdAt: -1}) //except the password

        if(!user){
            res.status(400).json({
                success: false,
                message: "User not found."
            })
        }
        res.status(200).json({
            success: true,
            user
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


const GetSingleUser= async(req,res)=>{
    try{
        const user= await UserSchema.findById(req.params.id).select("-password");

        if(!user){
            res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            user
        })
    }
    catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
}
}



const UpdateUser= async (req,res)=>{
    try{
        const {name, email, role, status}= req.body;

        const user= await UserSchema.findByIdAndUpdate(
            req.params.id,
            {name,email,role,status},
            {new: true}
        )

        res.status(200).json({
            success: true,
            message: "User Updated.",
            user
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


const DeleteUser= async (req,res)=>{
    try{
        const user= await UserSchema.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Usre Deleted successfully.",
            user
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


const CreatePackage= async (req,res)=>{
    console.log("FILES:", req.files);
    console.log("CREATE PACKAGE HIT"); 
    try{
        const {title, location, nights, days, price, destination, type,
              description, itinerary, inclusion, exclusion, status, category, featured}= req.body;

        let imageUrl= "";
        //UPLOAD GALLERY IMAGES
        let galleryUrl= [];

        if(!title || !location || nights === undefined || !price || !category || !destination || !req.files?.image){
           return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        //MAIN IMAGE UPLOAD
        if(req.files?.image){
            console.log("Uploading to cloudinary:", req.files.image[0].path);
        const mainImageUpload= await cloudinary.uploader.upload(
            req.files.image[0].path,
            {folder: "packages"}
        )
        imageUrl= mainImageUpload.secure_url

        //DELETE LOCAL FILE AFTER UPLOAD
        fs.unlinkSync(req.files.image[0].path)
    };


    if(!imageUrl){
        return res.status(400).json({
            success:false,
            message:"image upload failed."
        })
    }

       
       //UPLOAD GALLERY IMAGES
        if(req.files.gallery && req.files.gallery.length > 0){
            const galleryUploads= await Promise.all(
                req.files.gallery.map(async (file)=> {
                    const res= await cloudinary.uploader.upload(file.path, {
                        folder: "packages/gallery"
                    })
                    fs.unlinkSync(file.path);
                    return res.secure_url;
                }
                )
            )
            galleryUrl= galleryUploads;

        }

        const Package= await PackageSchema.create({
            title,
            location,
            days,
            nights,
            price,
            category,
            destination,
            type: type ? type.trim() : undefined,
            featured: featured === "true",
            description,
            itinerary: itinerary ? JSON.parse(itinerary) : [],
            inclusion: inclusion ? JSON.parse(inclusion) : [],
            exclusion: exclusion ? JSON.parse(exclusion) : [],
            image: imageUrl,// store cloudinary url
            status,
            gallery: galleryUrl
        })

        res.status(201).json({
            success: true,
            message: "Package created successfully.",
            Package
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}



const GetPackages= async (req,res)=>{
    try{
        const packages= await PackageSchema.find()
        .populate("category","name")
        .populate("destination","name")
        .sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            packages
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}



const GetSinglePackage=  async (req,res)=>{
    try{
        const packages= await PackageSchema.findById(req.params.id);

        if(!packages){
           return res.status(400).json({
                success: false,
                message: "Package not found"
            }
            )
        }

        res.status(200).json({
            success: true,
            packages
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


const UpdatePackage= async (req,res)=>{
    try{
        const updateData= {
            title: req.body.title,
            location: req.body.location,
            days: req.body.days,
            nights: req.body.nights,
            price: req.body.price,
            type: req.body.type?.trim(),
            featured: req.body.featured === "true",
            status: req.body.status,
            description: req.body.description,
        }

        if (req.body.category && req.body.category !== "undefined") {
  updateData.category = req.body.category;
}

if (req.body.destination && req.body.destination !== "undefined") {
  updateData.destination = req.body.destination;
}



        //inclusion
        if(req.body.inclusion){
            updateData.inclusion= JSON.parse(req.body.inclusion)
        }

        //exclusion
        if(req.body.exclusion){
            updateData.exclusion= JSON.parse(req.body.exclusion)
        }

        //itinerary
        if(req.body.itinerary){
            updateData.itinerary= JSON.parse(req.body.itinerary)
        }

        //if new main image uploaded
        if(req.files?.image){
            const uploadedImage= await cloudinary.uploader.upload(
                req.files.image[0].path,
                {folder:"packages"}
            )
            updateData.image= uploadedImage.secure_url;

            //DELETE LOCAL IMAGE FILES
                fs.unlinkSync(req.files.image[0].path);
            

        }

        let UpdateQuary= { $set: updateData }

        //if new gallery image uploaded
        if(req.files?.gallery){
            const galleryUploads= await Promise.all(
                req.files.gallery.map(file =>
                    cloudinary.uploader.upload(file.path,
                        {folder:"packages/gallery"}
                    )
                )
            )
            const galleryUrl= galleryUploads.map(img=> img.secure_url);

            UpdateQuary.$push= {gallery:{ $each: galleryUrl}}

            //DELETE IMAGE AFTER UPLOAD
            req.files.gallery.forEach(file => {
                fs.unlinkSync(file.path);
            });

        }

        
        const packages= await PackageSchema.findByIdAndUpdate(
            req.params.id,
            UpdateQuary,
            { new: true }
        )

        if(!packages){
           return res.status(400).json({
                success: false,
                message: "Package not found."
            });
        }
         res.status(200).json({
            success: true,
            message: "Package updated successfully",
            packages
         })
    }
    catch(err){
        console.error("UPDATE ERROR:", err);
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}



const DeletePackge= async(req,res)=>{
    try{
        const packages= await PackageSchema.findByIdAndDelete(req.params.id);

        if(!packages){
           return res.status(400).json({
                success: false,
                message: "Package not found."
            })
        }

        res.status(200).json({
            success: true,
            message: "Delete package successfully."
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}



const GetBookings= async (req,res)=>{
    try{
        const bookings= await BookingSchema.find()
        .populate("package", "title price")
        .sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            bookings
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message:err.message
        })
    } 
}


const GetSingleBookings= async(req,res)=>{
    try{
        const bookings= await BookingSchema.findById(req.params.id)
        .populate("package")

        if(!bookings){
            res.status(400).json({
                success:false,
                messsage:"Booking not found."
            })
        }
        res.status(200).json({
            success:true,
            bookings
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message:err.message
        })
    } 
}




const UpdateBookings= async (req,res)=>{
    try{
        const bookings= await BookingSchema.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status}
        )
        res.status(200).json({
            success: true,
            message:"Booking Updated Successfully",
            bookings
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message:err.message
        })
    } 
}



const DeleteBooking = async (req, res) => {
  try {
    const booking = await BookingSchema.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    await BookingSchema.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


const GetPayments= async(req,res)=>{
    try{
        const payments= await BookingSchema.find()
        .populate("package", "title price")
        .sort({ createdAt: -1 })

        if(payments.length === 0){
            res.status(400).json({
                success:false,
                message: "Payment not found"
            })
        }
        res.status(200).json({
            success: true,
            payments
        })
    }
    catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}


const CreateSubscribe= async (req,res)=>{
    try{
        const {email}= req.body;

        if(!email){
            return res.status(400).json({
                success: false,
                message: "Email is required"
            })
        }
        const existingEmail= await NewsletterSchema.findOne({ email });
        if(existingEmail){
            return res.status(400).json({
                success: false,
                message: "Email is already exists"
            })
        }
        await NewsletterSchema.create({ email });

        res.status(200).json({
            success: true,
            message: "Subscribed Successfully"
        })
    }
    catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}


const GetSubscribers= async (req,res)=>{
    try{
        const subscribers= await NewsletterSchema.find().sort({ createdAt: -1});

        res.status(200).json({
            success: true,
            subscribers
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


const DeleteSubscriber= async (req,res)=>{
    try{
        await NewsletterSchema.findByIdAndDelete(req.params.id);
        res.status(200).json({ 
            success: true,
            message: "Subscriber removed" });
  } 
  catch (err) {
    res.status(500).json({
         success: false,
         message: err.message
         });
    }
}


const GetContacts= async (req,res)=>{
    try{

        const messages= await ContactSchema.find().sort({ createdAt:-1 });

        res.status(200).json({
            success: true,
            messages
        })
    }
    catch (err) {
    res.status(500).json({
         success: false,
         message: err.message
         });
    }
}


const DeleteContacts= async (req,res)=>{
    try{
        await ContactSchema.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Message Deleted Successfully"
        })
    }
    catch (err) {
    res.status(500).json({
         success: false,
         message: err.message
         });
    }
}


const ReplytoMessage= async(req,res)=>{
    try{
        const {reply}= req.body;

        if(!reply){
            res.status(400).json({
                success: false,
                message: "Reply is required"
            })
        }
        await ContactSchema.findByIdAndUpdate(
            req.params.id,
            {
                reply,
                replied:true,
                repliedAt: new Date()
            }
        );

        res.status(200).json({
            success: true,
            message: "Reply send successfully"
        })
    }
    catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}


const GetDashboardStats= async(req,res)=>{
    try{
        const totalBookings= await BookingSchema.countDocuments();

        const activeUsers= await UserSchema.countDocuments({
            role: "user",
            status: "Active"
        })

        const destination= await destinationSchema.countDocuments({
            isActive: true
        })

        const revenueAgg= await BookingSchema.aggregate([
            {
                $match: {paymentStatus : "paid"}
            },
            {
                $group:{
                    _id:null,
                    total:{$sum : "payableAmount"}
                }
            }
        ])

        const totalRevenue= revenueAgg[0]?.total || 0;

        res.status(200).json({
            success:true,
            data:{
                totalBookings,
                activeUsers,
                destination,
                totalRevenue
            }
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
}


const GetTopDestinationGraph= async (req,res)=>{
    try{
        const result= await BookingSchema.aggregate([
            {
                $lookup:{
                    from:"packages",
                    localField:"package",
                    foreignField: "_id",
                    as: "packageDetails"
                }
            },
            { $unwind: "$packageDetails" },

            {
                $lookup:{
                    from:"destinations",
                    localField:"packageDetails.destination",
                    foreignField:"_id",
                    as: "destinationDetails"
                }
            },
            { $unwind: "$destinationDetails" },

            {
                $group: {
                    _id: "$destinationDetails.name",
                    count: {$sum:1}
                }
            },

            { $sort: {count:-1}},
            { $limit: 5}
        ]);

        res.status(200).json({
            success:true,
            data: result
        })
    }

    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


const GetBookingTrendGraph= async (req,res)=>{
    try{
        const data= await BookingSchema.aggregate([
            {
                $group:{
                    _id: { $month: "$createdAt"},
                    count: { $sum : 1 }
                }
            },
            {$sort: { "_id" : 1 }}
        ]);

        const months= ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

        const formatted= months.map((month,i)=>{
            const found= data.find(d=> d._id === i+1);
            return found ? found.count : 0

    });
    res.status(200).json({
        success:true,
        data: formatted
    })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
}


const AdminCheck= async(req,res)=>{
    res.status(200).json({
        success:true,
        admin: req.admin
    })
}


const AdminLog= async(req,res)=>{
    try{
        const{email,password}= req.body;

        if (!email || !password) {
    return res.status(400).json({
    success: false,
    message: "Email and password required"
  });
}

        //check admin exists
        const admin= await AdminSchema.findOne({email});
        if(!admin){
            return res.status(401).json({
                success:false,
                message:"Invalid Credentials"
            })
        }

        const ComparePassword= await bcrypt.compare(password, admin.password);
        if(!ComparePassword){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password"
            });
            }

            //token
            const token= jwt.sign(
                { id: admin._id, role:"admin" },
                process.env.JWT_SECRET,
                { expiresIn: "1d"}
            );

            res.cookie("adminToken",token,{
                httpOnly:true,
                sameSite: "none",
                secure: true,
                path:"/"
            });

            res.status(200).json({
                success:true,
                message:"Admin loggin successfull"
            })
        
    }catch(err){
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
}


const GetAllReviews= async(req,res)=>{
    try{
        const reviews= await ReviewSchema.find()
        .populate("user","name avatar")
        .populate("package","title")
        .sort({ createdAt:-1 });

        res.status(200).json({
            success:true,
            reviews
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
}


const UpdateReviews= async(req,res)=>{
    try{
        const {status}= req.body;
        
        await ReviewSchema.findByIdAndUpdate(req.params.id,{
            status
        })

        res.status(200).json({
            success:true,
            message:`Review ${status}`
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


const GetRecentBookings= async(req,res)=> {
    try{
        const bookings= await BookingSchema.find()
        .populate("user","name")
        .populate({
            path:"package",
            select:"destination",

            populate:{
                path:"destination",
                select:"name"
            }
        })
        .sort({ createdAt:-1 })
        .limit(5)

        res.status(200).json({
            success:true,
            bookings
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


const GetRecentActivities= async(req,res)=>{
    try{
        const activities= await ActivitySchema.find()
        .populate("user","name")
        .sort({ createdAt:-1})
        .limit(10)

        res.status(200).json({
            success:true,
            activities
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


const GetPaymentStats= async (req,res)=>{
    try{
        const stats= await BookingSchema.aggregate([
            {
                $group: {
                    _id: "$paymentStatus",
                    count: { $sum:1 }
                }
            }
        ]);
        let result= {
            paid:0,
            pending:0,
            unpaid:0
        }

        stats.forEach(s=>{
            result[s._id] = s.count
        });

        res.status(200).json({
            success:true,
            stats:result
        })
    }
    catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

const GlobalSearch= async(req,res)=>{
    try{
        const q= req.query.q;

        if(!q) return res.json({success: true});

        const regex= new RegExp(q, "i");

        const bookings= await BookingSchema.find({ name: regex })
        .limit(5)
        .select("name _id");

        const users= await UserSchema.find({ name: regex })
        .limit(5)
        .select("name _id")

        const packages= await PackageSchema.find({ title: regex })
        .limit(5)
        .select("title _id")

        const categories= await categoriesSchema.find({ name: regex })
        .limit(5)
        .select("name _id")

        const destinations= await destinationSchema.find({ name: regex })
        .limit(5)
        .select("name _id")

        res.status(200).json({
            success:true,
            bookings,
            users,
            packages,
            categories,
            destinations
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
}

const GetNotification= async (req,res)=>{
    try{
        const list= await ActivitySchema.find()
        .sort({ createdAt: -1 })

        const unread= await ActivitySchema.countDocuments({ read:false });
        res.status(200).json({
            success: true,
            list,
            unread
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
}

const MarkNotificationRead= async(req,res)=>{
    try{
        await ActivitySchema.findByIdAndUpdate(
            req.params.id,
            {read:true}
        )
        res.status(200).json({
            success:true
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
}


const GetAdminProfile= async (req,res)=>{
    try{
        const admin = await AdminSchema.findById(req.admin.id)
      .select("-password");

    res.json({
      success: true,
      admin
    });
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

const UpdateAdminprofile= async (req,res)=>{
    try{
        const {name,phone}= req.body;

        const admin= await AdminSchema.findByIdAndUpdate(
            req.admin.id,
            {name, phone},
            {new:true}
        ).select("-password")

        res.status(200).json({
            success:true,
            message: "Profile Updated",
            admin
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

const UpdateAdminAvatar= async (req,res)=>{
    try{
        if(!req.file){
            res.status(400).json({
                success:false,
                message: "Image is required"
            })
        }
        const result= await cloudinary.uploader.upload(req.file.path);

        const updatedAdmin= await AdminSchema.findByIdAndUpdate(
            req.admin.id,
            {avatar: result.secure_url},
            {new:true}
          );

          fs.unlinkSync(req.file.path)

          res.status(200).json({
          success:true,
          message:"Profile photo updated",
          avatar:updatedAdmin.avatar
  })
        
    }
    catch(err){
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
}

const AdminLogout= async(req,res)=>{
    try{
        res.clearCookie("adminToken",{
            httpOnly:true,
            sameSite:"none",
            secure:true
        });

        res.status(200).json({
            success:true,
            message:"Admin logout successfully"
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

module.exports= { createCategory, GetCategories, GetcategoryById, UpdateCategory, DeleteCategory, CreateDestination,
    GetDestinations, GetDestinationById, UpdateDestination, DeleteDestination, CreateUser, GetUser, UpdateUser,
    DeleteUser, GetSingleUser, CreatePackage, GetPackages, GetSinglePackage, UpdatePackage, DeletePackge,
    GetBookings, UpdateBookings, DeleteBooking, GetSingleBookings, GetPayments, CreateSubscribe, GetSubscribers,
    DeleteSubscriber, GetContacts, DeleteContacts, ReplytoMessage, GetDashboardStats, GetTopDestinationGraph,
    GetBookingTrendGraph, AdminLog, AdminLogout, AdminCheck, GetAllReviews, UpdateReviews, GetRecentBookings,
    GetRecentActivities, GetPaymentStats, GlobalSearch, GetNotification, MarkNotificationRead, GetAdminProfile,
    UpdateAdminprofile, UpdateAdminAvatar

}