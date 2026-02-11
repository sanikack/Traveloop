
import React, { useEffect, useState } from "react";
import "./Bookings.scss";
import Swal from "sweetalert2";
import { Pencil, Trash2} from "lucide-react" 
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const [bookings, setBookings]=useState([]);
  const [search, setsearch]= useState("")

  const navigate= useNavigate()

  const showAlert= (icon,text)=>{
    Swal.fire({
      toast: true,
      icon,
      text,
      position: "top",
      showConfirmButton: false,
      timer: 2500
    })
  };

  const fetchBookings= async ()=>{
    try{
    const res= await fetch("http://localhost:8000/api/admin/bookings")
    const data= await res.json();

      if(data.success){
        setBookings(data.bookings)
      }
      
    }
    catch(err){
      showAlert("error", err.message)
    }
  }


  useEffect(()=>{
    fetchBookings()
  },[])


  const handleDelete= async(id)=>{
    const confirm= await Swal.fire({
      title:"Delete Booking?",
      text:"This action cannot be undone!",
      icon:"warning",
      showCancelButton: true,
      confirmButtonColor:"#d33",
      cancelButtonColor:"#3085d6",
      confirmButtonText:"Yes, Delete"
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(
        `http://localhost:8000/api/admin/bookings/${id}`,
        { method: "DELETE" }
      );
      const data = await res.json();

       if (!res.ok) {
        showAlert("error", data.message);
        return;
      }

      // Remove from UI
      setBookings((prev) =>
        prev.filter((booking) => booking._id !== id)
      );

      showAlert("success", "Booking deleted");
    }
    catch (err) {
      showAlert("error", err.message);
    }
  }


  const filteredBookings= bookings.filter((b)=>
  b.name.toLowerCase().includes(search.toLowerCase())
);




  return(
    <div className="bookings-container">
      <div className="bookings-head">All Bookings</div>

      <div className="top-section">
        <input type="text" name="search" value={search} className="Booksearch" placeholder="Search..."
        onChange={(e)=> setsearch(e.target.value)} />
      </div>


<div className="table-container">
      <table className="Bookings-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>User</th>
            <th>Package</th>
            <th>Travel Date</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredBookings.map((data) => (
            <tr key={data._id}>
              <td>{data._id.slice(-5)}</td>
              <td>{data.name}</td>
              <td>{data.package?.title}</td>
              <td>{new Date(data.travelDate).toLocaleDateString()}</td>
              <td>₹{data.payableAmount}</td>
              <td>{data.paymentmethod}</td>
              <td className={data.status === "Confirmed" ? "status-active" : "inactive"}>
                {data.status}
              </td>
              <td className="actionBtn">
                <Pencil size={18} className="pencil" onClick={()=> navigate(`/admin/bookings/edit/${data._id}`)}/>
                <Trash2 size={18} className="trash" onClick={()=> handleDelete(data._id)}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredBookings.length === 0 &&(
        <p style={{textAlign:"center", marginTop:"20px"}}>
          No Booking Found
        </p>
      )}
      </div>
    </div>
  )
}



export default Bookings;
