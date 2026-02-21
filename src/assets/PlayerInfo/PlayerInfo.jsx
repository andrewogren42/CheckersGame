import React from "react";
import "./PlayerInfo.css";
import Timer from "../Timer/Timer";

function PlayerInfo({ isGood }) {

    return(
        <div className="PlayerInfo">
            <h2 
                className={isGood ? "GoodPlayer" : "EvilPlayer"}>
                    {isGood ? "Heroic Chess Player" : "Evil Chess Player"}
            </h2>
            <Timer 
                isGood={isGood}
            />

        </div>
    )
}

export default PlayerInfo