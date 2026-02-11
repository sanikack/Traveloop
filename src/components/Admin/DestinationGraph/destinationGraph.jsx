import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import "./destinationGraph.scss"



const DestinationGraph = () =>{
  const [chartdata, setChartData]= useState([]);

  useEffect(()=>{
    fetchDestinationGraph()
  },[])

  const fetchDestinationGraph= async()=>{
    try{
    const res= await fetch("http://localhost:8000/api/admin/dashboard/top-destination",{
      credentials: "include"
    });

    const data= await res.json();

    if(data.success){
      setChartData(
        data.data.map(item=> ({
          value: item.count,
          name: item._id
        }))
      )
    }
  }
  catch(err){
    console.error(err);
    
  }
  }

  const option = {
    tooltip: { trigger: "item" },

    legend: {
      orient: window.innerWidth < 768 ? "horiaontal" : "vertical",
      bottom: window.innerWidth < 768 ? 0 : "middle",
      right: window.innerWidth < 768 ? "center" : 20
    },
          
          series: [
            {
              name: "Bookings",
              type: "pie",
              radius: ["40%", "65%"],
              center: window.innerWidth < 768 ? ["50%", "45%"] : ["45%", "50%"],
              label: { show: false},
              labelLine: { show: false},
              data: chartdata
            }
          ]
        }

  return(
    <div className="destination-graph">
      <h3 className="destHeading">Top Destinations</h3>
      <ReactECharts option={option} className="echart"/>
    </div>
  )
}

export default DestinationGraph
