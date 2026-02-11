const { useState, useEffect } = require("react");
const { useNavigate, Navigate } = require("react-router-dom");

const AdminProtectRoute= ({ children })=>{
    const [loading,setLoading]=useState(true);
    const [authorized,setAuthorized]=useState(false);


    useEffect(()=>{
        fetch("http://localhost:8000/api/admin/auth/check",{
            credentials:"include"
        })
        .then(res=>{
            if(res.status===200){
                setAuthorized(true);
            }
            else{
                setAuthorized(false)
            }
        })
        .finally(()=> setLoading(false))
    },[])

    if(loading) return null;

    return authorized ? children : <Navigate to="/admin/login" replace />
}



export default AdminProtectRoute