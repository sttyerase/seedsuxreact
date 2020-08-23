import React from "react";
import './ResponseDisplay.css';

function ResponseDisplay() {
    return(
        <div id={"respdiv"}>
            <textarea id="messageboard" className="messageboard" disabled/>
        </div>
    );
}

export default ResponseDisplay;