import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react"
import "./bookingTrend.scss"

const BookingTrend = () => {

    const [Data,setData]= useState([]);

    useEffect(()=>{
        fetchBookingTrend()
    },[]);

    const fetchBookingTrend= async()=> {
        try{
            const res= await fetch(`${process.env.REACT_APP_API_URL}/api/admin/dashboard/top-booking`,{
            credentials: "include"
        });

        const data= await res.json();

        if(data.success){
            setData(data.data)
        }

        }

        catch(err){
            console.error(err);
            
        }
    }

    const option= {
        tooltip:{
            trigger: "axis"
        },

        xAxis:{
            type: "category",
            boundaryGap: false,
            data: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
            axisLine: {linestyle: {color: "#ccc"}},
            axisLabel: {color: "#555"}
        },

        yAxis:{
            type: "value",
            axisLine: {show: false},
            axisLabel: {color: "#555"},
            spliteLine:{
                lineStyle: {color: "#eee"}
            },
        },

        series:[
            { 
                name: "Booking",
                type: "line",
                smooth: true,
                data: Data,
                symbol: "circle",
                symbolSize: 8,
                lineStyle: {
                    width: 3,
                    color: "#1b8a3a"
                },

                itemStyle: {
                   color:  "#1b8a3a",
                },

                areaStyle: {
                    color: "rgba(27,138,58,0.15)"
                }
            },
        ],
    }

    return(
        <div className="booking-trends">
        <h3 className="heading">Booking Trends</h3>
        <ReactECharts option={option} className="booking-graph" style={{width:"100%", height:"400px"}}/>
        </div>
    )

}


export default BookingTrend
