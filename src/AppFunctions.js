import config from "react-global-configuration";

// APPFUNCTIONS GLOBALS
let _dbtable = "MYJUNK",
    _pluralString = "junks",      // PLURAL NAME VALUE OF THE TABLE IN QUESTION
    _singularString = "junk",     // SINGULAR NAME VALUE OF THE TABLE IN QUESTION
    _idKey          = "junkId",
    _nameKey        = "junkName",
    _descriptionKey = "junkDescription",
    _4thPositionKey = "junk4thPosition",
    apiurl = "http://junkhost"
;

async function findrecordbyid() {
    if(!validateid()) {
        document.getElementById(_idKey).focus();
        return;
    } ; // IF
    var seekval = document.getElementById(_idKey).value;
    let myReq = new Request(apiurl + _pluralString + "/id/" + seekval);
    if(config.get('debugseedsux')) console.log("Looking for " + _singularString + " id: " + seekval);
    await fetch(myReq)
        .then(response => {
            if(response.status !== 200) {
                resetForm();
                throw Error(_singularString + " Id " + seekval + " not found in database: " + response.status);
            } // IF
            return response.json();
        })
        .then(data => {
            resetMessageBoard();
            document.getElementById(_idKey).value = data.valueOf()[_idKey];
            document.getElementById(_nameKey).value = data.valueOf()[_nameKey];
            document.getElementById(_descriptionKey).value = data.valueOf()[_descriptionKey];
            document.getElementById(_4thPositionKey).value = data.valueOf()[_4thPositionKey];
            document.getElementById("resptext").value = "Found " + _singularString + " record for id: " + seekval;
        })
        .catch( function(error){
            if(config.get('debugseedsux')) console.log("FIND FAILURE:" + error);
            document.getElementById("resptext").value = "FIND FAILURE:" + error;
        });
    resetFocus();
} // FINDRECORDBYID()

async function listAllById() {
    let myReq = new Request(apiurl + _pluralString + "/all");
    if(config.get('debugseedsux')) console.log("Finding all " + _pluralString + " by id.");
    await fetch(myReq)
        .then(response => {
            if(response.status !== 200) {
                throw Error(_pluralString + " list not found: " + response.status);
            } // IF
            return response.json();
        })
        .then(data => {
            resetForm();
            resetMessageBoard();
            data.forEach((myD) => {
                let num = String("      " + myD[_idKey]).slice(-6);  // FIXED WIDTH FORMAT UP TO 999999
                document.getElementById("resptext").value += (`${num} | ${myD[_descriptionKey]}\n`);
            });
        })
        .catch( function(error) {
            if(config.get('debugseedsux')) console.log("FIND FAILURE:" + error);
            document.getElementById("resptext").value = "FIND FAILURE:" + error;
        });
    resetFocus();
} // LISTALL()

async function listAllByName() {
    let myReq = new Request(apiurl + _pluralString + "/all");
    if(config.get('debugseedsux')) console.log("Finding all " + _pluralString + " by name.");
    let myHeaders = new Headers();
    myHeaders.append("Content-Type","application/json");
    const myInit = {method: 'GET',
        headers: myHeaders};
    await fetch(myReq,myInit)
        .then(response => {
            if(response.status !== 200) {
                throw Error(_pluralString + " list not found: " + response.status);
            } // IF
            return response.json();
        })
        .then(data => {
            resetMessageBoard();
            resetForm();
            data.sort((a,b) => {
                let ca = a[_nameKey].toLowerCase();
                let cb = b[_nameKey].toLowerCase();
                if(ca < cb){return -1;}
                if(ca > cb){return 1; }
                return 0;
            });
            data.forEach((myD) => {
                let num = String("      " + myD[_idKey]).slice(-6);  // FIXED WIDTH FORMAT UP TO 999999
                document.getElementById("resptext").value += (`${num} | ${myD[_descriptionKey]}\n`);
            });
            // document.getElementById("resptext").value = JSON.stringify(data,null,2);
        })
        .catch( function(error){
            if(config.get('debugseedsux')) console.log("FIND FAILURE:" + error);
            document.getElementById("resptext").value = "FIND FAILURE:" + error;
        });
    resetFocus();
} // LISTALLBYNAME()

