import React from "react";
import BoardTile from "../BoardTile/BoardTile";
import "./BoardRow.css"

function BoardRow({rowIndex}) {
    

    return (
        <div className="boardRow">
            {[...Array(8)].map((_, colIndex) => (
            <BoardTile
                key={colIndex}
                row={rowIndex}
                col={colIndex}
                isRowGood={rowIndex > 4 ? "yes" : rowIndex < 3 ? "no" : "empty"}
            />
            ))}
        </div>
    );
}

export default BoardRow