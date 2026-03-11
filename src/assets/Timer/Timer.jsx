import React, {useState, useEffect} from "react";
import "./Timer.css";

function Timer({ isGood, turn, startSeconds, updateWins, resetGame }){

    const [seconds, setSeconds] = useState(startSeconds);

    useEffect(() => {
        let interval = null;
        const myTurn = (isGood && turn) || (!isGood && !turn);

        if (myTurn && seconds > 0) {
            interval = setInterval(() => {
                setSeconds((prev) => prev - 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [turn, seconds, isGood]);

    const formatTime = (totalSeconds) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const winner = isGood ? "Evil" : "Good";

    useEffect(() => {
        if (seconds === 0) {
            updateWins(winner);
            resetGame()
        }
    }, [seconds, winner, updateWins]);



    return(
        <div className={isGood ? "GoodTimer" : "EvilTimer"}>
            <img    className={isGood ? "GoodTimerImage" : "EvilTimerImage"} 
                    src="/icons8-clock-30.png" 
                    alt="Timer Clock"
                    />
            <p id="timerSeconds">
                {formatTime(seconds)}
            </p>
        </div>
    )
}

export default Timer