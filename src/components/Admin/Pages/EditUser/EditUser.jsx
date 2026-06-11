import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditUser.scss";
import Swal from "sweetalert2";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "Active",
  });

  const[loading, setLoading]= useState(false);

  const showAlert= (icon, text)=>{
    Swal.fire({
      toast: true,
      icon,
      text,
      position: "top",
      showConfirmButton: false,
      timer: 2500
    })
  }

  const handleChange= (e)=>{
    setFormData({...formData, [e.target.name] : e.target.value})
  }

  const fetchUsers= async()=>{
    try{
      const res= await fetch(`${process.env.REACT_APP_API_URL}/api/admin/user/${id}`);
      const data= await res.json();

      if(!res.ok){
        showAlert("error", data.message)
        return
      }

      setFormData({
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        status: data.user.status
      })
    }

    catch(err){
      showAlert("error", err.message)
    }
  }

  useEffect(()=>{
    fetchUsers()
  },[id])

  
  const handleSubmit= async (e)=>{
    e.preventDefault();

    try{
      setLoading(true);

      const res= await fetch(`${process.env.REACT_APP_API_URL}/api/admin/user/${id}`,{
        method: "Put",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(formData)
      });

      const data= await res.json();

      if(!res.ok){
        showAlert("error", data.message)
        return
      };

      showAlert("success", data.message)

      setTimeout(() => {
        navigate("/admin/users")
      }, 2500);

    }
    catch(err){
      showAlert("error", err.message)
    }
    finally{
      setLoading(false)
    }
  }



  return (
    <div className="edit-user-container">
      <h2>Edit User</h2>

      <form className="edit-user-form" onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Blocked">Blocked</option>
        </select>

        <div className="form-actions">
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? "Updating..." : "Save Updates"}
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/admin/users")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
