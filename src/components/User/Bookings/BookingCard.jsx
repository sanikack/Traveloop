import { Link } from "react-router-dom";
import "./Bookings.scss"
import { useState } from "react";
import Swal from "sweetalert2";

const BookingCard = ({ booking, onCancel }) => {
  const pkg= booking.package;

  const [showReviewModal, setShowReviewModal]= useState(false);
  const [rating, setRating]= useState(0);
  const [textReview, setTextReview]= useState("");

  const showAlert= (icon,text)=>{
    Swal.fire({
      toast:true,
      icon,
      text,
      showConfirmButton:false,
      position:"top",
      timer:2500
    })
  }

  const handleSubmitReview= async ()=> {
     if(!rating || !textReview.trim()){
    showAlert("error", "Please add rating and review")
    return
  }

  try{
    const res= await fetch(`${process.env.REACT_APP_API_URL}/api/review`,{
      method:"post",
      credentials: "include",
      headers:{ "Content-Type" : "application/json"},
      body: JSON.stringify({
        bookingId: booking._id,
        packageId: pkg._id,
        rating: Number(rating),
        review: textReview
      })
    });

    const data= await res.json();

    if(!res.ok){
      showAlert("error", data.message)
      return
    }

    showAlert("success", data.message)


    //reset and close
    setRating(0)
    setTextReview("")
    setShowReviewModal(false)

  }
  catch(err){
    showAlert("error", err.message)
  }
  }

  return (
    <>
    <div className="booking-card">
      <img src={`${process.env.REACT_APP_API_URL}/uploads/${pkg.image}`} alt={pkg.title} />

      <div className="details">
        <h3>{pkg.title}</h3>

        <p>Travel Date:{" "}
          {new Date(booking.travelDate).toLocaleDateString()}
        </p>

        <p>Duration: {pkg.days} Days / {pkg.nights} Nights</p>
        <p>Adults: {booking.adults}</p>

        <span className={`status ${booking.status.toLowerCase()}`}>
          {booking.status}
        </span>

        <h4>₹{pkg.price}</h4>

        <div className="actions">
          <Link to={`/package/${pkg._id}`}>View</Link>
          {/* <Link to={`/invoice/${booking._id}`}>Invoice</Link> */}

          {booking.status === "Pending" && (
            <button className="CancelBook" 
            onClick={()=> onCancel(booking._id)}>
              Cancel
            </button>
          )} 

          {booking.status === "Confirmed" && (
            <button onClick={()=> setShowReviewModal(true)}>Write Review</button>
          )}
        </div>
        <a href={`${process.env.REACT_APP_API_URL}/api/invoice/${booking._id}`} target="_blank" 
        rel="noopener noreferrer" className="actions">
        Invoice
        </a>
      </div>
    </div>




   {/* 🔽 REVIEW MODAL */}
  {showReviewModal && (
    <div className="review-modal-overlay" onClick={()=> setShowReviewModal(false)}>
      <div className="review-modal" onClick={(e)=> e.stopPropagation()}>
        <h3>Write Review For {pkg.title}</h3>

        {/* ⭐ Rating */}
        <div className="rating">
          {[1,2,3,4,5].map((star)=> (
            <span key={star}
            className={star <= rating ? "star active" : "star"}
            onClick={()=> setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        {/* 📝 Review */}
        <textarea placeholder="Write your review..." value={textReview}
        onChange={(e)=> setTextReview(e.target.value)}
        ></textarea>

        <div className="modal-actions">
          <button onClick={()=> setShowReviewModal(false)}>
            Cancel
          </button>
          <button onClick={handleSubmitReview}>
            Submit
          </button>
        </div>
      </div>
    </div>

    )}
  </>
 );
};

export default BookingCard;
