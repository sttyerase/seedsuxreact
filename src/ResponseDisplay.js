import React from "react";
import './ResponseDisplay.css';

function ResponseDisplay() {
    return(
        <div id={"respdiv"}>
            <textarea id="resptext" className="resptext" disabled/>
        </div>
    );
}

export default ResponseDisplay;