import React, { useEffect, useState } from "react";
import {CalendarCheck, UserPlus, CreditCard, MessageSquare} from "lucide-react"
import "./recentActivity.scss"

const ActivityIcons= {
    User: <UserPlus size={18}/>,
    Booking: <CalendarCheck size={18}/>,
    Payment: <CreditCard size={18}/>,
    Review: <MessageSquare size={18}/>,
    Newsletter: <MessageSquare size={18}/>,
    Contact: <MessageSquare size={18}/>
}

const RecentActivity = ()=>{
    const [activities, setActivities]= useState([]);

    useEffect(()=>{
        fetchActivities()
    },[])

    const fetchActivities= async ()=>{
        try{
            const res= await fetch("http://localhost:8000/api/admin/dashboard/recent-activities",{
                credentials:"include"
            });

            const data= await res.json();

            if(res.ok){
                setActivities(data.activities)
            }
        }
        catch (err) {
      console.error(err);
    }
    }

    const timeGo= (date)=>{
        const diff= Math.floor((Date.now() - new Date(date))/1000);
        if(diff <60) return `${diff}s ago`;
        if(diff < 3600) return `${Math.floor(diff/60)} min ago`;
        if(diff < 86400) return `${Math.floor(diff/3600)} hr ago`;
        return `${Math.floor(diff/86400)} days ago`
    };


return(
    <div className="recentActivity-container">
        <h3 className="activity-head">Recent Activities</h3>

        <ul className="activity-table">
            {activities.map((item)=>(
                <li key={item._id}>
                    <span className="activityIcon">{ActivityIcons[item.type]}</span>
                    <p className="activityText">{item.message}</p>
                    <small className="activityTime">{timeGo(item.createdAt)}</small>
                </li>
            ))}
        </ul>
        </div>
    
)
}

export default RecentActivity


// const RecentActivity = () => {
//   return (
//     <div className="activity-box">
//       <h3 className="heading">Recent Activity</h3>

//       <ul className="activity-list">
//         {activities.map((item, index) => (
//           <li key={index}>
//             <span className="icon">{item.icon}</span>
//             <p>{item.text}</p>
//             <small>{item.time}</small>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default RecentActivity;
