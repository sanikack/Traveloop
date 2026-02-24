const puppeteer= require("puppeteer");
const ejs= require("ejs");
const path = require("path");
const BookingSchema= require("../models/BookingSchema");



const DownloadInvoice= async (req,res)=>{
    try{

      const {bookingId}= req.params;

      const bookingDoc = await BookingSchema.findById(bookingId)
      .populate("package")
      .populate("user")

      if(!bookingDoc){
        res.status(400).json({
          success:false,
          message: "Booking not found."
        })
      };

      const booking= {
        bookingId: bookingDoc._id,
        name: bookingDoc.user.name,
        email: bookingDoc.user.email,
        phone: bookingDoc.user.phone,
        packageTitle: bookingDoc.package.title,
        date: bookingDoc.travelDate.toDateString(),
        adults: bookingDoc.adults,
        childrens: bookingDoc.childrens,
        payableAmount: bookingDoc.payableAmount,
      }
      
    const TempPath= path.join(__dirname,"../Templates/invoice.ejs")
    //reder ejs to html....
    const html= await ejs.renderFile(TempPath, {booking});

    // best for windows and chrome
    const browser = await puppeteer.launch({ 
      headless:"new", 
      args:["--no-sandbox", 
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      ]
     });

    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "load" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=invoice-${bookingId}.pdf`,
      "Content-Length": pdfBuffer.length
    });

    res.end(pdfBuffer);
    }

    catch (err) {
    res.status(500).json({ message: err.message });
  }
}




module.exports= {DownloadInvoice}