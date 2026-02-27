import React, { use, useState } from "react";
import BoardRow from "./assets/BoardRow/BoardRow";
import "./Board.css";

function Board({ pieces, setPieces, turn, setTurn, updateBlackCount, updateRedCount }) {

    const [clicked, setClicked] = useState(null);
    const [moves, setMoves] = useState([]);

    const kingDirections = [[1,1],[1,-1],[-1,-1],[-1,1]];
    const goodDirections = [[-1, 1], [-1, -1]];
    const evilDirections = [[1, 1], [1,-1]];

    const clickTile = (row, col) => {
        const pieceIndex = pieces.findIndex(p => p.r === row && p.c === col);
        const selectedMove = moves?.some(m => m[0] === row && m[1] === col);

        if (clicked && selectedMove) {
            const movingPiece = pieces.find(p => p.r === clicked.row && p.c === clicked.col);

            const { path, promoted } = getBestPath(clicked.row, clicked.col, row, col, movingPiece);

            let [updatedPieces, captureCount] = capturePieces(path);
            
            const movingIdx = updatedPieces.findIndex(p => p.r === clicked.row && p.c === clicked.col);

            if (movingPiece.team === 'GoodPiece') {
                updateBlackCount(captureCount)
            } else if (movingPiece.team === 'EvilPiece') {
                updateRedCount(captureCount)
            }
            
            updatedPieces[movingIdx] = { 
                ...movingPiece, 
                r: row, 
                c: col, 
                king: promoted || row === 0 || row === 7 
            };

            setPieces(updatedPieces);
            setClicked(null);
            setMoves([]);
            setTurn(!turn);
        } else if (clicked && row === clicked.row && col === clicked.col) {
            setClicked(null);
            setMoves([]);
        } else if (pieceIndex !== -1) {
            setClicked({ row, col });
            const move = legalMoves(row, col, pieceIndex, false, [], false);
            setMoves(move.possible || []);
        } else {
            setClicked({ row, col });
            setMoves([]);
        }
    };

    const legalMoves = (row, col, pieceIndex, isChainJump = false, visited = [], isKingNow = false) => {

        if (pieceIndex === -1 || (pieces[pieceIndex].team === "GoodPiece" && !turn) || (pieces[pieceIndex].team === "EvilPiece" && turn) ) return { possible: [], type: "none" };
        const currPiece = pieces[pieceIndex];
        const effectivelyAKing = currPiece.king || isKingNow;
        const directions = effectivelyAKing ? kingDirections : 
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

                    const willBecomeKing = (jumpR == 7 || jumpR == 0);
                    const jumpAgain = legalMoves(jumpR, jumpC, pieceIndex, true, nextVisited, (willBecomeKing || effectivelyAKing));

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

const getBestPath = (startR, startC, targetR, targetC, currentPiece) => {
    let bestPath = [];
    let willBeKing = currentPiece.king;

    const traverse = (r, c, path, isKing) => {
        if (r === targetR && c === targetC) {
            if (path.length > bestPath.length) {
                bestPath = [...path];
                if (isKing) willBeKing = true;
            }
            return;
        }

        const currentlyKing = isKing || r === 0 || r === 7;
        const dirs = currentlyKing ? kingDirections : 
                     (currentPiece.team === "GoodPiece" ? goodDirections : evilDirections);

        for (const [dr, dc] of dirs) {
            const jumpR = r + (dr * 2);
            const jumpC = c + (dc * 2);
            const isMoveValid = moves.some(m => m[0] === jumpR && m[1] === jumpC);
            const alreadyVisited = path.some(p => p[0] === jumpR && p[1] === jumpC);

            if (isMoveValid && !alreadyVisited) {
                traverse(jumpR, jumpC, [...path, [jumpR, jumpC]], currentlyKing);
            }
        }
    };
    traverse(startR, startC, [[startR, startC]], currentPiece.king);
    
    return { path: bestPath, promoted: willBeKing };
};

const capturePieces = (path) => {

    if (!path || path.length < 2) {
        return [pieces, 0]; 
    }
    let amount = 0

    let currentPieces = [...pieces];
    let [prevRow, prevCol] = path[0];
    const jumpsOnly = path.slice(1);
    for (const [r,c] of jumpsOnly) {
        const victimRow = (prevRow + r) / 2;
        const victimCol = (prevCol + c) / 2;
        currentPieces = currentPieces.filter(p => !(p.r === victimRow && p.c === victimCol));
        prevRow = r;
        prevCol = c;
        amount = amount + 1;
    }
    return [currentPieces, amount];
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