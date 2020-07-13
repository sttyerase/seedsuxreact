import React from 'react';
import './App.css';

function CropUI() {
  return (
      <form id="dataform">
        <label className="datalabel" htmlFor="cropid">Crop Id:</label><br/>
        <input id="cropid" type="text" className="datanumber"/><br/>
        <label className="datalabel" htmlFor="cropname">Crop Name:</label><br/>
        <input id="cropname" type="text" className="datatext"/><br/>
        <label className="datalabel" htmlFor="cropdescription">Crop Description:</label><br/>
        <input id="cropdescription" type="text" className="datatext"/><br/>
        <label className="datalabel" htmlFor="cropicccode">Crop ICC Code:</label><br/>
        <input id="cropicccode" type="number" className="datanumber"/><br/>
        <div className="buttondiv">
          <input className="datasubmit" type="button" value="FIND CROP BY ID"   formMethod="POST" onClick={findrecordbyid}/>
          <input className="datasubmit" type="button" value="UPDATE CROP" formMethod="PUT"  onClick={updatedata}/>
          <input className="datasubmit" type="button" value="ADD CROP"    formMethod="POST" onClick={adddata}/>
        </div>
      </form>
  );
} // FUNCTION APP()

async function findrecordbyid() {
  var seekval = document.getElementById("cropid").value;
  let myReq = new Request("http://localhost:8080/seedinspection/crops/" + seekval);
  await fetch(myReq)
      .then(response => response.json())
      .then(data => {
          document.getElementById("cropname").value = data.valueOf()["cropName"];
          document.getElementById("cropdescription").value = data.valueOf()["cropDescription"];
          document.getElementById("cropicccode").value = data.valueOf()["cropICCCode"];
      })
      .catch( function(error){
          console.log("FIND FAILURE:" + error);
      });
    // document.getElementById("cropdescription").value = json.valueOf().toString();
} // PUTDATA()

function adddata() {
    validateicccode();
} // ADDDATA()

function updatedata() {
    validateicccode();
  window.open("http://localhost:8080/seedinspection/crops/all");
} // UPDATEDATA()

function validateicccode() {
  var theCode = document.getElementById("cropicccode").value;
  console.log(theCode);
  if ("" === theCode || theCode < 0) {
    alert("Please enter 0 or a number for the ICC Code.");
    return false;
  } // IF
} // VALIDATEICCCODE()

export default CropUI;