async function adddata() {
    // VALIDATE DATA INPUTS
    if(_dbtable === "CROPS" && !validateicccode()) {
        document.getElementById("cropicccode").focus();
        return;
    } ; // IF1
    if (document.getElementById(_nameKey).value === "") {
        alert("Please enter text for the " + _singularString + " name.");
        document.getElementById(_nameKey).focus();
        return;
    } // IF2

    // _IDKEYS ARE AUTOINCREMENT. SET ENTRY VALUE TO NULL
    document.getElementById(_idKey).value = "";
    let myReq = new Request(apiurl + _pluralString + "/new");
    let myHeaders = new Headers();
    myHeaders.append("Content-Type","application/json");
    // let cid = document.getElementById("cropid").value;
    let cname = document.getElementById(_nameKey).value;
    let cdesc = document.getElementById(_descriptionKey).value;
    let ciccc = document.getElementById(_4thPositionKey).value;
    // FORMAT FORM ENTRY VALUES INTO JSON FOR REQUEST BODY
    let myBody =  `{"${_nameKey}": "${cname}","${_descriptionKey}": "${cdesc}","${_4thPositionKey}": ${ciccc} }`;

    const myInit = {method: 'POST',
        headers: myHeaders,
        body: myBody};
    if(config.get('debugseedsux')) console.log("Adding new " + _singularString + " record: " + myBody);
    await fetch(myReq, myInit)
        .then(response => {
            if(response.status !== 200) {
                resetForm();
                throw Error("Failed to add new " + _singularString + " record: " + response.status);
            } // IF
            document.getElementById("resptext").value = "Successfully added new " + _singularString + " record.";
            return response.json();
        })
        .catch( function(error){
            if(config.get('debugseedsux')) console.log("NEW RECORD FAILURE:" + error);
            document.getElementById("resptext").value = "NEW RECORD FAILURE:" + error;
        });
    resetFocus();
} // ADDDATA()

async function updatedata() {
    if(!validateid()) {
        document.getElementById(_idKey).focus();
        return;
    } ; // IF
    if(_dbtable === "CROPS" && !validateicccode()) {
        document.getElementById("cropICCCode").focus();
        return;
    } ;
    var seekval = document.getElementById(_idKey).value;
    let myReq = new Request(apiurl + _pluralString + "/update/" + seekval);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type","application/json");
    let cid = document.getElementById(_idKey).value;
    let cname = document.getElementById(_nameKey).value;
    let cdesc = document.getElementById(_descriptionKey).value;
    let ciccc = document.getElementById(_4thPositionKey).value;
    // FORMAT FORM ENTRY VALUES INTO JSON FOR REQUEST BODY
    let myBody =  `{"${_idKey}": ${cid} ,"${_nameKey}": "${cname}","${_descriptionKey}": "${cdesc}","${_4thPositionKey}": ${ciccc} }`;
    const myInit = {method: 'PUT',
        headers: myHeaders,
        body: myBody};
    if(config.get('debugseedsux')) console.log("Updating " + _singularString + " id: " + seekval);
    if(config.get('debugseedsux')) console.log("Updating " + _singularString + " with: " + myBody);
    await fetch(myReq, myInit)
        .then(response => {
            if(response.status !== 200) {
                resetForm();
                throw Error(_singularString + " id " + seekval + " not found in database: " + response.status);
            } // IF
            document.getElementById("resptext").value = "Updated " + _singularString + " record for id: " + seekval;
            return response.json();
        })
        .catch( function(error){
            if(config.get('debugseedsux')) console.log("UPDATE FAILURE:" + error);
            document.getElementById("resptext").value = "UPDATE FAILURE:" + error;
        });
    /** COMMENT OUT FOR DEBUG
     **/
    resetFocus();
} // UPDATEDATA()

