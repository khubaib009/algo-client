import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import Graph2 from "./splits/ReviewChart1";
import "./style/graph.css";
import Graphvalue from "./splits/ArrayData.json"
import StockGraph from "./splits/StockGraph";
import { format, addDays } from 'date-fns';
import SideCard from "./splits/SideCard";
import TransactionTable from './splits/TransactionTable'
import Header from "../dashboard/header";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Modal, Button, Form } from 'react-bootstrap';
import Youtubevideo2 from "../dashboard/youtubevideo2";


const Graph = () => {

  const [showvideoModal, setShowvideoModal] = useState(false); 
  const [audioplay, setaudioplay] = useState(true); 

  const handleClose = () => {
    setShowvideoModal(false);
};


const location = useLocation();
const enddate = location.state?.enddate;
const startdate = location.state?.startdate;
const startDateObj = new Date(startdate);
const endDateObj = new Date(enddate);
const daysDifference = (endDateObj - startDateObj) / (1000 * 60 * 60 * 24);
const dates = [];
for (let i = 0; i <= daysDifference; i += 7) {
const date = addDays(startDateObj, i);
  if (date <= endDateObj) {
      dates.push(format(date, 'MM/dd/yyyy'));
    }
  }
  const localStorageData = JSON.parse(localStorage.getItem("backtest"));
  var ArrData = localStorageData != null ? localStorageData : Graphvalue
  const lengthdates = dates.length;
  const ValueGraph = ArrData.comparative_data
  const Comparativevalue = ValueGraph.slice(0, lengthdates)

  const objectToCSVRow = (obj, columns) => {
    const row = [];
    columns.forEach((column) => {
        if (column === "Close") {
            row.push(obj[column].toFixed(2));
        }else if(column === "Percent_Change"){
          row.push(obj[column].toFixed(2));
        }else {
            row.push(obj[column]);
        }
    });
    return row.join(",");
}  
  const arrayToCSV = (array) => {
    if (array.length === 0) return "";
    const columns = Object.keys(array[0]);
    const header = columns.join(",");
    const rows = array.map((obj) => objectToCSVRow(obj, columns));
    return [header, ...rows].join("\n");
  };

  const downloadCSV = (array, filename) => {
    const csv = arrayToCSV(array);
    const csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const csvURL = window.URL.createObjectURL(csvData);
    const tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", filename);
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  };
  const ApiData = ArrData.result;
  var value1 = [];
  value1 = ApiData;
  const handleDownload = () => {
    downloadCSV(value1, "strategies.csv");
  };

  return (
    <div id="pdf-content" className={`light-mode pageoverflow`}>
      <Header display={0}/>
      <div className="min-height-200 bg-primary position-absolute w-100" />
      <main className="main-content position-relative border-radius-lg ">
        <div className="container-fluid py-4">
          <div className="row mt-4 m-2">
            <div className="col-lg-6 mb-lg-0 mb-4">
              <div className="card z-index-2 h-100 ">
                <StockGraph value={value1} date={dates} Another={Comparativevalue} />
              </div>
            </div>
            <SideCard
              ArrData={ArrData}
            />
          </div>
          <div className="row mt-4 m-2">
            <TransactionTable
              dates={dates}
              Graphvalue={ArrData}
            />
            <Graph2
              Graphdata={ArrData.result}
            />
          </div>
        </div>
      </main>
      <div className="d-flex justify-content-center">
     
      <div>
      <button
        className="btn text-white mb-3 downlodecsv"
        onClick={handleDownload}
        style={{ marginLeft: "3vw", background: "#295f4f" }}
      > 
        Download CSV
      </button>
      <p className="bottomfont">To understand the results, please  <span className="clickhere"><a href="https://www.youtube.com/embed/pkgatvUKSbM?autoplay=1&controls=0" target="_blank"><u>click here</u></a></span></p>
      
     </div>
     {/* <Modal show={showvideoModal} onHide={handleClose} >
        <Modal.Header>
           <Modal.Title>Results</Modal.Title>
                <button type="button" className="close btn"  onClick={handleClose}>
                  <span aria-hidden="true" style={{color:'black',fontSize:'20px',fontWeight:'750'}}>&times;</span>
                  </button>
          </Modal.Header>
       <Youtubevideo2 />
        </Modal> */}
     
     </div>
    
    </div>
  );
};
export default Graph;
