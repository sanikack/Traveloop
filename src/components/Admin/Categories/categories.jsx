import React, { useEffect, useState } from "react";
import { Layers, Plus, Pencil, Trash2 } from "lucide-react";
import "./categories.scss";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    fetchCategories()
  },[])

  const fetchCategories= async ()=>{
    try{
      const res= await fetch(`${process.env.REACT_APP_API_URL}/api/admin/categories`);
      const data= await res.json();

      if(res.ok){
        setCategories(data.categories)
      }
    }
    catch(err){
      console.error("failed to fetch categories", err);
      
    }
  }

  //**********DELETE SECTION**********/

  const handleDelete= async (id)=>{
    const confirmDelete= await Swal.fire({
      title: "Delete Category?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel"
    });

    if(!confirmDelete.isConfirmed) return

    try{
      const res= await fetch(`${process.env.REACT_APP_API_URL}/api/admin/categories/${id}`,{
        method: "Delete"
      });

      const data= await res.json();

      if(!res.ok){
        return Swal.fire("error", data.message, "Error")
      };


      //REMOVE FROM UI
      setCategories((pre)=>
      pre.filter((cat)=> cat._id !== id))

        Swal.fire({
        toast: true,
        position: "top",
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 2500
      })
    }
    catch(err){
      console.error(err);
      Swal.fire("error", err.message, "Error")
      
    }
  }
  return (
    <section className="admin-categories">
      {/* Header */}
      <div className="page-header">
        <h2><Layers size={22} /> Categories</h2>
        <Link to={"/admin/categories/add"}>
        <button className="add-btn">
          <Plus size={16} /> Add Category
        </button>
        </Link>
      </div>

      {/* Table */}
      <table className="category-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map(cat => (
            <tr key={cat._id}>
              <td>{cat.image ? (<img src={`${process.env.REACT_APP_API_URL}/uploads/${cat.image}`} 
              alt={cat.name} className="category-img"/>)
              : ("No image")
            }</td>
              <td>{cat.name}</td>
              <td>{cat.slug}</td>
              <td>
                <span className={`status ${cat.isActive ? "active" : "inactive"}`}>
                  {cat.isActive ? "Active" : "InActive"}
                </span>
              </td>
              <td>
                <Link to={`/admin/categories/edit/${cat._id}`}>
                <button className="edit"><Pencil size={16} /></button>
                </Link>
                <button className="delete" onClick={()=> handleDelete(cat._id)}><Trash2 size={16} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default AdminCategories;
