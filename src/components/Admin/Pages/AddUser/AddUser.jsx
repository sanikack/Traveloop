import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddUser.scss";
import Swal from "sweetalert2";

const AddUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    status: "Active",
  });

  const[loading, setLoading]= useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

   const{ name, email, password, role, status}= formData;

   if(!name || !email || !password || !role || !status){
    showAlert("error", "All fields are required")
    return
   }


   try{
    setLoading(true)

    const res= await fetch("http://localhost:8000/api/admin/user",{
      method: "Post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData)
    });

    const data= await res.json();

    if(!res.ok){
      showAlert("error", data.message)
      return
    }

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
  };

  return (
    <div className="add-user-page">
      <h2>Add New User</h2>

      <form className="add-user-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter Name"
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Email"
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter Password"
        />

        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Blocked">Blocked</option>
        </select>

        <div className="form-actions">
          <button type="submit" className="save-btn" disabled={loading}>
           {loading ? "Saving..." : "Save User"}
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

export default AddUser;
