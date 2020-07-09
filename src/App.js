import React from 'react';
import './App.css';

function CropUI() {
  return (
    <div className="dataentry">
      <form id="dataform">
        <label className="datalabel" htmlFor="cropid">Crop Id:</label><br/>
        <input id="cropid" type="text" className="datanumber"/><br/>
        <label className="datalabel" htmlFor="cropname">Crop Name:</label><br/>
        <input id="cropname" type="text" className="datatext" defaultValue="Pig Latin"/><br/>
        <label className="datalabel" htmlFor="cropdescription">Crop Description:</label><br/>
        <input id="cropdescription" type="text" className="datatext"/><br/>
        <label className="datalabel" htmlFor="cropicccode">Crop ICC Code:</label><br/>
        <input id="cropicccode" type="number" className="datanumber" onBlur={validateicccode}/><br/>
        <div className="buttondiv">
          <input className="datasubmit" type="button" value="FIND CROP"   formMethod="POST" onClick={findrecord}/>
          <input className="datasubmit" type="button" value="UPDATE CROP" formMethod="PUT"  onClick={putdata}/>
          <input className="datasubmit" type="button" value="ADD CROP"    formMethod="POST" onClick={adddata}/>
        </div>
      </form>
    </div>
  );
} // FUNCTION APP()

function findrecord() {
  var cropidd = document.getElementById("cropid").value;
  console.log(cropidd);
  var seekstring = "http://localhost:8080/seedinspection/crops/" + cropidd;
  window.open(seekstring);
} // PUTDATA()

function adddata() {
} // PUTDATA()

function putdata() {
  window.open("http://localhost:8080/seedinspection/crops/all");
} // PUTDATA()

function validateicccode() {
  var cropcode = document.getElementById("cropicccode").value;
  console.log(cropcode);
  if ("" === cropcode || cropcode < 0) {
    alert("Please enter 0 or a number for the ICC Code.");
    return false;
  } // IF
} // VALIDATEICCCODE()

export default CropUI;
