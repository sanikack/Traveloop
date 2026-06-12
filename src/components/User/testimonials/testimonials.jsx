import React, { useEffect, useState, useCallback } from "react";
import "./testimonials.scss"
import { Star } from "lucide-react";


const Testimonials= ()=>{

    const [review, setReview]= useState([]);
    const [index, setindex]= useState(0);

    useEffect(()=>{
        fetchReviews()
    },[]);


    const fetchReviews= async()=>{
        try{
            const res= await fetch(`${process.env.REACT_APP_API_URL}/api/review`);
            const data= await res.json();

            if(res.ok){
                const testimonials= data.reviews.filter((r)=> r.status === "Approved");

                setReview(testimonials)
            }
        }
        catch(err){
            console.error(err);
            
        }
    }

    const nextslide= useCallback( ()=>{
        setindex((pre)=>
            (pre+1)% review.length)
    },
[review.length])

    const preslide= ()=>{
        setindex((pre)=>
            pre===0 ? review.length-1 : pre-1
        )
    }


     //auto slide

        useEffect(()=>{

            if(review.length === 0) return

            const timer= setInterval(()=>{
                nextslide()
            },3000);

            return ()=> clearInterval(timer)
        },[nextslide, review.length]);


        // {/* pagination function */}
        const Pagination= (i)=> setindex(i);

    return(
        <div className="testimonial-container">

            <div className="left-side">
                <h3 className="sub-title">Testimonials</h3>
                <h1 className="main-title">What People Say About Us</h1>

                {/* pagination dots */}
                <div className="pagination-dots">
                    {review.map((_,i)=>(
                        <span key={i}
                        className={`dot ${i===index ? "active" : ""}`}
                        onClick={()=>Pagination(i)}
                        >      
                        </span>

                    ))}
                </div>
                    </div>

                    <div className="right-side">
                        <div className="testimonial-card">

                            {review.length > 0 && (
                                <div className="testimonialcard">

                                    <img src={review[index].user?.avatar
                                    ? review[index].user.avatar : "./images/user/userIcon.jpg"}
                                    className="user-img" alt="user" />

                            <p className="review-text">{review[index].review}</p>

                            {/* ⭐ Rating stars */}
                            <div className="rating">
                                {[...Array(5)].map((_,i)=>(
                                    <Star 
                                    size={16}
                                    key={i}
                                    className={i < review[index].rating ? "filled" : ""}
                                    fill={i < review[index].rating ? "#f4b400" : "none"}
                                    stroke="#f4b400"
                                    />
                                ))}
                            </div>

                            <h3 className="user-name">{review[index].user?.name}</h3>

                            <p className="user-place">{review[index].package?.title}</p>

                             <div className="arrow-btn">
                    <button className="buttons" onClick={nextslide} disabled={review.length === 0} >&uarr;</button>
                    <button className="buttons" onClick={preslide} >&darr;</button>
                </div>
             </div>
             )}
                        
         </div>
     </div>
  </div>
                
               

    )
}

export default Testimonials