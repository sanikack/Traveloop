
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import {Pencil, Plus, Trash2} from "lucide-react";
import './package.scss'


const AdminPackage= ()=>{

  const [packages, setPackage]= useState([])
  const [ search, setSearch]= useState("")

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
      const res= await fetch(`${process.env.REACT_APP_API_URL}/api/admin/packages`,{
        credentials:"include"
      });
      const data= await res.json();

      if(res.ok){
        setPackage(Array.isArray(data.packages) ? data.packages : []);
      }
      else{
        setPackage([]);
      }

    }
    catch (err) {
      showAlert("error", err.message);
    }
  }

  useEffect(()=>{
    fetchPackages()
  },[])



// DELETE SECTION
const handleDelete= async(id)=>{
  const confirm= await Swal.fire({
    title: "Delete package?",
    text: "This action cannot be undone",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "Yes, delete"
  })

  if(!confirm.isConfirmed)return;

  try{

    const res= await fetch(`${process.env.REACT_APP_API_URL}/api/admin/packages/${id}`,
      { method: "DELETE"}
    )
    const data= await res.json();

    if(!res.ok){
      showAlert("error", data.message)
    }

    setPackage((prev)=> prev.filter((p)=> p._id !== id));
    showAlert("success", data.message)
  }
  catch(err){
    showAlert("error", err.message)
  }
}


//search filter
const filteredPackages= packages.filter(
  (pkg)=>
    pkg.title.toLowerCase().includes(search.toLowerCase()) ||
  pkg.title.toLowerCase().includes(search.toLowerCase())
)

    return(
        <div className="packages-container">
            <h2>Packages</h2>

            <div className="package-top">
              <input type="text" placeholder="Search..." value={search}
               onChange={(e)=> setSearch(e.target.value)} />

               <Link to="/admin/package/add">
               <button className="add-btn">
                <Plus size={18}/> Add Packages
               </button>
               </Link>     
            </div>


            <div className="package-wrapper">
              <table className="package-table">
                <thead>
                  <tr>
                    <th>Packages</th>
                    <th>Title</th>
                    <th>Location</th>
                    <th>Duration</th>
                    <th>Category</th>
                    <th>Destination</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th className="actions">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPackages.map((pkg)=>(
                    <tr key={pkg._id}>
                      <td className="pkg-name">
                        {pkg.image ? (<img src={ pkg.image.startsWith("http") ? pkg.image
                        : `${process.env.REACT_APP_API_URL}/uploads/${pkg.image}`} alt={pkg.title}/>) 
                        : ("No image")}
                        </td>
                        
                        <td>{pkg.title}</td>
                        <td>{pkg.location}</td>
                        <td>{pkg.days}Days/ {pkg.nights}Nights</td>
                        <td>{pkg.category?.name}</td>
                        <td>{pkg.destination?.name}</td>
                        <td>{pkg.price}</td>

                        <td>
                          <span className={pkg.status === "Active" ? "status-active" : "status-blocked"}>
                            {pkg.status}
                          </span>
                        </td>

                        <td className="actionCell">
                          <Link to={`/admin/package/edit/${pkg._id}`}>
                          <Pencil size={18} className="edit-btn"/>
                          </Link>

                          <Trash2
                          size={18}
                          className="dlt-btn"
                          onClick={()=> handleDelete(pkg._id)}
                          />
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
    )
}

export default AdminPackage