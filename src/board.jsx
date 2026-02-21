import React from "react";
import BoardRow from "./assets/BoardRow/BoardRow";
import "./Board.css";

function Board() {


    return (
        <div className="board">
            {[...Array(8)].map((_, rowIndex) => ( 
                <BoardRow 
                    key={rowIndex}
                    rowIndex={rowIndex}
                />
            ))}
            
        </div>
    )
}

export default Board