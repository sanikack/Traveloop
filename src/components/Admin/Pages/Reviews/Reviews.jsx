import { useEffect, useState } from "react";
import "./Reviews.scss";
import { Star, EyeOff, CheckCircle } from "lucide-react";
import Swal from "sweetalert2";


const Reviews = () => {
  const [reviews, setReviews]= useState([]);

  const showAlert= (icon,text)=>{
    Swal.fire({
      toast:true,
      text,
      showConfirmButton:false,
      position:"top",
      timer:2500
    })
  }

  useEffect(()=>{
    fetchReviews()
  },[]);


  const fetchReviews= async ()=>{
    try{
      const res= await fetch("http://localhost:8000/api/admin/reviews",{
        credentials: "include"
      })
      const data= await res.json();

      if(res.ok){
        setReviews(data.reviews)
      }
    }
    catch (err) {
        console.error(err);
      }
  };

  //approve hide reviews..
  const Updatestatus= async(id, status)=> {
    const res= await fetch(`http://localhost:8000/api/admin/reviews/${id}`,{
      method: "put",
      credentials: "include",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({ status })
    });

    if(!res.ok){
      showAlert("error", "failed to update")
    }

    //Update UI instantly
    setReviews(prev =>
      prev.map(r=>
        r._id === id? {...r, status} : r
      )
    )
  }




  return (
    <div className="admin-reviews">
      {/* Header */}
      <div className="reviews-header">
        <h2>User Reviews</h2>
        <input type="text" placeholder="Search reviews..." />
      </div>

      {/* Reviews List */}
      <div className="reviews-grid">
        {reviews.map((review) => (
          <div className="review-card" key={review._id}>
            <div className="review-top">
              
              <div className="user-info">
                <img src={review.user?.avatar || "./images/user/userIcon.jpg"}
                alt={review.user?.name} />
              </div>
              <div>

                <h4>{review.user?.name}</h4>
                <p className="place">{review.package?.title}</p>
              </div>
              <span
                className={`status ${review.status.toLowerCase()}`}
              >
                {review.status}
              </span>
            </div>

            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < Number(review.rating) ? "filled" : ""}
                  fill={i < Number(review.rating) ? "#f4b400" : "none"}
                  stroke="#f4b400"
                />
              ))}
            </div>

            <p className="review">{review.review}</p>

            <div className="review-footer">
              <span className="date">{new Date(review.createdAt).toLocaleDateString()}</span>

              <div className="actions">
                <button className="approve" onClick={()=> Updatestatus(review._id, "Approved")}>
                  <CheckCircle size={16} />
                  Approve
                </button>
                <button className="hide" onClick={()=> Updatestatus(review._id, "Hidden")}>
                  <EyeOff size={16} />
                  Hide
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
