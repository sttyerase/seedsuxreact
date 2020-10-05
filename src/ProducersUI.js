import React from 'react';
import {initPane,getStatesDropdownList} from './AppFunctions';
import './UIs.css';

// DATA INPUT UIs WILL HAVE ONLY DATA INPUTS. SUBMIT BUTTONS GO IN BUTTONSUI PANEL.
function ProducersUI() {
    React.useEffect(() => {
        getStatesDropdownList();
    },[]);
  return (
      <form className="dataform" id={"producersform"} onLoad={initPane("PRODUCERS")}>
            <div className={"labelinputpair"}>
        <label className="datalabel" htmlFor="producerId">Producer Id:</label>
        <input id="producerId" type="text" className="datanumber"/>
            </div>
            <div className={"labelinputpair"}>
        <label className="datalabel" htmlFor="producerShortName">Producer Short Name:</label>
        <input id="producerShortName" type="text" className="datatext"/>
            </div>
            <div className={"labelinputpair"}>
        <label className="datalabel" htmlFor="producerName">Producer Company Name:</label>
        <input id="producerName" type="text" className="datatext"/>
            </div>
            <div className={"labelinputpair"}>
        <label className="datalabel" htmlFor="producerAddress1">Producer Address Line 1:</label>
        <input id="producerAddress1" type="text" className="datatext"/>
            </div>
            <div className={"labelinputpair"}>
        <label className="datalabel" htmlFor="producerAddress2">Producer Address Line 2:</label>
        <input id="producerAddress2" type="text" className="datatext"/>
            </div>
            <div className={"labelinputpair"}>
        <label className="datalabel" htmlFor="producerCity">Producer City:</label>
        <input id="producerCity" type="text" className="datatext"/>
            </div>
            <div className={"labelinputpair"}>
        <label className="datalabel" htmlFor="producerState">Producer State:</label>
                <select id="producerState" type="text" className="datatext"></select>
            </div>
            <div className={"labelinputpair"}>
        <label className="datalabel" htmlFor="producerZip">Producer Zip Code:</label>
        <input id="producerZip" type="text" className="datatext"/>
            </div>
      </form>
  );
} // FUNCTION APP()

export default ProducersUI;
