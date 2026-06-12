import React, { useEffect, useState, useCallback } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import "./Users.scss"
import Swal from "sweetalert2";


const Users= () => {
    const [user, setUser]= useState([]);
    const  [search, setsearch]= useState("");

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

    //fetch users

    const fetchUsers= useCallback( async()=>{
        try{
            const res= await fetch(`${process.env.REACT_APP_API_URL}/api/admin/user`,{
                credentials: "include"
            })
            const data= await res.json();

            if(!res.ok){
                showAlert("error", data.message)
                return
            }
            setUser(data.user)
        }
        catch(err){
            showAlert("error", err.message)
        }
    },
    []);

    useEffect(()=>{
        fetchUsers()
    },[fetchUsers])


    //delete user

    const handleDelete= async (id)=>{
        const confirm= await Swal.fire({
            title: "Delete User?",
            text: "this action cannot be undone",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Delete",
        })

       if (!confirm.isConfirmed) return;

       try{
        const res= await fetch(`${process.env.REACT_APP_API_URL}/api/admin/user/${id}`,{
            method: "Delete"
        })

        const data= await res.json();

        if(!res.ok){
            showAlert("error", data.message)
            return
        }

        setUser((pre)=> pre.filter((u)=> u._id !== id));
        showAlert("success", data.message)
       }
       catch(err){
        showAlert("error", err.message)
       }
    }


    //Block and Unblock
    const toggleStatus= async (id, currentStatus)=> {
        try{
            const res= await fetch(`${process.env.REACT_APP_API_URL}/api/admin/user/${id}`,{
                method: "Put",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    status: currentStatus === "Active" ? "Blocked" : "Active"
                })
            });
            const data= await res.json();

            if(!res.ok){
                showAlert("error", data.message);
                return
            }

            setUser((prev)=>
                prev.map((u)=>
                    u._id === id ? {...u, status: data.user.status}: u
                )
            )

            showAlert("success", data.message)
        }
        catch(err){
            showAlert("error", err.message)
        }
    }


    const FilteredUsers= user.filter((u)=>
        u.name.toLocaleLowerCase().includes(search.toLowerCase()) ||
    u.name.toLocaleLowerCase().includes(search.toLowerCase())
    ) ;


    return(
        <div className="userlist-container">
            <h2>Users List</h2>

            <div className="userlist-up">
                <input type="text" value={search} placeholder="Search users..."
            onChange={(e) => setsearch(e.target.value)} />

            <Link to={"/admin/users/add"} className="add-user-link">
                <button className="add-user-btn">
                    <Plus size={18}/> Add User
                </button>
                </Link>
            </div>

            <table className="users-table">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Joined</th>
                        <th className="actions">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {FilteredUsers.map((data)=>(
                        <tr key={data._id}>
                            <td>{data.name}</td>
                            <td>{data.email}</td>

                            <td>
                                <span className={data.status === "Active" ? "status-Active" : "status-blocked"}>
                                {data.status}
                                </span>
                                </td>

                            <td>{data.createdAt}</td>
                            <td className="actionCell">
                                <Link to={`/admin/users/edit/${data._id}`}>
                                <Pencil size={18} className="edit-icon"/>
                                </Link>

                                <button className="blockBtn"
                                onClick={() => toggleStatus(data._id, data.status)}
                                >
                                    {data.status === "Active" ? "Block" : "Unblock"}
                                </button>

                                <Trash2 className="deleteBtn" size={18} onClick={()=> handleDelete(data._id)}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default Users

