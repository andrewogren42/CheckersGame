import React from "react";
import BoardTile from "../BoardTile/BoardTile";
import "./BoardRow.css"

function BoardRow({ rowIndex, clicked, clickTile, pieces}) {
    

    return (
        <div className="boardRow">
            {[...Array(8)].map((_, colIndex) => (
            <BoardTile
                key={colIndex}
                row={rowIndex}
                col={colIndex}
                isRowGood={rowIndex > 4 ? "yes" : rowIndex < 3 ? "no" : "empty"}
                clicked={clicked}
                clickTile={clickTile}
                pieces={pieces}
            />
            ))}
        </div>
    );
}

export default BoardRow