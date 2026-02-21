import React from "react";
import "./BoardTile.css";
import CheckerPiece from "../CheckerPiece/CheckerPiece";

function BoardTile({row, col, isRowGood, clicked, clickTile, pieces}) {

    const isDark = (row + col) % 2 === 1;
    
    let active = clicked?.row === row && clicked?.col === col;
    let hasPiece = pieces.find(p => p.r === row && p.c === col);

    let pieceClass = "";
    if (hasPiece) {
        pieceClass = hasPiece.team
    }



    return (
        <button 
            className={active ? "clicked" : isDark ? "tileDark" : "tileLight"}
            onClick={() => clickTile(row, col)}>
            <div className={pieceClass}></div>
        </button>
    );
}

export default BoardTile