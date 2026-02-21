import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Board from './board'
import ScoreBoard from './assets/ScoreBoard/ScoreBoard'
import PlayerInfo from './assets/PlayerInfo/PlayerInfo'

function App() {

  return (
    <div>
      <ScoreBoard />
      <PlayerInfo
        isGood={false}
      />
      <Board/>
      <PlayerInfo 
        isGood={true}
      />
    </div>
  )
}

export default App
