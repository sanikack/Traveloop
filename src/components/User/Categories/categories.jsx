import React, { useEffect, useState } from "react";
import "./categories.scss"
import { Link, useParams } from "react-router-dom";

const Categories = ()=>{

    const [categories, setCategories]= useState([]);
    const [index, setindex]= useState(0);


    //fetch categories from backend...
    const fetchCategories= async () =>{
       try{

         const res= await fetch("http://localhost:8000/api/category");
        const data= await res.json();

        if(res.ok){
            const activeCategories= data.categories.filter((cat)=> cat.isActive === true);

            setCategories(activeCategories);
        }
       }
       catch(err){
        console.error("failed to fetch categories", err);
        
       }
    }

    //CALL ON LOAD
    useEffect(()=>{
        fetchCategories()
    },[]);


    // AUTO SLIDE
    useEffect(()=>{
        if(categories.length === 0) return

        const intervel= setInterval(() => {
            setindex((pre)=> (pre+1) % categories.length)
        }, 4000);

        return()=> clearInterval(intervel)

    },[categories.length]);


    //BUTTON CONTROLS
    const goNext= ()=>{
        setindex((pre)=> (pre+1) % categories.length)
    }

    const goPrev= ()=>{
        setindex((pre)=> pre === 0 ? categories.length-1 : pre-1)
    };

  

    return(
        <section className="categories">
            <h2 className="category-title">Explore By Category</h2>

            <div className="arrow-container">
                <button onClick={goNext} className="arrow-btn">&lt;</button>
                <button onClick={goPrev} className="arrow-btn">&gt;</button>
            </div>
       
            <div className="carousel">
              <div className="carousel-track" 
              style={{transform: `translateX(-${index * 260}px)`}}
              >

{categories.map((cat) => (
    <Link key={cat._id} to={`/categories/${cat.slug}`}>
  <div className="carousel-card">
    <img src={`http://localhost:8000/uploads/${cat.image}`} alt={cat.name} />
    <span>{cat.name}</span>
              </div>
            </Link>            
        ))}
      </div>
      </div>
        </section>
    )
}

export default Categories