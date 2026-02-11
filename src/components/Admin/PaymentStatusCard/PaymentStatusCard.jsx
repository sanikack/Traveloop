import { useEffect, useState } from "react";
import "./PaymentStatusCard.scss";
import { CheckCircle, Clock, Terminal, XCircle } from "lucide-react";

const PaymentStatusCard = () => {

  const [stats,setstats]= useState({
    paid:0,
    pending:0,
    unpaid:0
  })

  useEffect(()=>{
    fetchStats()
  },[])

  const fetchStats= async ()=>{
    try{
      const res= await fetch("http://localhost:8000/api/admin/dashboard/payment-stats",{
        credentials: "include"
      })
      const data= await res.json();

      if(data.success){
        setstats(data.stats)
      }
    }

     catch(err){
    console.error(err);   
  }
  }
 


  const card= [
    {
      label: "Paid",
      value: stats.paid,
      icon: <CheckCircle size={18}/>,
      className: "paid"
    },

    {
      label: "Pending",
      value: stats.pending,
      icon: <Clock size={18}/>,
      className: "pending"
    },

    {
      label: "Unpaid",
      value: stats.unpaid,
      icon: <XCircle size={18}/>,
      className: "unpaid"
    }
  ]


  return (
    <div className="paymentContainer">
    <h3>Payment Status</h3>
    <div className="payment-cards">
      {card.map((item,index)=>(
        <div className={`diamondIcon ${item.className}`} key={index}>
          <div className="diamond-inner">
            <span className="icon">{item.icon}</span>
            <span className="value">{item.value}</span>
            <span className="label">{item.label}</span>      
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default PaymentStatusCard;
