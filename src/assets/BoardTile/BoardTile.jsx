import React from "react";
import "./BoardTile.css";
import CheckerPiece from "../CheckerPiece/CheckerPiece";

function BoardTile({row, col, isRowGood, clicked, clickTile, pieces, moves }) {

    const isDark = (row + col) % 2 === 1;
    
    let active = clicked?.row === row && clicked?.col === col;
    let hasPiece = pieces.find(p => p.r === row && p.c === col);

    let pieceClass = "";
    if (hasPiece) {
        pieceClass = hasPiece.team;
    } else if (moves?.some(m => m[0] === row && m[1] === col)) {
        pieceClass = "legalMove";
    }



    return (
        <button 
            className={active ? "clicked" : isDark ? "tileDark" : "tileLight"}
            onClick={() => clickTile(row, col)}>
            <div className={pieceClass}>
                {hasPiece?.king && <div className="star"></div> }
            </div>
        </button>
    );
}

export default BoardTile