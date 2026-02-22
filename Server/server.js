const express= require("express");
const cors= require("cors");
require("dotenv").config();
const Database= require("./config/dataBase")
const CategoryRoutes= require("./routes/Admin/categoryRoutes");
const DestinationRoutes= require("./routes/Admin/destinationRoutes")
const AuthRoutes= require("./routes/User/AuthRoutes")
const UserRoutes= require("./routes/Admin/userRoutes");
const PackageRoute= require("./routes/Admin/packageRoutes")
const InvoiceRoute= require("./routes/User/InvoiceRoutes")
const BookingRoute= require("./routes/Admin/bookingRoute")
const PaymentRoute= require("./routes/User/PaymentRouter")
const UserBookingRoute= require("./routes/User/BookingRoute");
const PaymentsRoutes= require("./routes/Admin/paymentRoute")
const PackageRoutes= require("./routes/User/PackageRoutes")
const CategoryRoute= require("./routes/User/CategoryRoutes")
const NewsletterRoute= require("./routes/User/NewsletterRoutes")
const SubscribeRouter= require("./routes/Admin/newsletterRoute");
const ContactRouter= require("./routes/User/ContactRoutes");
const MessageRoute= require("./routes/Admin/messageRoutes")
const DestinationsRoute= require("./routes/User/DestinationRoutes")
const SettingsRoute= require("./routes/User/SettingsRoute")
const DashboardRoute= require("./routes/Admin/dashboardRoute")
const AdminAuthRoute= require("./routes/Admin/adminAuthRoute")
const AdminAuth= require("./Middleware/AdminAuth");
const ReviewRoutes= require("./routes/User/ReviewRoutes")
const AdminReviewRoutes= require("./routes/Admin/reviewRoutes")


const cookieParser= require("cookie-parser");


const app= express()


app.use(cors({
    origin: [
        "http://localhost:3000",
        process.env.FRONTEND_URL
    ],
    credentials: true
}))

console.log(process.env.FRONTEND_URL);


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({limit: "50mb", extended:true}))
app.use(cookieParser())
app.use("/uploads", express.static("uploads"))

app.get("/", (req,res)=>{
    res.send("server running")
})

app.get("/home", (req,res)=>{
    res.send("Home page")
})


Database()

//*****ADMIN SIDE *****//
app.use("/api/admin/auth", AdminAuthRoute )
app.use("/api/admin/categories", CategoryRoutes)
app.use("/api/admin/destination", DestinationRoutes)
app.use("/api/admin/packages", PackageRoute)
app.use("/api/admin/user", UserRoutes)
app.use("/api/admin/bookings", BookingRoute)
app.use("/api/admin/payment", PaymentsRoutes )
app.use("/api/admin/subscribe", SubscribeRouter )
app.use("/api/admin/messages", MessageRoute )
app.use("/api/admin/dashboard", DashboardRoute )
app.use("/api/admin/reviews", AdminReviewRoutes )




//*****USER SIDE *****//
app.use("/api/auth", AuthRoutes)
app.use("/api/booking",UserBookingRoute)
app.use("/api/payment", PaymentRoute)
app.use("/api/package", PackageRoutes)
app.use("/api/category", CategoryRoute)
app.use("/api/newsletter", NewsletterRoute)
app.use("/api", InvoiceRoute)
app.use("/api/contact", ContactRouter)
app.use("/api/destination", DestinationsRoute)
app.use("/api/settings", SettingsRoute)
app.use("/api/review", ReviewRoutes)


const Port= process.env.PORT || 8000;
app.listen(Port,()=>{
    console.log(`running on ${Port}`);
    
})