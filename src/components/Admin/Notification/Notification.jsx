import { useEffect, useState } from "react";
import "./Notification.scss";
import { useNavigate } from "react-router-dom";

const AdminNotifications = () => {

  const [data,setData] = useState([]);
  const [filter,setFilter] = useState("all");
  const [loading,setLoading] = useState(true);

  const navigate= useNavigate();

  useEffect(()=>{
    fetchNotifications();
  },[]);

  const fetchNotifications = async ()=>{
    try{
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/admin/dashboard/notification`,
        { credentials:"include" }
      );
      const data = await res.json();
      if(data.success){
        setData(data.list);
      }
    }catch(err){
      console.error(err);
    }finally{
      setLoading(false);
    }
  };

  // mark single read
  const markRead = async(id)=>{
    await fetch(
      `${process.env.REACT_APP_API_URL}/api/admin/dashboard/notification/${id}/read`,
      { method:"PUT", credentials:"include" }
    );

     //ONLY THAT ONE ITEM UPDATED..
    setData(prev => prev.map(n=> n._id === id ? {...n, read:true} : n ))
  };


  // mark all read
  const markAllRead = async ()=>{
    await fetch(
      `${process.env.REACT_APP_API_URL}/api/admin/dashboard/notifications/read-all`,
      { method:"PUT", credentials:"include" }
    );

    setData(prev => prev.map(n => ({...n, read:true})));
  };

  //ROUTING MAP...
  const getRouteFromType= (item)=> {
    switch(item.type){
        case "Booking":
            return "/admin/bookings";

        case "User":
            return "/admin/users";
            
        case "Payment":
            return "/admin/payment"  
            
        case "Newsletter":
            return "/admin/subscribe"  

        case "Review":
            return "/admin/reviews"  

        case "Contact":
            return "/admin/messages"  

        default :
            return "/admin/dashboard"  
    }
  }


  //CLICK HANDLER...
  const handleClick= async (item)=> {
    if(!item.read){
        await markRead(item._id)
    }
    const path= getRouteFromType(item)
    navigate(path)
  }

  const filtered = filter === "unread"
    ? data.filter(n => !n.read)
    : data;

  const timeAgo = (date)=>{
    const diff = (Date.now() - new Date(date)) / 1000;
    if(diff < 60) return "Just now";
    if(diff < 3600) return Math.floor(diff/60)+" min ago";
    if(diff < 86400) return Math.floor(diff/3600)+" hr ago";
    return Math.floor(diff/86400)+" day ago";
  };



  return (
    <div className="notifyPage">

      <div className="notifyHeader">
        <h2>Notifications</h2>

        <div className="actions">
          <button onClick={()=>setFilter("all")}>
            All
          </button>

          <button onClick={()=>setFilter("unread")}>
            Unread
          </button>
          <button onClick={markAllRead}>
            Mark all read
          </button>
        </div>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && filtered.map(item => (
        <div
          key={item._id}
          className={`notifyCard ${item.read ? "" : "unread"}`}
          onClick={()=> handleClick(item)}
        >

            {/* LEFT BADGE... */}
            {!item.read && (
                <div className="badge">1</div>
            )}

            <div className="content">
          <div className="type">{item.type}</div>

          <div className="body">
            <p>{item.message}</p>
            <span>{timeAgo(item.createdAt)}</span>
          </div>
        </div>

    </div>
      ))}

      {!loading && filtered.length === 0 && (
        <div className="empty">
          No notifications
        </div>
      )}

    </div>
  );
};

export default AdminNotifications;
