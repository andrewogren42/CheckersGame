import React from "react";
import "./ScoreBoard.css";

function ScoreBoard({ setSideBarOpen }) {


    return (
        <div id="topRow">
            <div className="ScoreBoard">
                <h2>0 - 0</h2>
            </div>
            <button id="hamburger" onClick={() => setSideBarOpen(true)}>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    )
}

export default ScoreBoard