
import React, { useState } from "react";
import "./AddDestinations.scss"
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddDestinations = () => {
 
  const [name, setName]= useState("");
  const [description, setDescription]= useState("")
  const [district, setDistrict]= useState("")
  const [specialities, setSpecialities]= useState("")
  const [isActive, setIsActive]= useState(true)
  const [image, setImage]= useState(null);
  const [loading, setLoading]= useState(false)


  const navigate= useNavigate()

  const showAlert= (icon,text)=>{
    Swal.fire({
      toast: true,
      icon,
      text,
      position: "top",
      timer: 2500,
      showConfirmButton: false
    })
  };

const handleSubmit= async(e) =>{
 e.preventDefault();

 if(!name || !district || !image || !description){
  showAlert("error", "All fields are required")
  return
 }

 try{

  setLoading(true);

  //SEND TO BACKEND
   const formdata= new FormData();
   formdata.append("name", name);
   formdata.append("description", description)
   formdata.append("district", district)
   formdata.append("isActive", isActive)
   formdata.append("specialities", 
    JSON.stringify(specialities.split("\n").filter(Boolean))
   )
   formdata.append("image", image)
   formdata.append("category", "64b000000000000000000001");

   const res= await fetch("http://localhost:8000/api/admin/destination",{
    method: "post",
    body: formdata
   });
   
   const data= await res.json();

       if(!res.ok){
        showAlert("error", data.message);
        return
       }

       showAlert("success", data.message);

       //after success the creation, reset the form
       setName("")
       setDescription("")
       setDistrict("")
       setSpecialities("")
       setImage(null)
       setIsActive(true) 

       setTimeout(() => {
        navigate("/admin/destinations")
      }, 2500);

      }   
      catch(err){
        showAlert("error", err.message)
        console.log(err);
        console.error(err);
        
        
      }
      finally{
        setLoading(false)
      }
    }


  return(
    <div className="add-destination-container">
      <h3>Add New Destination</h3>

      <form className="add-destination-form" onSubmit={handleSubmit}>
        <div className="add-destination-group">
          <label>Destination Name</label>
          <input type="text" name="destination" placeholder="Enter Destination Name" value={name} onChange={(e)=> setName( e.target.value )} />
        </div>

        <div className="add-destination-group">
          <label>Location</label>
          <input type="text" name="location" value={district} onChange={(e)=> setDistrict(e.target.value)} placeholder="Enter Location" />
        </div>

        <div className="add-destination-group">
          <label>Image</label>
          <input type="file" name="image" accept="image/*" onChange={(e)=> setImage(e.target.files[0])}/>
        </div>

        <div className="add-destination-group">
          <label>Description</label>
          <textarea value={description} name="description" onChange={(e)=> setDescription(e.target.value)} placeholder="Enter Description"></textarea>
        </div>

        <div className="add-destination-group">
          <label>Specialities</label>
          <textarea value={specialities}
          placeholder="Eg: Backwaters, Tea grardens"
          onChange={(e)=> setSpecialities(e.target.value)}
          ></textarea>
        </div>

        <div className="add-destination-group">
          <label>Status</label>
          <select name="status" value={isActive} onChange={(e)=> setIsActive(e.target.value === "true")}>
            <option value="true">Active</option>
            <option value="false">InActive</option>
          </select>
        </div>

        <button type="submit" className="add-dest-btn" disabled={loading}>
          {loading ? "Saving..." : "Save destination"}
        </button>
      </form>
    </div>
  )
}



export default AddDestinations

