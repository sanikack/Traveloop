import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import CategoryHero from "./components/categoryHero";
import CategorySummary  from "./components/categorySummary"
import CategoryWhy from "./components/catrgoryWhy"
import CategryPackages from "./components/categoryPackages";
import "./CategoryDetails.scss"


const CategoryDetails= ()=>{
    const {slug}= useParams();
    const [category, setCategory]= useState(null)
    const [packages, setPackages]= useState([])
    const [loading, setLoading]= useState(true)

    useEffect(()=>{
        fetchcategories()
    },[fetchcategories]);

    const fetchcategories= useCallback( async ()=>{
        try{
            const res= await fetch(`${process.env.REACT_APP_API_URL}/api/category/${slug}`)
            const data= await res.json();

            if(res.ok){
                setCategory(data.category)
                setPackages(data.packages || []);
            }
        }
        catch(err){
            console.error(err);
            
        }
        finally{
            setLoading(false)
        }
    },
    [slug]);


    if(loading) return <div className="loading">Loading...</div>
    if(!category) return <div className="loading">Category not found</div>

    return(
        <div className="singleCategory">
            <CategoryHero category={category}/>
            <CategorySummary category={category}/>
            <CategoryWhy specialities= {category.specialities}/>
            <CategryPackages packages={packages}/>
        </div>
    )
}



export default CategoryDetails