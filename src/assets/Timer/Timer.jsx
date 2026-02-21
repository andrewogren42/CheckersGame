import React from "react";
import "./Timer.css";

function Timer({ isGood }){

    return(
        <div className={isGood ? "GoodTimer" : "EvilTimer"}>
            <img    className={isGood ? "GoodTimerImage" : "EvilTimerImage"} 
                    src="/icons8-clock-30.png" 
                    alt="Timer Clock"
                    width={40} 
                    height={40}/>
            <p>10:00</p>
        </div>
    )
}

export default Timer