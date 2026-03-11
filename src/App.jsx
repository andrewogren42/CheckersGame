import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Board from './board';
import ScoreBoard from './assets/ScoreBoard/ScoreBoard';
import PlayerInfo from './assets/PlayerInfo/PlayerInfo';
import SideBar from './assets/SideBar/SideBar';
import Rules from './assets/Rules/Rules';

function App() {

  const startingTiles = [ 
            { r: 0, c: 1, team: 'EvilPiece', king: false }, { r: 0, c: 3, team: 'EvilPiece', king: false }, { r: 0, c: 5, team: 'EvilPiece', king: false }, { r: 0, c: 7, team: 'EvilPiece', king: false },
            { r: 1, c: 0, team: 'EvilPiece', king: false }, { r: 1, c: 2, team: 'EvilPiece', king: false }, { r: 1, c: 4, team: 'EvilPiece', king: false }, { r: 1, c: 6, team: 'EvilPiece', king: false },
            { r: 2, c: 1, team: 'EvilPiece', king: false }, { r: 2, c: 3, team: 'EvilPiece', king: false }, { r: 2, c: 5, team: 'EvilPiece', king: false }, { r: 2, c: 7, team: 'EvilPiece', king: false },
            { r: 5, c: 0, team: 'GoodPiece', king: false }, { r: 5, c: 2, team: 'GoodPiece', king: false }, { r: 5, c: 4, team: 'GoodPiece', king: false }, { r: 5, c: 6, team: 'GoodPiece', king: false },
            { r: 6, c: 1, team: 'GoodPiece', king: false }, { r: 6, c: 3, team: 'GoodPiece', king: false }, { r: 6, c: 5, team: 'GoodPiece', king: false }, { r: 6, c: 7, team: 'GoodPiece', king: false },
            { r: 7, c: 0, team: 'GoodPiece', king: false }, { r: 7, c: 2, team: 'GoodPiece', king: false }, { r: 7, c: 4, team: 'GoodPiece', king: false }, { r: 7, c: 6, team: 'GoodPiece', king: false },
                        ]

  const [pieces, setPieces] = useState(startingTiles);
  const [SideBarOpen, setSideBarOpen] = useState(false);
  const [turn, setTurn] = useState(true);

  const [startSeconds, setStartSeconds] = useState(600);
  const [isDarkMode, setDarkMode] = useState(false);

  const [gameId, setGameId] = useState(0);

  const [gameWon, setGameWon] = useState([0, 0, 0]);

  const [redPieceCount, setRedPieceCount] = useState(12);
  const [blackPieceCount, setBlackPieceCount] = useState(12);

  const [showMoves, setShowMoves] = useState(true);

  const [movesWithoutCapture, setMovesWithoutCapture] = useState(0);

  const [position, setPosition] = useState([]);

  const [showRules, setShowRules] = useState(false);

  const [aiType, setAiType] = useState("MCTS");

  const updateRedCount = (amount) => {
    setRedPieceCount(prev => {
      return prev - amount;
    });
  }

  const updateBlackCount = (amount) => {
    setBlackPieceCount(prev => {
      return prev - amount;
    });
  }

  const updateWins = (winner) => {
    setGameWon(prev => {
      const[good, evil, tie] = prev;
      if (winner === "Good") {
        return [good + 1, evil, tie];
      } else if (winner === "Evil") {
        return [good, evil + 1, tie];
      } else {
        return [good, evil, tie + 1];
      }
    });
  }

  const resetScore = () => {
    setGameWon([0, 0, 0]);
  }

  const resetGame = () => {
      setPieces(startingTiles);
      setTurn(true);
      setGameId(prev => prev + 1);
      setRedPieceCount(12); 
      setBlackPieceCount(12);
      setMovesWithoutCapture(0);
      setPosition([]);
  };

  const addToPosition = (currPosition) => {
    setPosition(prev => [...prev, currPosition]);
  }

  const toggleShowRules = () => {
    setShowRules(!showRules);
  }

  useEffect(() => {
    if (redPieceCount <= 0){
      updateWins("Evil");
      resetGame();
    } else if (blackPieceCount <= 0) {
      updateWins("Good");
      resetGame();
    }
  }, [redPieceCount, blackPieceCount])

  useEffect(() => {
    if (movesWithoutCapture === 80) {
      updateWins("Tie");
      resetGame();
    }
  }, [movesWithoutCapture])

  useEffect(() => {
    if (position.length < 3) {
      return;
    }

    const currBoard = position[position.length - 1];

    const occurrences = position.filter(p => p === currBoard).length;
    if (occurrences >= 3) {
      updateWins("Tie");
      resetGame();
    }
  }, [position])

  return (
    <div id='App' className={isDarkMode ? "Dark" : "Light"}>
      {showRules ? <Rules 
                      toggleShowRules={toggleShowRules}
                    /> : null }
      <ScoreBoard 
        setSideBarOpen={setSideBarOpen}
        gameWon={gameWon}
        isDarkMode={isDarkMode}
      />
      <SideBar 
        SideBarOpen={SideBarOpen}
        setSideBarOpen={setSideBarOpen}
        startSeconds={startSeconds}
        setStartSeconds={setStartSeconds}
        isDarkMode={isDarkMode}
        setDarkMode={setDarkMode}
        resetGame={resetGame}
        resetScore={resetScore}
        showMoves={showMoves}
        setShowMoves={setShowMoves}
        toggleShowRules={toggleShowRules}
        aiType={aiType}
        setAiType={setAiType}
      />
      <PlayerInfo
        isGood={false}
        turn={turn}
        startSeconds={startSeconds}
        gameId={gameId}
        updateWins={updateWins}
        resetGame={resetGame}
        isDarkMode={isDarkMode}
      />
      <Board
        pieces={pieces}
        setPieces={setPieces}
        turn={turn}
        setTurn={setTurn}
        updateBlackCount={updateBlackCount}
        updateRedCount={updateRedCount}
        showMoves={showMoves}
        setMovesWithoutCapture={setMovesWithoutCapture}
        addToPosition={addToPosition}
        setPosition={setPosition}
        aiType={aiType}
      />
      <PlayerInfo 
        isGood={true}
        turn={turn}
        startSeconds={startSeconds}
        gameId={gameId}
        updateWins={updateWins}
        resetGame={resetGame}
        isDarkMode={isDarkMode}
      />
      <div id='BottomSpacing'></div>
    </div>
  )
}

export default App
