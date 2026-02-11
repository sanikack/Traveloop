
import React from "react";
import { Outlet } from "react-router-dom";


const AdminLayouts = ()=>{
    return(
       <div style={{paddingTop: "20px"}}>
        <Outlet/>
       </div>
    )
}


export default AdminLayouts