async function deletedata() {
    if(!validateid()) {
        document.getElementById(_idKey).focus();
        return;
    } ; // IF
    var seekval = document.getElementById(_idKey).value;
    var seekname = document.getElementById(_nameKey).value;
    let myReq = new Request(apiurl + _pluralString + "/delete/" + seekval);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const myInit = {
        method: 'DELETE',
        headers: myHeaders
    };
    if (config.get('debugseedsux')) console.log("Deleting " + _singularString + " id: " + seekval);
    await fetch(myReq, myInit)
        .then(response => {
            if (response.status !== 200) {
                resetForm();
                throw Error( _singularString + " id " + seekval + " not found in database: " + response.status);
            } // IF
            document.getElementById("resptext").value = "Deleted " + _singularString + " record for id: " + seekval + _singularString + ": " + seekname;
            return response.json();
        })
        .catch(function (error) {
            if (config.get('debugseedsux')) console.log("DELETE FAILURE:" + error);
            document.getElementById("resptext").value = "DELETE FAILURE:" + error;
        });
    resetFocus();
} // DELETEDATA()

async function countDbRecords() {
    resetForm();
    resetMessageBoard();
    let myReq = new Request(apiurl + _pluralString + "/rowcount");
    if(config.get('debugseedsux')) console.log("Retrieving record count for " + _pluralString + ".");
    await fetch(myReq)
        .then(response => {
            if (response.status !== 200) {
                resetForm();
                throw Error("Failed retrieving record count: " + response.status);
            } // IF
            return response.json();
        })
        .then(data => {
            document.getElementById("resptext").value = "Count of records in " + _dbtable + " database: " + data;
        })
        .catch(function (error) {
            if (config.get('debugseedsux')) console.log("FIND FAILURE:" + error);
            document.getElementById("resptext").value = "FIND FAILURE:" + error;
        });
    resetFocus();
}


/***
 * ============== BEGIN SUPPORT FUNCTION SECTION ====================
 */

function validateid() {
    var theId = document.getElementById(_idKey).value;
    if(config.get('debugseedsux')) console.log("Validate " + _singularString + " id entry: " + theId);
    if ("" === theId || theId < 0) {
        alert("Please enter a number > 0 for the " + _singularString + " id.");
        return false;
    } // IF
    return true;
} // VALIDATECROPID()

function validateicccode() {
    var theCode = document.getElementById("cropICCCode").value;
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
    resetFocus();
} // RESETALL()

function resetForm(){
    if(config.get('debugseedsux')) console.log("Clear the form data.");
    let dataForm = document.getElementsByClassName("dataform");
    let inputTags = dataForm.item(0).getElementsByTagName("input");
    for(let indx = 0; indx < inputTags.length; indx++){
        inputTags.item(indx).value = "";
    } // FOR
}  // RESETFORM()

function resetMessageBoard() {
    if(config.get('debugseedsux')) console.log("Clear the message board.");
    document.getElementById("resptext").value = "";
} // RESETMESSAGEBOARD()

function resetFocus() {
    // FOCUS ON THE FIRST INPUT ITEM ON THE PANEL
    document.getElementsByClassName("dataform").item(0).getElementsByTagName("input").item(0).focus();
} // RESETFOCUS()

function setDbTable(tableName) {
    _dbtable = tableName;
} // SETDBTABLE(TABLENAME)

function initPane(tableName) {
    setDbTable(tableName);
    if(tableName === "CROPS"){
        _pluralString = "crops";
        _singularString = "crop";
        _idKey          = "cropId";
        _nameKey        = "cropName";
        _descriptionKey = "cropDescription";
        _4thPositionKey = "cropICCCode";
    } else if(tableName === "VARIETIES") {
        _pluralString = "varieties";
        _singularString = "variety";
        _idKey          = "varietyId";
        _nameKey        = "varietyName";
        _descriptionKey = "varietyDescription";
        _4thPositionKey = "varietyCropId";
    } // IF-ELSE
    apiurl = config.get('appurl');
} // LOADPARAMS(STRING)

export {
    findrecordbyid,
    listAllById,
    listAllByName,
    adddata,
    updatedata,
    deletedata,
    countDbRecords,
    resetForm,
    resetFocus,
    resetAll,
    resetMessageBoard,
    initPane
}

// TODO: WHY DO I NEED TO "STRINGIFY" A RESPONSE THAT IS ALREADY "STRINGIFIED" AT THE SOURCE??
// document.getElementById("resptext").value = JSON.stringify(data,null,2);
