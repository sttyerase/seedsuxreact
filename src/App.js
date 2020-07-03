import React from 'react';
import './App.css';

function App() {
  return (
    <div className="dataentry">
      <form id="dataform">
        <label className="datalabel" forName="cropid">Crop Id:</label><br/>
        <input id="cropid" type="text" className="datainput"/><br/>
          <label className="datalabel" forName="cropname">Crop Name:</label><br/>
          <input id="cropname" type="text" className="datainput"/><br/>
          <label className="datalabel" forName="cropdescription">Crop Description:</label><br/>
          <input id="cropdescription" type="text" className="datainput"/><br/>
          <label className="datalabel" forName="cropicccode">Crop ICC Code:</label><br/>
          <input id="cropicccode" type="text" className="datainput"/><br/>
          <input className="datasubmit" type="submit" value="PUNCH IT" onClick="putdata()"/>
      </form>
    </div>
  );
} // FUNCTION APP()

function putdata() {
  window.open("https://192.168.1.247:8080/seedinspection/crops/all","_blanc");
} // PUTDATA()

export default App;
