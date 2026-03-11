import React, { use, useState, useEffect, useRef } from "react";
import BoardRow from "./assets/BoardRow/BoardRow";
import "./Board.css";

function Board({pieces, setPieces, turn, 
                setTurn, updateBlackCount, 
                updateRedCount, showMoves, 
                setMovesWithoutCapture,
                addToPosition, setPosition,
                aiType, resetGame, updateWins,
                gameId
            }) {

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
                updateBlackCount(captureCount);
            } else if (movingPiece.team === 'EvilPiece') {
                updateRedCount(captureCount);
            }
            
            updatedPieces[movingIdx] = { 
                ...movingPiece, 
                r: row, 
                c: col, 
                king: promoted || (row === 0 && movingPiece.team === "GoodPiece") || (row === 7 && movingPiece.team === "EvilPiece")
            };

            const boardSnapshot = JSON.stringify(updatedPieces);

            if (captureCount !== 0 || !movingPiece.king) {
                setPosition([boardSnapshot]); 
                setMovesWithoutCapture(0);
            } else {
                addToPosition(boardSnapshot); 
                setMovesWithoutCapture(prev => prev + 1);
            }
            const gameOver = checkOpponentMoves(updatedPieces) || checkInsufficentPieces(updatedPieces);
            if (gameOver) return;
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

    const legalMoves = (row, col, pieceIndex, isChainJump = false, visited = [], isKingNow = false, updatedPieces=pieces, skipTurnCheck = false) => {

        if (pieceIndex === -1 || (!skipTurnCheck && ((updatedPieces[pieceIndex].team === "GoodPiece" && !turn) || (updatedPieces[pieceIndex].team === "EvilPiece" && turn)))) return { possible: [], type: "none" };
        const currPiece = updatedPieces[pieceIndex];
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
                const victimIndex = updatedPieces.findIndex(p => p.r === nr && p.c === nc);
                const landIndex = updatedPieces.findIndex(p => p.r === jumpR && p.c === jumpC);

                if (victimIndex !== -1 &&
                    !visited.includes(victimIndex) &&
                    updatedPieces[victimIndex].team !== currPiece.team &&
                    landIndex === -1) {
                        
                    const nextVisited = [...visited, victimIndex];
                    jumps.push([jumpR, jumpC]);

                    const willBecomeKing = (jumpR == 7 || jumpR == 0);
                    const jumpAgain = legalMoves(jumpR, jumpC, pieceIndex, true, nextVisited, (willBecomeKing || effectivelyAKing), updatedPieces);

                    if (jumpAgain.possible.length > 0) {
                        jumps.push(...jumpAgain.possible);
                    }
                }
            }

            if (!isChainJump && nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
                const targetIdx = updatedPieces.findIndex(p => p.r === nr && p.c === nc);
                if (targetIdx === -1) {
                    slides.push([nr, nc]);
                }
            }
        }
        return jumps.length > 0 ? { possible: jumps, type: "jump"} : { possible: slides, type: "slide"};
    };

    const getBestPath = (startR, startC, targetR, targetC, currentPiece, moveList=moves) => {
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

            const currentlyKing = isKing || (r === 0 && currentPiece.team === "GoodPiece") || (r === 7 && currentPiece.team === "EvilPiece");
            const dirs = currentlyKing ? kingDirections : 
                        (currentPiece.team === "GoodPiece" ? goodDirections : evilDirections);

            for (const [dr, dc] of dirs) {
                const jumpR = r + (dr * 2);
                const jumpC = c + (dc * 2);
                const isMoveValid = moveList.some(m => m[0] === jumpR && m[1] === jumpC);
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

    const checkOpponentMoves = (updatedPieces) => {
        const opponentTeam = turn ? 'EvilPiece' : 'GoodPiece';

        for (let i = 0; i < updatedPieces.length; i++) {
            const piece = updatedPieces[i];
            if (piece.team !== opponentTeam) continue;

            const hasMoves = legalMoves(piece.r, piece.c, i, false, [], false, updatedPieces, true);
            // console.log('checking', piece.team, piece.r, piece.c, 'moves:', hasMoves.possible.length);
            if (hasMoves.possible.length > 0) return;
            
        }
        
        const winner = opponentTeam === 'EvilPiece' ? 'Good' : 'Evil';
        updateWins(winner);
        resetGame();
        return true;
    }

    const checkInsufficentPieces = (updatedPieces) => {
        if (updatedPieces.length !== 2) {
            return false;
        } else if ((updatedPieces[0].team !== updatedPieces[1].team) && updatedPieces[0].king && updatedPieces[1].king){
            updateWins('Tie');
            resetGame();
            return true;
        } 
    }

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const applyAIMove = (r1, c1, r2, c2) => {
        const movingPiece = pieces.find(p => p.r === r1 && p.c === c1);
        if (!movingPiece) return;

        const pieceIndex = pieces.findIndex(p => p.r === r1 && p.c === c1);
        const aiMoves = legalMoves(r1, c1, pieceIndex, false, [], false);
        const aiMoveList = aiMoves.possible || [];

        const { path, promoted } = getBestPath(r1, c1, r2, c2, movingPiece, aiMoveList);

        let [updatedPieces, captureCount] = capturePieces(path);
        const movingIdx = updatedPieces.findIndex(p => p.r === r1 && p.c === c1);

        if (movingPiece.team === 'GoodPiece') {
            updateBlackCount(captureCount);
        } else if (movingPiece.team === 'EvilPiece') {
            updateRedCount(captureCount);
        }

        updatedPieces[movingIdx] = {
            ...movingPiece,
            r: r2,
            c: c2,
            king: promoted || (r2 === 0 && movingPiece.team === "GoodPiece") || (r2 === 7 && movingPiece.team === "EvilPiece")
        };
        const gameOver = checkOpponentMoves(updatedPieces) || checkInsufficentPieces(updatedPieces);
        if (gameOver) return;
        setPieces(updatedPieces);
        setClicked(null);
        setMoves([]);
        setTurn(true);
    };

    const callAPI = async (pieces) => {
        if (turn == true || !pieces || pieces.length === 0) {
            return
        } 
        try {
            const res = await fetch('https://checkersapi-953613013191.us-central1.run.app/move', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pieces: pieces.map(p => ({
                    r: p.r,
                    c: p.c,
                    isKing: p.king,
                    team: p.team === 'GoodPiece' ? 'good' : 'evil'
            })),
            ai_type : aiType
        })
        });
            
            const data = await res.json();
            if (data.error) {
            console.error('API error:', data.error);
            return;
            }
            let {r1, c1, r2, c2} = data.move;
            clickTile(r1, c1);
            await sleep(1000);
            applyAIMove(r1, c1, r2, c2);
        } catch (err) {
            console.error('API error:', err);
        }
    }

    const lastGameIdRef = useRef(gameId);

    useEffect(() => {
        if (gameId !== lastGameIdRef.current) {
            lastGameIdRef.current = gameId;
            return;
        }
        callAPI(pieces);
    }, [turn, gameId]);


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
                    showMoves={showMoves}
                    turn={turn}
                />
            ))}
            
        </div>
    )
}

export default Board