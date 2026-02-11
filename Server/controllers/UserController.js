const user= require ("../models/UserSchema");
const bcrypt= require ("bcryptjs");
const jwt= require("jsonwebtoken")
const Package= require("../models/PackageSchema")
const BookingSchema= require("../models/BookingSchema");
const categoriesSchema = require("../models/categoriesSchema");
const NewsletterSchema= require("../models/NewsletterSchema")
const ContactSchema= require("../models/ContachSchema")
const DestinationSchema= require("../models/destinationSchema")
const ReviewSchema= require("../models/ReviewSchema")
const cloudinary= require("../config/cloudinary")
const CreateActivity= require("../utils/CreateActivity")
require("dotenv").config()



const SignUp= async (req,res)=>{
    try{
        const { name, email, password, confirmpassword, phone }= req.body;


        if(!name || !email || !password || !confirmpassword || !phone){
            return res.status(400).json({ field:"name", message:"All fields are required."})
        }

        if(password !== confirmpassword){
            return res.status(400).json({ field:"confirmpassword", message:"Password does not match."})
        }

        const existingUser= await user.findOne({email});
        if(existingUser){
            return res.status(400).json({ field:"email", message:"User already exist."})
        };

        const hashedpassword= await bcrypt.hash(password,10); //most comonly saltround(secure)
        const User= await user.create({
            name,
            email,
            phone,
            password:hashedpassword
        });


        //activity log....
        await CreateActivity({
          type: "User",
          message: `New user registered: ${User.name}`,
          user: User._id,
          relatedId: User._id
        })

        res.status(200).json({message:"User Resgistered Successfully."})

    } catch(err) {
        res.status(500).json({message:"signup failed", error:err.message})
    }
};


