import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Board from './board'
import ScoreBoard from './assets/ScoreBoard/ScoreBoard'
import PlayerInfo from './assets/PlayerInfo/PlayerInfo'
import SideBar from './assets/SideBar/SideBar'

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

  return (
    <div>
      <ScoreBoard 
        setSideBarOpen={setSideBarOpen}
      />
      <SideBar 
        SideBarOpen={SideBarOpen}
        setSideBarOpen={setSideBarOpen}
        setPieces={setPieces}
        startingTiles={startingTiles}
      />
      <PlayerInfo
        isGood={false}
      />
      <Board
        pieces={pieces}
        setPieces={setPieces}
      />
      <PlayerInfo 
        isGood={true}
      />
    </div>
  )
}

export default App
