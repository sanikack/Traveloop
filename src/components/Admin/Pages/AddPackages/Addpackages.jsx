import React, { useEffect, useState } from "react";
import "./Addpackages.scss"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const AddPackages= ()=>{
    const navigate= useNavigate();

    const [categories, setCategories]= useState([])
    const [destinations, setDestinations]= useState([])

    const [formData, setFormData]= useState({
        title:"",
        location: "",
        days: 1,
        nights: 0,
        price: "",
        category: "",
        destination:"",
        type:"",
        featured: false,
        status: "Active",
        description:""
    });

    const [loading, setLoading]= useState(false);
    const [image, setImage]= useState(null)
    const [gallery, setGallery]= useState([])
    const [inclusion, setInclusion]= useState("")
    const [exclusion, setExclusion]= useState("")
    const [itinerary, setItinerary]= useState([
        {day:1, title:"", description:"",}
    ])


    //FETCH CATEGORIES AND DESTINATIONS

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/api/admin/categories`,{
            credentials: "include"
        })
        .then(res=> res.json())
        .then(data=> {
            const list= data.categories || [];
            setCategories(list.filter(c=> c.isActive))
        });

        fetch(`${process.env.REACT_APP_API_URL}/api/admin/destination`,{
            credentials:"include"
        })
        .then(res=> res.json())
        .then(data=> {
            const list= data.destination || [];    //api response le ninnu varunna api key
            setDestinations(list.filter(d=> d.isActive))
        })
    },[])

    const showAlert= (icon,text)=>{
        Swal.fire({
            toast: true,
            icon,
            text,
            position: "top",
            showConfirmButton: false,
            timer: 2500
        })
    }


    const handlechange= async(e)=>{
        const { name, value, type, checked}= e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    }

    // handle ITINERARY
    const handleItineraryChange= (index,field,value)=>{
        const updated= [...itinerary];
        updated[index][field]= value;
        setItinerary(updated)
    };


    const addItineraryDay= ()=>{
        setItinerary([
            ...itinerary,
            {day: itinerary.length + 1, title:"", description:"" }
        ])
    }


    const handleSubmit= async(e)=>{
        e.preventDefault();

        if(!formData.title || !formData.location || !formData.price || !formData.category || !image || !formData.days || formData.nights === "" || !formData.destination){
            showAlert("error", "All fields are required.")
            return
        }

           
        try{
            setLoading(true)

            const Data=  new FormData();
            Object.keys(formData).forEach(key=>
                Data.append(key, formData[key])
            );

            Data.append("image", image)

            //arrays...
            Data.append("inclusion", JSON.stringify(inclusion.split("\n")))
            Data.append("exclusion", JSON.stringify(exclusion.split("\n")))
            Data.append("itinerary", JSON.stringify(itinerary))

            gallery.forEach((img)=>(
                Data.append("gallery", img)
            ))


            const res= await fetch(`${process.env.REACT_APP_API_URL}/api/admin/packages`,{
                method: "POST",
                body: Data
            })
            const data= await res.json();

            if(!res.ok){
                showAlert("error", data.message)
                return
            }

            showAlert("success", data.message)

            setTimeout(() => {
                navigate("/admin/package")
            }, 2000);
        }
        catch(err){
            showAlert("error", err.message)
        }
        finally{
            setLoading(false)
        }
    }

    return(
        <div className="addpkg-container">
            <h2>Add Packages</h2>

            <form className="addpkg-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                <input type="text" name="title" placeholder="title" value={formData.title} onChange={handlechange}/>
                </div>

                <div className="form-group">
                    <label>Location</label>
                    <input type="text" name="location" placeholder="location" value={formData.location} onChange={handlechange}/>
                </div>

               <div className="form-group">
                    <label>Days</label>
                    <input type="number" name="days" min="1" step="1" value={formData.days} onChange={handlechange}/>
                </div>

                <div className="form-group">
                    <label>Nights</label>
                    <input type="number" name="nights" value={formData.nights} min="0" onChange={handlechange} />
                </div>

                 <div className="form-group">
                    <label>Price</label>
                    <input type="number" name="price" value={formData.price} onChange={handlechange} placeholder="Place"/>
                </div>

                <div className="form-group">
                    <select name="category" value={formData.category} onChange={handlechange}>
                        <option value="">Select Category</option>
                        {categories.map(c=>(
                            <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <select name="destination" value={formData.destination} onChange={handlechange}>
                        <option value="">Select Destination</option>
                        {destinations.map(d=>(
                            <option key={d._id} value={d._id}>{d.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <select name="type" onChange={handlechange}>
                        <option>Select Package Type</option>
                        <option value="Honeymoon">Honeymoon</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Family">Family</option>
                        <option value="Premium">Premium</option>
                        <option value="Budget">Budget</option>
                    </select>
                </div>

                <div className="form-group">
                    <textarea name="description" placeholder="package description" rows="4" onChange={handlechange}></textarea>
                </div>

                <div className="form-group">
                    <label>
                        <input type="checkbox" name="featured" onChange={handlechange} />
                        Featured Package
                    </label>
                </div>

                <div className="form-group">
                    <label>Main Image</label>
                    <input type="file" accept="image/*" onChange={(e)=> setImage(e.target.files[0])} />
                    <label>Gallery Image</label>
                    <input type="file" accept="image/*" multiple onChange={(e)=> setGallery([...e.target.files])} />
                </div>

                <div className="form-group">
                    <textarea name="inclusion" placeholder="Inclusions (one per line)" rows="4" onChange={(e)=>setInclusion(e.target.value)}></textarea>
                </div>

                <div className="form-group">
                    <textarea name="exclusion" placeholder="Exclusions (one per line)" rows="4" onChange={(e)=>setExclusion(e.target.value)}></textarea>
                </div>

                <div className="form-group">
                    <h4>Itinerary</h4>
                    {itinerary.map((item,index)=>(
                        <div className="itinerary-box" key={index}>
                            <input type="text"placeholder={`Day ${item.day} Title`}
                            onChange={(e)=>handleItineraryChange(index,"title",e.target.value)}
                             />

                            <div className="form-group">
                             <textarea name="description" placeholder="Description" rows="2"
                             onChange={(e)=>handleItineraryChange(index,"description",e.target.value)} style={{marginTop:"26px"}}
                             ></textarea>
                        </div>
                        </div>
                    ))}
                </div>

                <div className="form-group">
                    <button type="button" onClick={addItineraryDay}>
                        + Add Day
                    </button>
                </div>

                 <div className="form-group">
                    <label>Status</label>
                    <select name="status" value={formData.status} onChange={handlechange}>
                        <option value="Active">Active</option>
                        <option value="Blocked">Blocked</option>
                    </select>
                </div>

                <button className="save-btn" disabled={loading}>
                    {loading ? "saving..." : "Save Package"}
                </button>
            </form>
        </div>
    )
}


export default AddPackages