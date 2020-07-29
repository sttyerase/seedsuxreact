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
        <div id="buttondiv">
          <input className="datasubmit" type="button" value="FIND CROP BY ID" onClick={findrecordbyid}/>
          <input className="datasubmit" type="button" value="UPDATE CROP"     onClick={updatedata}/>
          <input className="datasubmit" type="button" value="ADD CROP"        onClick={adddata}/>
          <input className="datasubmit" type="button" value="DEL CROP"        onClick={deletedata}/>
          <input className="datasubmit" type="button" value="LIST BY ID"      onClick={listAll}/>
          <input className="datasubmit" type="button" value="LIST BY NAME"    onClick={listAllByName}/>
          <input className="datasubmit" type="button" value="CLEAR FORM"      onClick={resetAll}/>
          <input className="datasubmit" type="button" value="GET COUNT"       onClick={countCropRecords}/>
        </div>
      </form>
  );
} // FUNCTION APP()

async function findrecordbyid() {
    if(!validatecropid()) {
        document.getElementById("cropid").focus();
        return;
    } ; // IF
  var seekval = document.getElementById("cropid").value;
  let myReq = new Request("http://localhost:8080/seedinspection/crops/id/" + seekval);
  if(config.get('debugseedsux')) console.log("Looking for crop id: " + seekval);
  await fetch(myReq)
      .then(response => {
          if(response.status !== 200) {
              resetForm();
              throw Error("Crop Id " + seekval + " not found in database: " + response.status);
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
    if(config.get('debugseedsux')) console.log("Finding all crops by id.");
    await fetch(myReq)
        .then(response => {
            if(response.status !== 200) {
                throw Error("Crop list not found: " + response.status);
            } // IF
            return response.json();
        })
        .then(data => {
            resetForm();
            //TODO: WHY DO I NEED TO "STRINGIFY" A RESPONSE THAT IS ALREADY "STRINGIFIED" AT THE SOURCE??
            document.getElementById("resptext").value = JSON.stringify(data,null,2);
        })
        .catch( function(error){
            if(config.get('debugseedsux')) console.log("FIND FAILURE:" + error);
            document.getElementById("resptext").value = "FIND FAILURE:" + error;
        });
} // LISTALL()

async function listAllByName(){
    let myReq = new Request("http://localhost:8080/seedinspection/crops/all");
    if(config.get('debugseedsux')) console.log("Finding all crops by name.");
    let myHeaders = new Headers();
    myHeaders.append("Content-Type","application/json");
    const myInit = {method: 'GET',
        headers: myHeaders};
    await fetch(myReq,myInit)
        .then(response => {
            if(response.status !== 200) {
                throw Error("Crop list not found: " + response.status);
            } // IF
            return response.json();
        })
        .then(data => {
            data.sort((a,b) => {
                let ca = a.cropName.toLowerCase();
                let cb = b.cropName.toLowerCase();
                if(ca < cb){return -1;}
                if(ca > cb){return 1; }
                return 0;
            });
            /** COMMENT OUT FOR DEBUGGING
             **/
            resetMessageBoard();
            data.forEach((myD) => {
                let num = String("      " + myD.cropId).slice(-6);  // FIXED WIDTH FORMAT UP TO 999999
                document.getElementById("resptext").value += (`${num} | ${myD.cropDescription}\n`);
            });
            // document.getElementById("resptext").value = JSON.stringify(data,null,2);
        })
        .catch( function(error){
            if(config.get('debugseedsux')) console.log("FIND FAILURE:" + error);
            document.getElementById("resptext").value = "FIND FAILURE:" + error;
        });
} // LISTALLBYNAME()

// TODO: ADDDATA() NEEDS TO EVENTUALLY BE A SEPARATE SCREEN
async function adddata() {
    // VALIDATE DATA INPUTS
    if(!validateicccode()) {
        document.getElementById("cropicccode").focus();
        return;
    } ; // IF1
    if (document.getElementById("cropname").value === "") {
        alert("Please enter text for the crop name.");
        document.getElementById("cropname").focus();
        return;
    } // IF2
    if (document.getElementById("cropdescription").value === "") {
        alert("Please enter text for the crop description.");
        document.getElementById("cropdescription").focus();
        return;
    } // IF3
    // CROPID IS AUTOINCREMENT. SET ENTRY VALUE TO NULL
    document.getElementById("cropid").value = "";
    let myReq = new Request("http://localhost:8080/seedinspection/crops/new" );
    let myHeaders = new Headers();
    myHeaders.append("Content-Type","application/json");
    // let cid = document.getElementById("cropid").value;
    let cname = document.getElementById("cropname").value;
    let cdesc = document.getElementById("cropdescription").value;
    let ciccc = document.getElementById("cropicccode").value;
    // FORMAT FORM ENTRY VALUES INTO JSON FOR REQUEST BODY
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
    if(!validatecropid()) {
        document.getElementById("cropid").focus();
        return;
    } ; // IF
    if(!validateicccode()) {
        document.getElementById("cropicccode").focus();
        return;
    } ;
    var seekval = document.getElementById("cropid").value;
    let myReq = new Request("http://localhost:8080/seedinspection/crops/" + seekval);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type","application/json");
    let cid = document.getElementById("cropid").value;
    let cname = document.getElementById("cropname").value;
    let cdesc = document.getElementById("cropdescription").value;
    let ciccc = document.getElementById("cropicccode").value;
    // FORMAT FORM ENTRY VALUES INTO JSON FOR REQUEST BODY
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

async function deletedata() {
    if(!validatecropid()) {
        document.getElementById("cropid").focus();
        return;
    } ; // IF
    var seekval = document.getElementById("cropid").value;
    var seekname = document.getElementById("cropname").value;
    let myReq = new Request("http://localhost:8080/seedinspection/crops/delete/" + seekval);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const myInit = {
        method: 'DELETE',
        headers: myHeaders
    };
    if (config.get('debugseedsux')) console.log("Deleting crop id: " + seekval);
    await fetch(myReq, myInit)
        .then(response => {
            if (response.status !== 200) {
                resetForm();
                throw Error("Crop id " + seekval + " not found in database: " + response.status);
            } // IF
            document.getElementById("resptext").value = "Deleted crop record for id: " + seekval + " CROP: " + seekname;
            return response.json();
        })
        .catch(function (error) {
            if (config.get('debugseedsux')) console.log("DELETE FAILURE:" + error);
            document.getElementById("resptext").value = "DELETE FAILURE:" + error;
        });
} // DELETEDATA()

async function countCropRecords() {
    resetMessageBoard();
    let myReq = new Request("http://localhost:8080/seedinspection/crops/rowcount");
    if(config.get('debugseedsux')) console.log("Retrieving record count for crops.");
    await fetch(myReq)
        .then(response => {
            if (response.status !== 200) {
                resetForm();
                throw Error("Failed retrieving crop record count: " + response.status);
            } // IF
            return response.json();
        })
        .then(data => {
            document.getElementById("resptext").value = "Count of crop records in database: " + data;
        })
        .catch(function (error) {
            if (config.get('debugseedsux')) console.log("FIND FAILURE:" + error);
            document.getElementById("resptext").value = "FIND FAILURE:" + error;
        });
}


/***
 * ============== BEGIN SUPPORT FUNCTION SECTION ====================
 */

function validatecropid() {
    var theId = document.getElementById("cropid").value;
    if(config.get('debugseedsux')) console.log("Validate crop id entry: " + theId);
    if ("" === theId || theId < 0) {
        alert("Please enter 0 or a number for the crop id.");
        return false;
    } // IF
    return true;
} // VALIDATECROPID()

function validateicccode() {
  var theCode = document.getElementById("cropicccode").value;
    if(config.get('debugseedsux')) console.log("Validate ICC Code: " + theCode);
  if ("" === theCode || theCode < 0) {
    alert("Please enter 0 or a number for the ICC Code.");
    return false;
  } // IF
    return true;
} // VALIDATEICCCODE()

function resetAll(){
    resetMessageBoard();
    resetForm();
} // RESETALL()

function resetForm(){
    if(config.get('debugseedsux')) console.log("Clear the form data.");
    document.getElementById("cropid").value = ""
    document.getElementById("cropname").value = ""
    document.getElementById("cropdescription").value = "";
    document.getElementById("cropicccode").value = "";
    document.getElementById("cropid").focus();
}  // RESETFORM()

function resetMessageBoard() {
    if(config.get('debugseedsux')) console.log("Clear the message board.");
    document.getElementById("resptext").value = "";
} // RESETMESSAGEBOARD()

export default CropUI;
