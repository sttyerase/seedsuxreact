import React from 'react';
import {initPane} from './AppFunctions';
import './UIs.css';

// DATA INPUT UIs WILL HAVE ONLY DATA INPUTS. SUBMIT BUTTONS GO IN BUTTONSUI PANEL.
function ProducersUI() {
  return (
      <form className="dataform" id={"producersform"} onLoad={initPane("PRODUCERS")}>
        <label className="datalabel" htmlFor="producerId">Producer Id:</label><br/>
        <input id="producerId" type="text" className="datanumber"/><br/>
        <label className="datalabel" htmlFor="producerShortName">Producer Short Name:</label><br/>
        <input id="producerShortName" type="text" className="datatext"/><br/>
        <label className="datalabel" htmlFor="producerName">Producer Company Name:</label><br/>
        <input id="producerName" type="text" className="datatext"/><br/>
        <label className="datalabel" htmlFor="producerAddress1">Producer Address Line 1:</label><br/>
        <input id="producerAddress1" type="text" className="datatext"/><br/>
        <label className="datalabel" htmlFor="producerAddress2">Producer Address Line 2:</label><br/>
        <input id="producerAddress2" type="text" className="datatext"/><br/>
        <label className="datalabel" htmlFor="producerCity">Producer City:</label><br/>
        <input id="producerCity" type="text" className="datatext"/><br/>
        <label className="datalabel" htmlFor="producerState">Producer State:</label><br/>
        <input id="producerState" type="text" className="datatext"/><br/>
        <label className="datalabel" htmlFor="producerZip">Producer Zip Code:</label><br/>
        <input id="producerZip" type="text" className="datatext"/><br/>
      </form>
  );
} // FUNCTION APP()

export default ProducersUI;