const Login= async (req,res)=>{
    try{
        const {email, password}= req.body;

        if(!email || !password){
            return res.status(400).json({ field:"email", success: true, message:"All fields are required."})
        }

        const User= await user.findOne({email});
        if(!User){
            return res.status(400).json({ field:"email", success: false, message:"Invalid credentials."})
        } 

        const ismatch= await bcrypt.compare(password, User.password);

        if(!ismatch){
            return res.status(400).json({ field:"password", success: false, message:"Incorrect password"})
        }

        if(User.status === "Blocked"){
            return res.status(400).json({ field:"email", success: false, message:"User blocked by admin"})
        }

        //token creation
        const token= jwt.sign(
            { id:User.id, role:User.role},
            process.env.JWT_SECRET,
            { expiresIn:"7d" }
        );

        //cookie creation
        res.cookie("token", token,{
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.status(200).json({ message: "Login Successful",
        user:{
            id: User.id,
            name: User.name,
            email: User.email,
            role: User.role
        }
      })
    }
    catch(err){
        res.status(500).json({ message:"Login failed", error:err.message})
    }
}


const GetAllPackages= async(req,res)=>{
  try{
    const packages= await Package.find()
    .populate("category","name");

    res.status(200).json({
      success:true,
      packages
    })
  }
  catch(err){
    res.status(500).json({
      success:false,
      message:err.message
    })
  }
}

const GetSinglePackage = async (req, res) => {
  try {
    const pkg = await Package.findOne({
      _id: req.params.id,
      status: "Active"
    }).populate("category", "name slug");

    if (!pkg) {
      return res.status(404).json({
        success: false,
        message: "Package not found"
      });
    }

    res.status(200).json({
      success: true,
      package: pkg   // ⚠️ key name IMPORTANT
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};



const CreateBooking= async (req,res)=>{
  try{
    const {name, email, phone, adults, childrens= 0, travelDate, pickup, notes}= req.body;

    if(!name || !email ||!phone || !adults || !travelDate || !pickup){
      return res.status(400).json({
        success: false,
        field: "general",
        message: "All fields are required"
      })
    }


    // VALIDATIONS

    const emailRegex = /^\S+@\S+\.\S+$/;
    if(!emailRegex.test(email)){
      return res.status(400).json({
        success: false,
        field: "email",
        message: "Please enter the valid email"
      })
    }

    if(phone.length !== 10){
      return res.status(400).json({
        success: false,
        field: "phone",
        message: "Phone number must be 10 digit"
      })
    }

    if(adults < 1){
      return res.status(400).json({
        success: false,
        field: "adults",
        message: "At least one adult is required"
      })
    }

    //FETCH PACKAGE
    const pkg = await Package.findById(req.params.id);
      if(!pkg){
        return res.status(400).json({
          success: false,
          message: "Package not found."
        })
      }

      //CALCULATE TOTAL AMOUNT
      const totalAmount= (adults * pkg.price) +
      (childrens * pkg.price * 0.5);

      
      //SAVE THAT
    const booking= new BookingSchema({
      package: req.params.id,       //package id from url
      user: req.user._id,
      name,
      email,
      phone,
      adults,
      childrens,
      pickup,
      notes,
      travelDate,
      payableAmount : totalAmount                 
    })

    await booking.save();


    //ACTIVITY CREATED....
    await CreateActivity({
      type: "Booking",
      message: `New Booking from ${req.user.name}`,
      user: req.user._id,
      relatedId: booking._id
    })

    //populate here...the data fetch after populate that
    const populatedBooking= await BookingSchema
    .findById(booking._id)
    .populate("package")


    return res.status(201).json({
      success: true,
      message: "Your Booking request has been received. ",
      booking: populatedBooking
    })
  }
  catch(err){
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}


const CheckoutBooking= async(req,res)=>{
  try{
    const {bookingId}= req.params;
    const {paymentMethod}= req.body;

    if(!paymentMethod){
      return res.status(400).json({
        success: false,
        message:"Payment method is required."
      })
    }
    const bookings= await BookingSchema.findById(bookingId).populate("package");

    if(!bookings){
      return res.status(400).json({
        success: false,
        message:"Booking not found"
      })
    }

    let payableAmount= bookings.payableAmount;

    if(paymentMethod === "advance"){
      payableAmount= 1000;
      bookings.paymentStatus= "pending"
    }

    if(paymentMethod === "full"){
      payableAmount= bookings.payableAmount
      bookings.paymentStatus= "paid"
    }

    if(paymentMethod === "arrival"){
      payableAmount= 0;
      bookings.paymentStatus= "unpaid"
      bookings.status= "Confirmed"
    }

    bookings.paymentmethod = paymentMethod
    bookings.payableAmount = payableAmount

    await bookings.save();

    return res.status(200).json({
      success: true,
      message: 
        paymentMethod === "arrival" ? "Booking Confirmed. Pay on arrival"
        : "Proceed to Payment",
      booking:bookings
    })
  }
  catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}


const GetAllCategories= async(req,res)=>{
  try{
    const categories= await categoriesSchema.find({ isActive:true });

    res.status(200).json({
      success:true,
      categories
    })
  }
  catch(err){
    res.status(500).json({
      success:false,
      message:err.message
    })
  }
}

const GetSingleCategory= async (req,res)=>{
  try{
    const category= await categoriesSchema.findOne({
      slug: req.params.slug,
      isActive: true
    })

    if(!category){
      return res.status(400).json({
        success: false,
        message: "Category not found"
      })
    }

    // 🔥 FETCH RELATED PACKAGES USING CATEGORY ID
    const packages = await Package.find({
      category: category._id,
      status: "Active"
    });

    res.status(200).json({
      success: true,
      category,
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


const SubscribeNewsletter= async (req,res)=>{
  try{
    const {email}= req.body;

    if(!email){
      return res.status(400).json({
        success: false,
        message: "Email is required."
      })
    }
    const existingEmail= await NewsletterSchema.findOne({ email });

    if(existingEmail){
      return res.status(400).json({
        success: false,
        message: "Email is already exists."
      })
    }
    await NewsletterSchema.create({ email });

    //CreateActivity...
    await CreateActivity({
      type: "Newsletter",
      message: `Newsletter subscribed by ${email}`,
    })

    res.status(200).json({
      success: true,
      message: "Subscribed Successfully."
    })
  }
  catch(err){
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}



const CreateContact= async (req,res)=>{
  try{
    const {name,email,message}= req.body;

    if(!name || !email || !message){
      res.status(400).json({
        success: false,
        message: "All fields are required."
      })
    }
    await ContactSchema.create({ name, email, message});

    //create activity...
    await CreateActivity({
      type: "Contact",
      message: `Contact message from ${req.user._id}`,
    })

    res.status(200).json({
      success: true,
      message: "Message sent successfully"
    })
  }
  catch(err){
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}


const GetAllDestinations= async (req,res)=>{
  try{
    const destinations= await DestinationSchema.find({ isActive:true });

    res.status(200).json({
      success:true,
      destinations
    })
  }
  catch(err){
    res.status(500).json({
      success:false,
      message:err.message
    })
  }
}


const SingleDestination= async(req,res)=>{
  try{

    const destination= await DestinationSchema.findOne({
      slug: req.params.slug,
      isActive: true
    })

    
    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    //FETCH RELATED PACKAGES FROM DESTINATION ID
    const packages= await Package.find({
      destination: destination._id,
      status: "Active"
      
    })
    res.status(200).json({
      success:true,
      destination,
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


const LogOut= (req,res)=>{
  try{
    res.clearCookie("token",{
      httpOnly:true,
      sameSite:"lax",
      secure:false
    });

    res.status(200).json({
      success:true,
      message:"Logged Out Successfully"
    })
  }
  catch(err){
    return res.status(500).json({
      success:false,
      message:err.message
    })
  }
}


const GetMe= async (req,res)=>{
  try{
    res.status(200).json({
      success: true,
      user:req.user
    })
  }
  catch(err){
    res.status(500).json({
      success:false,
      message:err.message
    })
  }
}


  const GetMyBookings= async(req,res)=>{
    try{
      const bookings= await BookingSchema.find({ user: req.user._id})
      .populate("package","title image price duration")
      .sort({ createdAt: -1 })

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

  const CancelBooking= async (req,res)=>{
    try{
      const booking= await BookingSchema.findOne({
        _id: req.params.id,
        user: req.user._id
      })

      if(!booking){
        return res.status(400).json({
          success:false,
          message: "Booking not found"
        })
      }

      //allow cancel only if pending...
      if(booking.status !== "Pending"){
        return res.status(400).json({
          success:false,
          message: "Only pending bookings can be cancelled"
        })
      }
      booking.status = "Cancelled";
      await booking.save();

      res.status(200).json({
        success:true,
        message: "Booking Cancelled successfully."
      })
    }
    catch(err){
      res.status(500).json({
        success:false,
        message: err.message
      })
    }
  }

const GetProfile= async(req,res)=>{
  console.log("USER:", req.user);

  res.status(200).json({
    success:true,
    user: req.user
  })
}


const UpdateProfile= async(req,res)=>{
  try{
    const {name, phone}= req.body;

    const User= await user.findByIdAndUpdate(
      req.user._id,
      {name,phone},
      {new : true}
    );

    res.status(200).json({
      success:true,
      message: "Profile Updated",
      user:User
    })
  }
  catch(err){
    res.status(500).json({
      success:false,
      message:err.message
    })
  }
}


const UpdateAvatar= async(req,res)=>{
  if(!req.file){
    res.status(400).json({
      success:false,
      message:"image required"
    })
  }

  const result= await cloudinary.uploader.upload(req.file.path);

  const updatedUser= await user.findByIdAndUpdate(
    req.user._id,
    {avatar: result.secure_url},
    {new:true}
  );

  res.status(200).json({
    success:true,
    message:"Profile photo updated",
    avatar:updatedUser.avatar
  })
}


const DeleteAccount= async(req,res)=>{
  await user.findByIdAndDelete(req.user._id);

  res.clearCookie("token");

  res.status(200).json({
    success:true,
    message:"Account deleted permanently."
  })
}


const SubmitReview= async(req,res)=> {
  try{
    const{ bookingId, packageId, review, rating}= req.body;
    const user= req.user.id;

    if(!rating || !review){
      return res.status(400).json({
        success: false,
        message: "Review and Rating are required"
      })
    }

    //prevent duplicate reviews..
    const existingReview= await ReviewSchema.findOne({booking:bookingId})
    if(existingReview){
      return res.status(400).json({
        success: false,
        message:"Review already sumitted."
      })
    }

    await ReviewSchema.create({
      booking: bookingId,
      package: packageId,
      user: user,
      rating,
      review
    });

    //create activity...
    await CreateActivity({
      type: "Review",
      message: `Review from ${req.user._id}`,
      user: req.user._id
    })

    res.status(200).json({
      success:true,
      message:"Review submitted successfully"
    })
  }
  catch(err){
    res.status(500).json({
      success:false,
      message:err.message
    })
  }
}


const GetAllReviews= async(req,res)=>{
  try{
    const reviews= await ReviewSchema.find()
    .populate("user","name avatar")
    .populate("package","title")
    .sort({createdAt:-1})

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

module.exports= {SignUp,Login,GetSinglePackage,CreateBooking, CheckoutBooking, GetSingleCategory, SubscribeNewsletter,
  CreateContact,SingleDestination,LogOut,GetMe,GetMyBookings,GetProfile,UpdateProfile,UpdateAvatar,DeleteAccount,
  GetAllCategories, GetAllDestinations, GetAllPackages, SubmitReview, GetAllReviews, CancelBooking
}