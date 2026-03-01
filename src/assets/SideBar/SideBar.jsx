import React, { useState } from "react";
import "./SideBar.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";


function SideBar({  SideBarOpen, setSideBarOpen, startSeconds, 
                    setStartSeconds, isDarkMode, setDarkMode, 
                    resetGame, resetScore, showMoves, setShowMoves,
                     toggleShowRules
                }) {

    const isSpeedGame = startSeconds === 180;

    const handleSpeedToggle = (wantsSpeedGame) => {
        setStartSeconds(wantsSpeedGame ? 180 : 600);
    };

    return (
        <div id="SideBar" className={SideBarOpen ? "openSeasame" : ""}>
            <button id="closeButton" onClick={() => setSideBarOpen(false)}>X</button>
            <button id="NewGame" className="sideButton" onClick={resetGame}>New Game</button>
            <button id="ResetScore" className="sideButton" onClick={resetScore}>Reset Score</button>
            <button id="rulesButton" className="sideButton" onClick={toggleShowRules}>Rules</button>
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
            <ToggleSwitch 
                id="ShowLegalMoves"
                className="Switch"
                label="Legal Moves"
                state={showMoves}
                setState={setShowMoves}
            />
        </div>
    )
}
export default SideBar