
import React, { useEffect, useState, useCallback } from "react";
import "./Payment.scss"
import Swal from "sweetalert2";


const Payment = () => {
    const [payment, setPayment]= useState([]);

    const showAlert= (icon,text)=>{
        Swal.fire({
            toast: true,
            icon,
            text,
            position:"top",
            showConfirmButton: false,
            timer:2500
        })
    }

    const fetchPayments= useCallback( async()=>{
        try{
            const res= await fetch(`${process.env.REACT_APP_API_URL}/api/admin/payment`,{
                credentials: "include"
            });
        const data= await res.json();

        if(res.ok){
            setPayment(data.payments)
        }
        }
        catch(err){
      showAlert("error", err.message)
    }
    },
[])


    useEffect(()=>{
        fetchPayments()
    },[fetchPayments]);




    return(
        <div className="payment-section">
            <h3>Payments</h3>
            <table className="table-container">
                <thead>
                    <tr>
                        <th>Booking Id</th>
                        <th>User</th>
                        <th>Amount</th>
                        <th>Method</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>
                    {payment.map((data)=> (
                        <tr key={data._id}>
                            <td>{data._id.slice(-5)}</td>
                            <td>{data.name}</td>
                            <td>{data.payableAmount}</td>
                            <td>{data.paymentmethod}</td>
                            {/* <td className={data.paymentStatus === "paid" ? "paid" : "pending"}> */}
                            <td className={`status-${data.paymentStatus}`}>
                                {data.paymentStatus}
                            </td>
                            <td>{new Date(data.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}

export default Payment