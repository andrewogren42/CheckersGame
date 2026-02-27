import React from "react";
import "./PlayerInfo.css";
import Timer from "../Timer/Timer";

function PlayerInfo({ isGood, turn, startSeconds, gameId, updateWins, resetGame }) {

    return(
        <div className="PlayerInfo">
            <h2 
                className={isGood ? "GoodPlayer" : "EvilPlayer"}>
                    {isGood ? "Heroic Chess Player" : "Evil Chess Player"}
            </h2>
            <Timer
                key={`${gameId}-${startSeconds}`}
                isGood={isGood}
                turn={turn}
                startSeconds={startSeconds}
                updateWins={updateWins}
                resetGame={resetGame}
            />

        </div>
    )
}

export default PlayerInfo