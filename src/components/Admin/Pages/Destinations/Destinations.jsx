import React, { useEffect, useState } from "react";
import {Plus, Pencil, Trash} from "lucide-react"
import "./Destinations.scss"
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const Destination = () => {

  const [destinations, setDestinations]= useState([]);

  const showAlert= (icon,title)=>{
    Swal.fire({
      icon,
      title,
      toast: true,
      showConfirmButton: true,
      timer: 2500,
      position: "top"
    })
  }

  const fetchDestinations= async ()=>{
  try{
      const res= await fetch(`${process.env.REACT_APP_API_URL}/api/admin/destination`);
    const data= await res.json();

    if(!res.ok){
      showAlert("error", data.message,"Error")
    }

    setDestinations(data.destination)
  }
  catch(err){
    showAlert("error", err.message)
  }
  }

  useEffect(()=>{
    fetchDestinations()
  },[])


  //************DELETE SECTION************/

  const handleDelete= async(id)=>{
   
    const showAlert=  await Swal.fire({
      title: "Delete Destination?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel"
    })

    if(!showAlert.isConfirmed) return

    try{
      const res= await fetch(`${process.env.REACT_APP_API_URL}/api/admin/destination/${id}`,{
        method: "DELETE"
      })

      const data= await res.json();

      if(!res.ok){
        Swal.fire({
        toast: true,
        position: "top",
        icon: "error",
        text: data.message,
        showConfirmButton: false,
        timer: 2500
      });
      return;
      }


      //REMOVE FROM UI
      setDestinations(pre=>
      pre.filter(cat=> cat._id !== id ));

      Swal.fire({
        toast: true,
        position: "top",
        icon: "success",
        text: data.message,
        showConfirmButton: false,
        timer: 2500
      })
    }
    catch(err){
      Swal.fire({
        toast: true,
        position: "top",
        icon: "error",
        text: err.message,
        showConfirmButton: false,
        timer: 2500
      });
      return;
    }
  }

  return(
    <div className="destination-wraper">
      <div className="dest-head">Destinations</div>

      <Link to="/admin/destinations/add" className="Dest-btn">
      <Plus size={18}/>
      Add Destination</Link>

      <div className="destination-table">
        <table className="table-wrapper">
          <thead>
            <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Locations</th>
            <th>Description</th>
            <th>Actions</th>
            <th>Edit</th>
            <th>Delete</th>
            </tr>
          </thead>

          <tbody>
           {destinations.map((data) => (
            <tr key={data._id}>

              <td>{data.image?.[0] ? (
                <img src={data.image[0].startsWith("http") ? data.image[0] :
                  `${process.env.REACT_APP_API_URL}/uploads/${data.image[0]}`} alt={data.name} className="dest-img"/>
              ) : ( "No image")} </td>

              <td>{data.name}</td>
              <td>{data.district}</td>
              <td>{data.description}</td>
              <td className={ data.isActive ? "status-active" : "status-inactive"}>{data.isActive ? "Active" : "InActive"}</td>
              <td className="pencil">
                <Link to={`/admin/destinations/edit/${data._id}`}>
                <Pencil size={15}/></Link></td>
              <td className="trash"><Trash size={15} onClick={()=> handleDelete(data._id)}/></td>
            </tr>
           ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


export default Destination