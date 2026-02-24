import React, { use, useState } from "react";
import BoardRow from "./assets/BoardRow/BoardRow";
import "./Board.css";

function Board({ pieces, setPieces}) {

    const [clicked, setClicked] = useState(null);
    const [moves, setMoves] = useState([]);

    const kingDirections = [[1,1],[1,-1],[-1,-1],[-1,1]];
    const goodDirections = [[-1, 1], [-1, -1]];
    const evilDirections = [[1, 1], [1,-1]];

    const clickTile = (row, col) => {
        const pieceIndex = pieces.findIndex(p => p.r === row && p.c === col);

        if (clicked && moves?.some(m => m[0] === row && m[1] === col)) {
            const lastTile = pieces.findIndex(p => p.r === clicked.row && p.c === clicked.col) ;
            if (lastTile === -1) return;
            let updatedPieces = [...pieces];

            if (Math.abs(row - clicked.row) === 2) {
                const midR = (row + clicked.row) / 2;
                const midC = (col + clicked.col) / 2;
                updatedPieces = updatedPieces.filter(p => !(p.r === midR && p.c === midC))
            }

            const movingPiece = updatedPieces.findIndex(p => p.r === clicked.row && p.c === clicked.col);
            const isKing = updatedPieces[movingPiece].king || row === 0 || row ===7;
            updatedPieces[movingPiece] = { ...updatedPieces[movingPiece], r: row, c: col, king: isKing};

            setPieces(updatedPieces);
            setClicked(null);
            setMoves([]);
            return;
        } else if (clicked && row === clicked.row && col === clicked.col) {
            setClicked(null);
            setMoves([]);
        } else if (pieceIndex !== -1) {
            setClicked({ row, col });
            const move = legalMoves(row, col, pieceIndex, false, []);
            console.log(move, move.possible)
            setMoves(move.possible || []);
        } else {
            setClicked({ row, col });
        }
    };

    const legalMoves = (row, col, pieceIndex, isChainJump = false, visited = []) => {

        if (pieceIndex === -1 || !pieces[pieceIndex]) return { possible: [], type: "none" };
        const currPiece = pieces[pieceIndex];
        const directions = currPiece.king ? kingDirections : 
                     (currPiece.team === "GoodPiece" ? goodDirections : evilDirections);

        let jumps = [];
        let slides = [];

        for (const [dr, dc] of directions) {

            const nr = row + dr;
            const nc = col + dc;
            const jumpR = row + (dr * 2);
            const jumpC = col + (dc * 2);

            if (jumpR >= 0 && jumpR < 8 &&
                jumpC >= 0 && jumpC < 8) {
                const victimIndex = pieces.findIndex(p => p.r === nr && p.c === nc);
                const landIndex = pieces.findIndex(p => p.r === jumpR && p.c === jumpC);

                if (victimIndex !== -1 &&
                    !visited.includes(victimIndex) &&
                    pieces[victimIndex].team !== currPiece.team &&
                    landIndex === -1) {
                        
                    const nextVisited = [...visited, victimIndex];
                    jumps.push([jumpR, jumpC]);
                    const jumpAgain = legalMoves(jumpR, jumpC, pieceIndex, true, nextVisited);
                    if (jumpAgain.possible.length > 0) {
                        jumps.push(...jumpAgain.possible);
                    }
                }
            }

            if (!isChainJump && nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
                const targetIdx = pieces.findIndex(p => p.r === nr && p.c === nc);
                if (targetIdx === -1) {
                    slides.push([nr, nc]);
                }
            }
        }
        return jumps.length > 0 ? { possible: jumps, type: "jump"} : { possible: slides, type: "slide"};
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
                    moves={moves}
                />
            ))}
            
        </div>
    )
}

export default Board