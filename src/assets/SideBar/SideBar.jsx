import React, { useState } from "react";
import "./SideBar.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";


function SideBar({  SideBarOpen, setSideBarOpen, startSeconds, 
                    setStartSeconds, isDarkMode, setDarkMode, 
                    resetGame, resetScore, showMoves, setShowMoves,
                     toggleShowRules, aiType, setAiType
                }) {

    const isSpeedGame = startSeconds === 180;

    const handleSpeedToggle = (wantsSpeedGame) => {
        setStartSeconds(wantsSpeedGame ? 180 : 600);
    };

    return (
        <div id="SideBar" className={`${SideBarOpen ? "openSeasame" : ""} ${isDarkMode ? "Dark" : "Light"}`}>
            <button id="closeButton" onClick={() => setSideBarOpen(false)}>X</button>
            <h2 id="SettingsSideBar">Settings</h2>
            <button id="NewGame" className="sideButton" onClick={resetGame}>New Game</button>
            <button id="ResetScore" className="sideButton" onClick={resetScore}>Reset Score</button>
            <button id="rulesButton" className="sideButton" onClick={toggleShowRules}>Rules</button>

            <h2 id="AIOpponent">AI Opponent</h2>
            <ToggleSwitch 
                id="MCTSSwitch"
                className="Switch"
                label="MCTS"
                state={aiType === 'MCTS'}
                setState={() => setAiType('MCTS')}
            />
            <ToggleSwitch 
                id="ABSwitch"
                className="Switch"
                label="A-B pruning"
                state={aiType === 'A-B pruning'}
                setState={() => setAiType('A-B pruning')}
            />

            <h2 id="GameSettings">Game Settings</h2>
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