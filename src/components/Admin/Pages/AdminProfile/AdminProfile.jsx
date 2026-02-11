import React, { useEffect, useState } from "react";
import "./AdminProfile.scss"
import Swal from "sweetalert2";


const Adminprofile= () =>{
    const [form,setForm]= useState({
        name:"",
        email:"",
        phone:"",
        avatar:"",
        joinedAt:""
    });

    const showAlert= (icon,text)=>{
        Swal.fire({
            toast:true,
            icon,
            text,
            position: "top",
            showConfirmButton: false,
            timer: 2500
        })

    }

    const [loading, setLoading]= useState(true)
    const [editMode, setEditMode]= useState(false)

    useEffect(()=>{
        fetchProfile()
    },[]);

    const fetchProfile= async()=> {
        try{
            const res= await fetch("http://localhost:8000/api/admin/auth/profile",{
                credentials:"include"
            })
            const data= await res.json();

            if(data.success){
                setForm({
                    name: data.admin.name || "",
                    email: data.admin.email || "",
                    phone: data.admin.phone || "",
                    avatar: data.admin.avatar || "",
                    joinedAt: new Date(data.admin.createdAt).toLocaleDateString()
                })
            }
        }
        catch (err) {
         console.error(err);
        }
        finally{
            setLoading(false)
        }
    }

    //INPUT HANDLER
    const handleChange= (e)=>{
        setForm(prev => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    //AVATAR UPLOAD HANDLER
    const handleAvatarChange= async(e) =>{
        const file= e.target.files[0];

        if(!file) return

        const formdata= new FormData();
        formdata.append("avatar", file)

        try{
            const res= await fetch("http://localhost:8000/api/admin/auth/profile/avatar",{
                method:"put",
                credentials:"include",
                body: formdata
            })
            const data= await res.json();

            if(data.success){
                setForm(prev=> ({
                    ...prev,
                    avatar: data.avatar
                }));
                showAlert("success",data.message)
            }
        }
        catch(err){
        console.error(err);
        showAlert("error", "Upload failed");
    }
        
    }

    //SAVE UPDATES
    const saveProfile= async()=>{
        try{
            const res= await fetch("http://localhost:8000/api/admin/auth/profile",{
                method:"put",
                headers: { "Content-Type" : "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    name: form.name,
                    phone: form.phone
                })
            })
            const data= await res.json();

            if(data.success){
                showAlert("success", data.message)
                setEditMode(false);
            }
        }
        catch(err){
            console.error(err);
            
        }
    }

    if(loading) return <p>Loading...</p>


    return(
        <div className="adminprofile">
            <div className="adminCards">

                {/* LEFT SIDE... */}
                <div className="leftSide">
                    <img src={form.avatar || "/images/admin/admin.jpg"} alt="admin"
                    className="avatar" />

                    <input type="file" accept="image/*" id="avatarUpload" hidden onChange={handleAvatarChange}/>

                    <label htmlFor="avatarUpload" className="avatarBtn">Change Photo</label>

                    <h3>{form.name}</h3>

                    <button className="adminEditt"
                    onClick={()=> setEditMode(v => !v)}
                    >{editMode ? "Cancel" : "Edit Profile"}</button>
                </div>


                {/* RIGHT SIDE */}

                <div className="rightSide">

                    <div className="field">
                        <label>Name</label>
                        <input name="name" value={form.name} onChange={handleChange} disabled={!editMode}/>
                    </div>

                    <div className="field">
                        <label>Email</label>
                        <input value={form.email} disabled/>
                    </div>

                    <div className="field">
                        <label>phone</label>
                        <input name="phone" value={form.phone} onChange={handleChange} disabled={!editMode}/>
                    </div>

                    <div className="field">
                        <label>Joined At</label>
                        <input value={form.joinedAt} disabled/>
                    </div>

                    {editMode && (
                        <button className="adminSave" onClick={saveProfile}>
                            Save Change
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}


export default Adminprofile