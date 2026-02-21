import React from "react";
import "./BoardTile.css";
import CheckerPiece from "../CheckerPiece/CheckerPiece";

function BoardTile({row, col, isRowGood}) {

    const isDark = (row + col) % 2 === 1;

    let pieceClass = "";

    if (isDark) {
        if (isRowGood == "yes") {
            pieceClass = "GoodPiece"
        } else if (isRowGood == "no") {
            pieceClass = "EvilPiece"
        } 
    }
    



    return (
        <div className={isDark ? "tileDark" : "tileLight"}>
            <div className={pieceClass}></div>
        </div>
    );
}

export default BoardTile