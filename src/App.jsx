import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Board from './board';
import ScoreBoard from './assets/ScoreBoard/ScoreBoard';
import PlayerInfo from './assets/PlayerInfo/PlayerInfo';
import SideBar from './assets/SideBar/SideBar';
import Rules from './assets/Rules/Rules';
import { startingTiles, startingAllKings } from './constants';

function App() {

  const [pieces, setPieces] = useState(startingTiles.map(p => ({...p})));
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
  const [isAllKings, setIsAllKings] = useState(false);

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
      setPieces(startingTiles.map(p => ({...p})));
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

  useEffect(() => {
    if (isAllKings) {
      resetGame();
      setPieces(startingAllKings.map(p => ({...p})))
    }
  }, [isAllKings]);

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
        isAllKings={isAllKings}
        setIsAllKings={setIsAllKings}
      />
      <div id='TopSpacing'></div>
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
        resetGame={resetGame}
        updateWins={updateWins}
        gameId={gameId}
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
