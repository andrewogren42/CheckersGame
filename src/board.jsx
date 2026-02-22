import React, { use, useState } from "react";
import BoardRow from "./assets/BoardRow/BoardRow";
import "./Board.css";

function Board() {

    const startingTiles = [ 
            { r: 0, c: 1, team: 'EvilPiece', king: false }, { r: 0, c: 3, team: 'EvilPiece', king: false }, { r: 0, c: 5, team: 'EvilPiece', king: false }, { r: 0, c: 7, team: 'EvilPiece', king: false },
            { r: 1, c: 0, team: 'EvilPiece', king: false }, { r: 1, c: 2, team: 'EvilPiece', king: false }, { r: 1, c: 4, team: 'EvilPiece', king: false }, { r: 1, c: 6, team: 'EvilPiece', king: false },
            { r: 2, c: 1, team: 'EvilPiece', king: false }, { r: 2, c: 3, team: 'EvilPiece', king: false }, { r: 2, c: 5, team: 'EvilPiece', king: false }, { r: 2, c: 7, team: 'EvilPiece', king: false },
            { r: 5, c: 0, team: 'GoodPiece', king: false }, { r: 5, c: 2, team: 'GoodPiece', king: false }, { r: 5, c: 4, team: 'GoodPiece', king: false }, { r: 5, c: 6, team: 'GoodPiece', king: false },
            { r: 6, c: 1, team: 'GoodPiece', king: false }, { r: 6, c: 3, team: 'GoodPiece', king: false }, { r: 6, c: 5, team: 'GoodPiece', king: false }, { r: 6, c: 7, team: 'GoodPiece', king: false },
            { r: 7, c: 0, team: 'GoodPiece', king: false }, { r: 7, c: 2, team: 'GoodPiece', king: false }, { r: 7, c: 4, team: 'GoodPiece', king: false }, { r: 7, c: 6, team: 'GoodPiece', king: false },
                        ]

    const [clicked, setClicked] = useState(null);
    const [pieces, setPieces] = useState(startingTiles);
    const [moves, setMoves] = useState([]);

    const clickTile = (row, col) => {
        const piece = pieces.findIndex(p => p.r === row && p.c === col);
        console.log(piece)
        if (piece === -1 && moves.length === 0) {
            setClicked({ row, col });
            setMoves([]);
            console.log("Piece is -1");
            return;
        }
        if(!clicked) {
            setClicked({ row, col});
            if (piece !== -1) {
                const move = legalMoves(row, col, false, piece);
                console.log(`Working "${move}"`)
                setMoves(move)
            }
            return;
        }
        if(clicked.row === row && clicked.col === col) {
            setClicked(null);
            setMoves([]);
            console.log("Unclicking tile");
        } else {
            console.log(`Made it "${row, col, clicked.row, clicked.col}"`)
            if (moves?.some(m => m[0] === row && m[1] === col)){
                const activePieceIndex = pieces.findIndex(p => p.r === clicked.row && p.c === clicked.col);
                const updatedPieces = [...pieces];
                if (row === 0 || row === 7){
                    updatedPieces[activePieceIndex] = {
                    ...updatedPieces[activePieceIndex],
                    r:row,
                    c:col,
                    king: true
                    };
                } else {
                    updatedPieces[activePieceIndex] = {
                        ...updatedPieces[activePieceIndex],
                        r:row,
                        c:col
                    };
                }
                console.log("Updating Pieces")
                setPieces(updatedPieces);
                setClicked({ row, col });
                const move = legalMoves(row, col, true, activePieceIndex);
                setMoves(move);
            }
            else {
                console.log("Updating moves")
                setClicked({ row, col });
                const move = legalMoves(row, col, true, piece);
                setMoves(move);
            }
        }
    };

    const legalMoves = (row, col, moving, piece) => {
        console.log(piece)
        if (piece === -1) return [];
        if (pieces[piece].king) {
                return [[row - 1, col - 1],[row - 1, col + 1], [row + 1, col - 1],[row + 1, col + 1]]
        } else {
                if (pieces[piece].team === 'GoodPiece') {
                    return [[row - 1, col - 1],[row - 1, col + 1]]
                } else {
                    return [[row + 1, col - 1],[row + 1, col + 1]]
                }
            } 
        }


    return (
        <div className="board">
            {[...Array(8)].map((_, rowIndex) => ( 
                <BoardRow 
                    key={rowIndex}
                    rowIndex={rowIndex}
                    clicked={clicked}
                    clickTile={clickTile}
                    pieces={pieces}
                    moves={moves}
                />
            ))}
            
        </div>
    )
}

export default Board