import React, { use, useState } from "react";
import BoardRow from "./assets/BoardRow/BoardRow";
import "./Board.css";

function Board() {

    const startingTiles = [ { r: 0, c: 1, team: 'EvilPiece' }, { r: 0, c: 3, team: 'EvilPiece' }, { r: 0, c: 5, team: 'EvilPiece' }, { r: 0, c: 7, team: 'EvilPiece' },
                            { r: 1, c: 0, team: 'EvilPiece' }, { r: 1, c: 2, team: 'EvilPiece' }, { r: 1, c: 4, team: 'EvilPiece' }, { r: 1, c: 6, team: 'EvilPiece' },
                            { r: 2, c: 1, team: 'EvilPiece' }, { r: 2, c: 3, team: 'EvilPiece' }, { r: 2, c: 5, team: 'EvilPiece' }, { r: 2, c: 7, team: 'EvilPiece' },
                            { r: 5, c: 0, team: 'GoodPiece' }, { r: 5, c: 2, team: 'GoodPiece' }, { r: 5, c: 4, team: 'GoodPiece' }, { r: 5, c: 6, team: 'GoodPiece' },
                            { r: 6, c: 1, team: 'GoodPiece' }, { r: 6, c: 3, team: 'GoodPiece' }, { r: 6, c: 5, team: 'GoodPiece' }, { r: 6, c: 7, team: 'GoodPiece' },
                            { r: 7, c: 0, team: 'GoodPiece' }, { r: 7, c: 2, team: 'GoodPiece' }, { r: 7, c: 4, team: 'GoodPiece' }, { r: 7, c: 6, team: 'GoodPiece' },
                        ]

    const [clicked, setClicked] = useState(null);
    const [pieces, setPieces] = useState(startingTiles)

    const clickTile = (row, col) => {
        if(!clicked) {
            setClicked({ row, col});
            return;
        }
        if(clicked.row === row && clicked.col === col) {
            setClicked(null);
        } else {
            const piece = pieces.findIndex(p => p.r === clicked.row && p.c === clicked.col);
            if (piece !== -1 &&
                col < 8 && col > -1 &&
                row < 8 && row > -1 &&
                Math.abs(row - clicked.row) === 1 && 
                Math.abs(col - clicked.col) === 1){
                    const updatedPieces = [...pieces];
                    updatedPieces[piece] = {
                        ...updatedPieces[piece],
                        r:row,
                        c:col
                    };
                    setPieces(updatedPieces);
            }
            setClicked({ row, col });
        }
    };


    return (
        <div className="board">
            {[...Array(8)].map((_, rowIndex) => ( 
                <BoardRow 
                    key={rowIndex}
                    rowIndex={rowIndex}
                    clicked={clicked}
                    clickTile={clickTile}
                    pieces={pieces}
                />
            ))}
            
        </div>
    )
}

export default Board