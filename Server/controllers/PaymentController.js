const razorpay= require("../utils/Razorpay");
const CreateActivity= require("../utils/CreateActivity");
const BookingSchema = require("../models/BookingSchema");

const CreateRazorpayOrder= async (req,res)=>{
    try{
        const {amount,bookingId}= req.body;

        if(!amount || !bookingId){
            return res.status(400).json({
                success: false,
                message:"amount and bookingId are required"
            })
        }

        const order= await razorpay.orders.create({
            amount: amount * 100, //paise
            currency: "INR",
            receipt: `booking_${bookingId}`
        })

        //create activity...
            await CreateActivity({
              type: "Payment",
              message: `Payment received ₹${amount}`,
              user: req.user?._id || null
            })


        res.status(200).json({
            success:true,
            message: "Payment successful",
            orderId: order.id,
            amount: order.amount
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}



const verifyPaymentAndUpdateBooking= async (req,res)=>{
    try{
        const{ bookingId, transactionId}= req.body;

        const booking= await BookingSchema.findByIdAndUpdate(
            bookingId,
            {
                paymentStatus: "paid",
                transactionId,
                status: "Confirmed"
            },
            { new:true }
        );

        if(!booking){
            return res.status(400).json({
                success:false,
                message: "Bookings not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Payment Verified & booking updated"
        })
    }
    catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

module.exports= {CreateRazorpayOrder, verifyPaymentAndUpdateBooking}