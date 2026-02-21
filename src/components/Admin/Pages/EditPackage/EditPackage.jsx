import React, { useEffect, useState } from "react";
import "./EditPackage.scss"
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";


const EditPackages= ()=>{
    const {id}= useParams();

    const navigate= useNavigate();

    const [title, setTitle]= useState("")
    const [location, setLocation]= useState("")
    const [days, setDays]= useState("")
    const [nights, setNights]= useState("")
    const [price, setPrice]= useState("")
    const [category, setCategory]= useState("");
    const [destination, setDestination]= useState("");
    const [type, setType]= useState("");
    const [featured, setFeatured]= useState(false)
    const [status, setStatus]= useState("Active")
    const [description, setDescription] = useState("");
    const [inclusion, setInclusions] = useState("");
    const [exclusion, setExclusions] = useState("");
    const [itinerary, setItinerary] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [image, setImage]= useState(null)
    const [loading, setLoading]= useState(false)

    const [categories, setCategories]= useState([])
    const [destinations, setDestinations]= useState([])


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

        const fetchPackages= async ()=>{
            try{
                const res= await fetch(`${process.env.REACT_APP_API_URL}/api/admin/packages/${id}`,{
                    credentials: "include"
                })
            const data= await res.json();

            if(!res.ok){
             showAlert("error", data.message)
                return
            }

            const pkg= data.packages

            setTitle(pkg.title);
            setLocation(pkg.location);
            setDays(pkg.days);
            setNights(pkg.nights);
            setPrice(pkg.price);
            setCategory(pkg.category?._id || pkg.category || "");
            setDestination(pkg.destination?._id || pkg.destination || "");
            setType(pkg.type);
            setFeatured(pkg.featured);
            setImage(null);
            setStatus(pkg.status);
            setDescription(pkg.description || "");
            setInclusions(pkg.inclusion ? pkg.inclusion.join("\n"): "");
            setExclusions(pkg.exclusion ? pkg.exclusion.join("\n") : "")
            setItinerary(pkg.itinerary || []);

        }
        catch(err){
            showAlert("Error", err.message)
      }
     }


      useEffect(()=>{
        fetchPackages()
     },[id])



     //fetch categories and destinations
     useEffect(()=>{

        fetch(`${process.env.REACT_APP_API_URL}/api/admin/categories`,{
            credentials: "include"
        })
        .then(res=> res.json())
        .then(data=>{
            setCategories((data.categories || []).filter(c=> c.isActive))
        })


        fetch(`${process.env.REACT_APP_API_URL}/api/admin/destination`,{
            credentials: "include"
        })
        .then(res=> res.json())
        .then(data=>{
            setDestinations((data.destination || []).filter(d=> d.isActive))
        })
     },[])
    
    

     const addDay= ()=>{
        setItinerary([
            ...itinerary,
            {day: itinerary.length+1, title:"", description:""}
        ])
     } ;


     const handleItineraryChange= (index,field,value)=>{
        const updated= [...itinerary];
        updated[index][field]= value;
        setItinerary(updated);
     }

     //GALLERY IMAGE SETUP
     const handleGalleryChange= (e)=>{
        const files= Array.from(e.target.files);
        setGallery(prev=> [...prev, ...files])
     }


    //UPDATE SECTION

    const handleSubmit= async(e)=>{
        e.preventDefault();

        if(!title) return showAlert("error", "All fields are required")

            try{
                setLoading(true);

                const formData= new FormData();
                formData.append("title", title)
                formData.append("location", location)
                formData.append("days", days)
                formData.append("nights", nights)
                formData.append("price", price)
                formData.append("category", category)
                formData.append("destination", destination)
                formData.append("type", type)
                formData.append("featured", featured ? "true" : "false")
                formData.append("status", status)
                formData.append("description", description);

                formData.append("inclusion", JSON.stringify(inclusion.split("\n")));
                formData.append("exclusion", JSON.stringify(exclusion.split("\n")));
                formData.append("itinerary", JSON.stringify(itinerary));

                if(image) formData.append("image", image)

               gallery.forEach((img)=>(
                formData.append("gallery",img)
               ))   

                    const res= await fetch(`${process.env.REACT_APP_API_URL}/api/admin/packages/${id}`,{
                        method: "PUT",
                        body: formData,
                        credentials: "include"
                    }
                    )
                    const data= await res.json();

                    if(!res.ok){
                        showAlert("error", data.message);
                    }
                    showAlert("success", data.message);

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
        <div className="editPkg-container">
            <h2>Edit Packages</h2>

            <form className="pkgForm" onSubmit={handleSubmit}>
                <div className="pkgSection">
                    <label>Title</label>
                    <input type="text" name="title" value={title} onChange={(e)=> setTitle(e.target.value)} />
                </div>

                <div className="pkgSection">
                    <label>Location</label>
                    <input type="text" name="location" value={location} onChange={(e)=> setLocation(e.target.value)} />
                </div>

                <div className="pkgSection">
                    <label>Days</label>
                    <input type="number" name="days" value={days} onChange={(e)=> setDays(e.target.value)} />
                </div>

                <div className="pkgSection">
                    <label>Nights</label>
                    <input type="number" name="nights" value={nights} onChange={(e)=> setNights(e.target.value)} />
                </div>

                <div className="pkgSection">
                    <label>Price</label>
                    <input type="text" name="price" value={price} onChange={(e)=> setPrice(e.target.value)} />
                </div>

                <div className="pkgSection">
                    <select name="category" value={category} onChange={(e)=> setCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        {categories.map((c)=>(
                            <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                    </select>
                </div>

                <div className="pkgSection">
                    <select name="destination" value={destination} onChange={(e)=> setDestination(e.target.value)}>
                        <option value="">Select Destination</option>
                        {destinations.map((d)=>(
                            <option key={d._id} value={d._id}>{d.name}</option>
                        ))}
                    </select>
                </div>

                <div className="pkgSection">
                    <select name="type" value={type} onChange={(e)=> setType(e.target.value)}>
                        <option value="">Select Package Type</option>
                        <option value="Honeymoon">Honeymoon</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Family">Family</option>
                        <option value="Premium">Premium</option>
                        <option value="Budget">Budget</option>
                    </select>
                </div>

                <div className="pkgSection">
                    <label>Image</label>
                    <input type="file" accept="image/*" onChange={(e)=> setImage(e.target.files[0])} />
                </div>

                <div className="pkgSection">
                    <label>Gallery Image</label>
                    <input type="file" multiple accept="image/*" onChange={handleGalleryChange} />
                </div>

                <div className="pkgSection">
                    <label>Description</label>
                     <textarea
                     value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      />
                     </div>


                     <div className="pkgSection">
                      <label>Inclusions (one per line)</label>
                       <textarea
                      value={inclusion}
                        onChange={(e) => setInclusions(e.target.value)}
                        />
                    </div>


                <div className="pkgSection">
                 <label>Exclusions (one per line)</label>
                  <textarea
                  value={exclusion}
                    onChange={(e) => setExclusions(e.target.value)}
                    />
                    </div>
                    


                    <div className="pkgSection">
  <label>Itinerary</label>

  {itinerary.map((item, index) => (
    <div key={index} className="itineraryBox">
      <input
        type="text"
        placeholder={`Day ${item.day} Title`}
        value={item.title}
        onChange={(e) =>
          handleItineraryChange(index, "title", e.target.value)
        }
      />

      <textarea
        placeholder="Day Description"
        value={item.description}
        onChange={(e) =>
          handleItineraryChange(index, "description", e.target.value)
        }
      />
    </div>
  ))}

  <button type="button" className="addDay" onClick={addDay}>
    + Add Day
  </button>
</div>



                      <div className="pkgSection">
                    <label>Featured</label>
                    <select value={featured} onChange={(e)=> setFeatured(e.target.value === "true")}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>


                <div className="pkgSection">
                    <label>Status</label>
                    <select name="status" value={status}
                    onChange={(e)=>setStatus(e.target.value)}>

                        <option value="Active">Active</option>
                        <option value="Blocked">Blocked</option>

                    </select>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Update Package"}
                </button>
            </form>
        </div>
    )
}


export default EditPackages