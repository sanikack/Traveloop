import Navbar from "../components/User/Navber/demo";
import Footer from "../components/User/footer/footer";
import { Outlet } from "react-router-dom";


const UserLayout = () =>{
    return(
        <>
        <Navbar/>
        <div style={{paddingTop: "110px"}}>
            <Outlet/>
        </div>
        <Footer/>
        </>
    )
}

export default UserLayout;