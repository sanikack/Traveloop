import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditCategory.scss";
import Swal from "sweetalert2";

const EditCategory = () => {
  const { id } = useParams();

  const navigate= useNavigate();

  const [name, setName] = useState("");
  const [preview, setPreview] = useState("");
  const [status, setStatus] = useState(true);
  const [image, setImage] = useState(null);
  const [shortdescription, setShortDescription] = useState("");
  const [idealFor, setidealFor] = useState("");
  const [tripStyle, setTripStyle] = useState("");
  const [bestSeason, setBestSeason] = useState("");
  const [specialities, setSpecialities] = useState("");
  const [loading, setLoading] = useState(false);


  //REUSABLE ALERT
  const showAlert = (icon, text)=>{
   Swal.fire({
    toast: true,
    icon,
    text,
    showConfirmButton: false,
    position:"top",
    timer: 2500
   })
  };
  

  const fetchCategories= useCallback( async ()=>{
    try{
      const res= await fetch(`${process.env.REACT_APP_API_URL}/api/admin/categories/${id}`);

      const data = await res.json();

      if(!res.ok){
        showAlert("error", data.message)
        return
      }
      

      setName(data.categories.name)
      setStatus(data.categories.isActive)
      setShortDescription(data.categories.shortdescription || "")
      setBestSeason(data.categories.bestSeason || "")
      setTripStyle(data.categories.tripStyle || "")
      setidealFor(data.categories.idealFor || "")
      setSpecialities(data.categories.specialities?.join("\n") || "")
      setPreview(data.categories.image ?
        `${process.env.REACT_APP_API_URL}/uploads/${data.categories.image}` : ""
      )
    }
    catch(err){
      showAlert("error", err.message)
      console.error(err);
      console.log(err);
    }
  },
  [id])

  useEffect(()=>{
    fetchCategories()
  },[fetchCategories])


  //******* UPDATE CATEGORY ********/
  const handleSubmit= async (e)=>{
    e.preventDefault()

    if(!name){
      showAlert("error", "Category name is required");
      return
    }

    try{
      setLoading(true);
      const formData= new FormData();
      formData.append("name", name)
      formData.append("isActive", status)
      formData.append("shortdescription", shortdescription)
      formData.append("idealFor", idealFor)
      formData.append("bestSeason", bestSeason)
      formData.append("tripStyle", tripStyle)
      formData.append("specialities",
        JSON.stringify(specialities.split("\n").filter(Boolean))
      )

      if(image) formData.append("image", image)


        const res= await fetch(`${process.env.REACT_APP_API_URL}/api/admin/categories/${id}`,{
          method: "Put",
          body: formData
        });

        const data = await res.json();

        if(!res.ok){
          showAlert("error", data.message)
          return
        }

        showAlert("success", data.message);

        setTimeout(() => {
          navigate("/admin/categories")
        }, 2500);
    }
    catch(err){
      console.error(err)  
      showAlert("error", "Error", err.message)
    }
    finally{
      setLoading(false)
    }
  }


  return (
    <section className="edit-category">
      <h2>Edit Category</h2>

      <form onSubmit={handleSubmit} >
        <div className="form-group">
          <label>Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e)=> setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Short Description</label>
          <textarea rows="3" value={shortdescription} onChange={(e)=>setShortDescription(e.target.value)}></textarea>
        </div>

        <div className="form-group">
          <label>Best Season</label>
          <input type="text" value={bestSeason} placeholder="Sep-Mar" onChange={(e)=> setBestSeason(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Ideal For</label>
          <input type="text" value={idealFor} placeholder="Couples, Families" onChange={(e)=> setidealFor(e.target.value)} />
        </div>

        <div className="form-group">
            <label>Category Image</label>
            {preview && <img src={preview} alt="preview" className="preview" />}
            <input type="file" accept="image/*" onChange={(e)=> setImage(e.target.files[0])} />
        </div>

        <div className="form-group">
          <label>Trip style</label>
          <input type="text" value={tripStyle} placeholder="Relax & Scenic" onChange={(e)=> setTripStyle(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Specialities (one per line)</label>
          <textarea
            rows="4"
            value={specialities}
            onChange={(e) => setSpecialities(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value === "true")}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <button className="update-btn" disabled={loading}>
          {loading ? "Loading..." : "Update Category"}
        </button>
      </form>
    </section>
  );
};

export default EditCategory;
