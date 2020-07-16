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
  if(config.get('debugseedsux')) console.log("Crop Id: " + seekval);
  await fetch(myReq)
      .then(response => {
          if(response.status !== 200) {
              resetForm();
              throw Error("Crop Id " + seekval + " not found in database: " + response.statusText);
          } // IF
          return response.json();
      })
      .then(data => {
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
            document.getElementById("resptext").value = JSON.stringify(data,null,2);
        })
        .catch( function(error){
            if(config.get('debugseedsux')) console.log("FIND FAILURE:" + error);
            document.getElementById("resptext").value = "FIND FAILURE:" + error;
        });
} // LISTALLCROPS()

// TODO: ADDDATA() NEEDS TO EVENTUALLY BE A SEPARATE SCREEN
function adddata() {
    validateicccode();
    document.getElementById("cropid").value = "";
} // ADDDATA()

function updatedata() {
    validateicccode();
} // UPDATEDATA()

function validateicccode() {
  var theCode = document.getElementById("cropicccode").value;
  console.log(theCode);
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
    document.getElementById("cropid").value = ""
    document.getElementById("cropname").value = ""
    document.getElementById("cropdescription").value = "";
    document.getElementById("cropicccode").value = "";
}  // RESETFORM()

function resetMessageBoard() {
    document.getElementById("resptext").value = "";
} // RESETMESSAGEBOARD()

function handleFetchErrors(fresponse) {
    if(!fresponse.ok){
        throw Error("Website failed to respond: " + fresponse.statusText);
    } // IF
} // HANDLEFETCHERRORS(RESPONSE)

export default CropUI;
