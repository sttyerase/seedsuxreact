import React from "react";
import './Resp.css';

function RespUI() {
    return(
        <div id={"respdiv"}>
            <textarea id="resptext" className="resptext" disabled/>
        </div>
    );
}

export default RespUI;