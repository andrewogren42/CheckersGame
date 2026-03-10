import React from "react";
import "./ScoreBoard.css";

function ScoreBoard({ setSideBarOpen, gameWon, isDarkMode }) {

    return (
        <div id="topRow">
            <div className="ScoreBoard">
                <h2>{gameWon[0]} - {gameWon[1]} {gameWon[2] > 0 ? "- " + gameWon[2] : ""}</h2>
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