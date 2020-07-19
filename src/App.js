import React from 'react';
import './App.css';
import config from 'react-global-configuration';

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
          <input className="datasubmit" type="button" value="FIND CROP BY ID" onClick={findrecordbyid}/>
          <input className="datasubmit" type="button" value="UPDATE CROP"     onClick={updatedata}/>
          <input className="datasubmit" type="button" value="ADD CROP"        onClick={adddata}/>
          <input className="datasubmit" type="button" value="LIST ALL"        onClick={listAll}/>
          <input className="datasubmit" type="button" value="CLEAR FORM"      onClick={resetAll}/>
        </div>
      </form>
  );
} // FUNCTION APP()

async function findrecordbyid() {
  var seekval = document.getElementById("cropid").value;
  let myReq = new Request("http://localhost:8080/seedinspection/crops/" + seekval);
  if(config.get('debugseedsux')) console.log("Looking for crop id: " + seekval);
  await fetch(myReq)
      .then(response => {
          if(response.status !== 200) {
              resetForm();
              throw Error("Crop Id " + seekval + " not found in database: " + response.statusText);
          } // IF
          return response.json();
      })
      .then(data => {
          resetMessageBoard();
          document.getElementById("resptext").value = "Found crop record for id: " + seekval;
          document.getElementById("cropid").value = data.valueOf()["cropId"];
          document.getElementById("cropname").value = data.valueOf()["cropName"];
          document.getElementById("cropdescription").value = data.valueOf()["cropDescription"];
          document.getElementById("cropicccode").value = data.valueOf()["cropICCCode"];
      })
      .catch( function(error){
          if(config.get('debugseedsux')) console.log("FIND FAILURE:" + error);
          document.getElementById("resptext").value = "FIND FAILURE:" + error;
      });
} // FINDRECORDBYID()

async function listAll(){
    let myReq = new Request("http://localhost:8080/seedinspection/crops/all");
    if(config.get('debugseedsux')) console.log("Finding all crops.");
    await fetch(myReq)
        .then(response => {
            if(response.status !== 200) {
                throw Error("Crop list not found: " + response.statusText);
            } // IF
            return response.json();
        })
        .then(data => {
            resetForm();
            document.getElementById("resptext").value = JSON.stringify(data,null,2);
        })
        .catch( function(error){
            if(config.get('debugseedsux')) console.log("FIND FAILURE:" + error);
            document.getElementById("resptext").value = "FIND FAILURE:" + error;
        });
} // LISTALLCROPS()

// TODO: ADDDATA() NEEDS TO EVENTUALLY BE A SEPARATE SCREEN
async function adddata() {
    validateicccode();
    document.getElementById("cropid").value = "";
    let myReq = new Request("http://localhost:8080/seedinspection/crops/new" );
    let myHeaders = new Headers();
    myHeaders.append("Content-Type","application/json");
    // let cid = document.getElementById("cropid").value;
    let cname = document.getElementById("cropname").value;
    let cdesc = document.getElementById("cropdescription").value;
    let ciccc = document.getElementById("cropicccode").value;
    let myBody =  `{"cropName": "${cname}","cropDescription": "${cdesc}","cropICCCode": ${ciccc} }`;
    const myInit = {method: 'POST',
        headers: myHeaders,
        body: myBody};
    if(config.get('debugseedsux')) console.log("Adding new crop record: " + myBody);
    await fetch(myReq, myInit)
        .then(response => {
            if(response.status !== 200) {
                resetForm();
                throw Error("Failed to add new crop record: " + response.status);
            } // IF
            document.getElementById("resptext").value = "Successfully added new crop record.";
            return response.json();
        })
        .catch( function(error){
            if(config.get('debugseedsux')) console.log("NEW RECORD FAILURE:" + error);
            document.getElementById("resptext").value = "NEW RECORD FAILURE:" + error;
        });
} // ADDDATA()

async function updatedata() {
    validateicccode();
    var seekval = document.getElementById("cropid").value;
    let myReq = new Request("http://localhost:8080/seedinspection/crops/" + seekval);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type","application/json");
    let cid = document.getElementById("cropid").value;
    let cname = document.getElementById("cropname").value;
    let cdesc = document.getElementById("cropdescription").value;
    let ciccc = document.getElementById("cropicccode").value;
    let myBody =  `{"cropId": ${cid} ,"cropName": "${cname}","cropDescription": "${cdesc}","cropICCCode": ${ciccc} }`;
    const myInit = {method: 'PUT',
                    headers: myHeaders,
                    body: myBody};
    if(config.get('debugseedsux')) console.log("Updating crop id: " + seekval);
    if(config.get('debugseedsux')) console.log("Updating crop id: " + myBody);
    await fetch(myReq, myInit)
        .then(response => {
            if(response.status !== 200) {
                resetForm();
                throw Error("Crop id " + seekval + " not found in database: " + response.status);
            } // IF
            document.getElementById("resptext").value = "Updated crop record for id: " + seekval;
            return response.json();
        })
        .catch( function(error){
            if(config.get('debugseedsux')) console.log("UPDATE FAILURE:" + error);
            document.getElementById("resptext").value = "UPDATE FAILURE:" + error;
        });
    /** COMMENT OUT FOR DEBUG
     **/
} // UPDATEDATA()

function validateicccode() {
  var theCode = document.getElementById("cropicccode").value;
    if(config.get('debugseedsux')) console.log("Validate ICC Code: " + theCode);
  if ("" === theCode || theCode < 0) {
    alert("Please enter 0 or a number for the ICC Code.");
    return false;
  } // IF
} // VALIDATEICCCODE()

function resetAll(){
    resetForm();
    resetMessageBoard();
} // RESETALL()

function resetForm(){
    if(config.get('debugseedsux')) console.log("Clear the form data.");
    document.getElementById("cropid").value = ""
    document.getElementById("cropname").value = ""
    document.getElementById("cropdescription").value = "";
    document.getElementById("cropicccode").value = "";
}  // RESETFORM()

function resetMessageBoard() {
    if(config.get('debugseedsux')) console.log("Clear the message board.");
    document.getElementById("resptext").value = "";
} // RESETMESSAGEBOARD()

export default CropUI;
