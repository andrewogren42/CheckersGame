import React from "react";
import "./SideBar.css"


function SideBar({ SideBarOpen, setSideBarOpen, setPieces, startingTiles }) {
    return (
        <div id="SideBar" className={SideBarOpen ? "openSeasame" : ""}>
            <button id="closeButton" onClick={() => setSideBarOpen(false)}>X</button>
            <button id="NewGame" className="sideButton" onClick={() => setPieces(startingTiles)}>New Game</button>
        </div>
    )
}
export default SideBar