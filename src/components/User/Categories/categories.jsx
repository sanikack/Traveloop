import React, { useEffect, useState } from "react";
import "./categories.scss"
import { Link } from "react-router-dom";
const CARD_WIDTH= 260;

const Categories = ()=>{

    const [categories, setCategories]= useState([]);
    const [index, setindex]= useState(0);


    //fetch categories from backend...
    const fetchCategories= async () =>{
       try{

        const res= await fetch(`${process.env.REACT_APP_API_URL}/api/category`);
        const data= await res.json();

        if(res.ok && data.categories){
            const activeCategories= data.categories.filter(cat => cat.isActive === true);
            setCategories(activeCategories);
            setindex(0)  //reset index after reload index 5 aayal index 0 aayi set cheyyum
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

    //DUPLICATE FOR INIFINIT EFFECT
    const loopedCategories= [...categories,...categories]


    // AUTO SLIDE
    useEffect(()=>{
        if(!categories.length) return

        const intervel= setInterval(() => {
            setindex(pre=> pre+1)
        }, 4000);

        return()=> clearInterval(intervel)

    },[categories]);


    //RESET INDEX WHEN CROSSED ORIGINAL LENGTH
    useEffect(()=>{
        if(index >= categories.length){
            setTimeout(() => {
                setindex(0);
            }, 500);
        }
    },[index, categories.length])


    //BUTTON CONTROLS
    const goNext= ()=>{
        setindex(pre => (pre+1) % categories.length)
    }

    const goPrev= ()=>{
        setindex(pre => pre === 0 ? categories.length-1 : pre-1)
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
              style={{transform: `translateX(-${index * CARD_WIDTH}px)`}}
    
              >

{loopedCategories.map(cat => (
    <Link key={cat._id} to={`/categories/${cat.slug}`} className="card-link">
  <div className="carousel-card">
    {cat.image ? (<img src={cat.image.startsWith("http") ? cat.image :
    `${process.env.REACT_APP_API_URL}/uploads/${cat.image}`} alt={cat.name}/>) : ("No Image")}
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