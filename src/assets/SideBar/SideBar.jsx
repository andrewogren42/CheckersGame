import React, { useState } from "react";
import "./SideBar.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";


function SideBar({ SideBarOpen, setSideBarOpen, setPieces, startingTiles, startSeconds, setStartSeconds, isDarkMode, setDarkMode, turn, setTurn, resetGame }) {

    const isSpeedGame = startSeconds === 180;

    const handleSpeedToggle = (wantsSpeedGame) => {
        setStartSeconds(wantsSpeedGame ? 180 : 600);
    };

    return (
        <div id="SideBar" className={SideBarOpen ? "openSeasame" : ""}>
            <button id="closeButton" onClick={() => setSideBarOpen(false)}>X</button>
            <button id="NewGame" className="sideButton" onClick={resetGame}>New Game</button>
            <button id="Rules" className="sideButton">Rules</button>
            <ToggleSwitch 
                id="DarkModeSwitch"
                className="Switch"
                label="Dark Mode"
                state={isDarkMode}
                setState={setDarkMode}
            />
            <ToggleSwitch
                id="SpeedGameSwitch"
                className="Switch"
                label="Speed Game"
                state={isSpeedGame}
                setState={handleSpeedToggle}
            />
        </div>
    )
}
export default SideBar