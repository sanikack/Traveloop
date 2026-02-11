import React, { useState } from "react";
import "./AddCategory.scss";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState(true);
  const [image, setImage]= useState(null);
  const [loading, setLoading]= useState(false);
  const [shortdescription, setShortDescription]= useState("");
  const [bestSeason, setBestSeason]= useState("");
  const [idealFor, setidealFor]= useState("");
  const [tripStyle, setTripStyle]= useState("");
  const [specialities, setSpecialities]= useState("");

  const navigate= useNavigate();

//REUSABLE ALERT
const showAlert= (icon,title)=>{
 Swal.fire({
  icon,
  title,
  toast: true,
  showConfirmButton: false,
  position: "top",
  timer: 2500
 })
}

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!name){
      showAlert("error","failed","Name is required")
      return
    }
    
    try{
      setLoading(true)

      const formdata= new FormData()
      formdata.append("name", name);
      formdata.append("isActive", status);
      formdata.append("shortdescription", shortdescription);
      formdata.append("idealFor", idealFor);
      formdata.append("bestSeason", bestSeason);
      formdata.append("tripStyle", tripStyle);
      formdata.append("specialities",
        JSON.stringify(specialities.split("\n").filter(Boolean))
      )
      if(image) formdata.append("image", image)

        const res= await fetch("http://localhost:8000/api/admin/categories",
          {
            method: "POST",
            body: formdata
          }
        );

        const data= await res.json();

        if(!res.ok){
          showAlert("error","Failed", data.message)
          return
        }

        showAlert("success", data.message);
        navigate("/admin/categories")
    }
    catch(err){
      showAlert("error", "Error", err.message)
    }
    finally{
      setLoading(false)
    }
  };


  return (
    <section className="add-category">
      <h2>Add Category</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Category Name</label>
          <input
            type="text"
            placeholder="Hill Stations"
            value={name}
            onChange={(e)=> setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <textarea placeholder="Short Description" value={shortdescription}
          onChange={(e)=> setShortDescription(e.target.value)}></textarea>
        </div>

        <div className="form-group">
          <input type="text" placeholder="Best Season (sep-mar)" value={bestSeason} 
          onChange={(e)=> setBestSeason(e.target.value)}/>
        </div>

        <div className="form-group">
          <input type="text" placeholder="Ideal for (Couples, Families)" value={idealFor} 
          onChange={(e)=> setidealFor(e.target.value)}/>
        </div>

        <div className="form-group">
          <input type="text" placeholder="Trip Style (Relaxed & scenic)" value={tripStyle} 
          onChange={(e)=> setTripStyle(e.target.value)}/>
        </div>

        <div className="form-group">
          <input type="text" placeholder="Specialities (one per line)" value={specialities} 
          onChange={(e)=> setSpecialities(e.target.value)}/>
        </div>


        <div className="form-group">
          <label>Category Image</label>
          <input type="file" accept="image/*" onChange={(e)=> setImage(e.target.files[0])}/>
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

        <button type="submit" className="save-btn" disabled={loading}>
          {loading ? "Saving..." : "Save Category"}
        </button>
      </form>
    </section>
  );
};

export default AddCategory;
