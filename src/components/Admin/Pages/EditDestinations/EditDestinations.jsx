import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditDestinations.scss";
import Swal from "sweetalert2";

const EditDestination = () => {
  const { id } = useParams();
  const navigate = useNavigate();

 const [name, setName]= useState("");
 const [description, setDescription]= useState("")
 const [district, setDistrict]= useState("")
 const [specialities, setSpecialities]= useState("")
 const [image, setImage]= useState(null)
 const [isActive, setIsActive]= useState(true);
 const [loading, setLoading]= useState(false);


 const showAlert= (icon, text)=>{
  Swal.fire({
    toast: true,
    text,
    icon,
    timer: 2500,
    position: "top",
    showConfirmButton: false
  })
   }

   const fetchDestination= useCallback( async ()=>{
    try{
      const res= await fetch(`${process.env.REACT_APP_API_URL}/api/admin/destination/${id}`);
      const data= await res.json();

      if(!res.ok){
        showAlert("error", data.message)
      }

      setName(data.destination.name)
      setDescription(data.destination.description)
      setDistrict(data.destination.district)
      setIsActive(data.destination.isActive);
      setSpecialities(data.destination.specialities?.join("\n")||"")
      setImage(null)
    }
    catch(err){
      showAlert("error", err.message)
    }
   },
   [id])

   useEffect(()=>{
    fetchDestination()
   },[fetchDestination]);


   //************UPDATE SECTION***********/

   const handleSubmit = async (e)=>{
    e.preventDefault();

    if(!name){ showAlert("error", "Name is required")
      return
    }

    try{
      setLoading(true);
      const formdata= new FormData();
      formdata.append("name", name)
      formdata.append("description", description)
      formdata.append("district", district)
      formdata.append("isActive", isActive)
      formdata.append("specialities",
        JSON.stringify(specialities.split("\n").filter(Boolean))
      )
      if(image) formdata.append("image", image)

        const res= await fetch(`${process.env.REACT_APP_API_URL}/api/admin/destination/${id}`,{
          method:"Put",
          body: formdata
        })
        const data= await res.json();

        if(!res.ok){
          showAlert("error", data.message)
        };

        showAlert("success", data.message)
    }
    catch(err){
      showAlert("error", err.message)
    }
    finally{
      setLoading(false)
    }
   }


  return (
    <div className="edit-destination-wrapper">
      <h2>Edit Destination</h2>

      <form className="edit-form" onSubmit={handleSubmit} >
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e)=> setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={district}
            onChange={(e)=> setDistrict(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea value={description} name="description" onChange={(e)=> setDescription(e.target.value)}></textarea>
        </div>

        <div className="form-group">
          <label>Specialities</label>
          <textarea value={specialities} name="specialities" onChange={(e)=> setSpecialities(e.target.value)}></textarea>
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={isActive}
            onChange={(e)=>setIsActive(e.target.value === "true")}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <div className="form-group">
          <label>Image</label>
          <input type="file" accept="image/*" onChange={(e)=> setImage(e.target.files[0])} />
        </div>

        <div className="form-actions">
          <button type="submit" className="save-btn" disabled={loading}>{loading ? "Saving..." : "Save Destination"}</button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/admin/destinations")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDestination;
