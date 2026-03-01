import React from "react";
import "./Rules.css";


function Rules({ toggleShowRules }) {


    return (
        <div id="Rules">
            <div id="rulesContent">
                <button id="closeRules" onClick={toggleShowRules}>Close</button>
                <div>
                    <h2>Checkers Rules</h2>
                    <p>The game of Checkers, also known as Draughts, is a classic strategy board 
                        game played between two players on an eight-by-eight grid of alternating 
                        dark and light squares. The primary objective is to either capture all of 
                        your opponent's pieces or to block them so completely that they have no legal 
                        moves remaining. Each player begins with twelve pieces, placed on the thirty-two
                        dark squares of the three rows closest to them. In your implementation, these
                        are identified as the GoodPiece and EvilPiece teams. Movement is strictly 
                        diagonal; regular pieces, often called Men, can only move forward into an
                        unoccupied adjacent dark square. If an opponent's piece is in an adjacent
                        diagonal square and the square immediately beyond it is empty, a jump is
                        mandatory. Capturing is a forced action in standard rules; if you have
                        the opportunity to jump, you must take it. If that same piece can make
                        another jump from its new position, it must continue until no more jumps are 
                        possible, which is referred to as a multi-jump sequence.  When a piece reaches 
                        the farthest row from its starting position, known as the king row, it is 
                        immediately promoted and crowned as a King. Promotion is a game-changing event 
                        because Kings gain the ability to move and jump both forward and backward, 
                        drastically increasing their reach and defensive capabilities. In the logic 
                        you are developing, a game can also end in a draw through two main mechanical 
                        conditions: Threefold Repetition and the Move Rule. A Threefold Repetition draw 
                        occurs when the exact same board configuration—meaning every piece is on the 
                        same square with the same status and it is the same player's turn—appears 
                        three times during the match. This prevents players from infinitely cycling 
                        their Kings to avoid engagement. Separately, the Move Rule (often called the
                        forty-move rule) dictates that if a specific number of moves occur without 
                        progress—defined in your system as a capture or a promotion—the game is 
                        declared a tie to prevent stalemates. Additionally, a player wins by "blockade" 
                        if their opponent still has pieces on the board but those pieces are trapped 
                        and cannot move into any valid square. Understanding the "double corner" and 
                        the "bridge" is essential for advanced play, as these configurations can 
                        protect your back line from being infiltrated by enemy Kings. By tracking 
                        every board state as a stringified snapshot and monitoring the moves since 
                        the last capture or promotion, your software ensures that these complex 
                        end-game scenarios are handled with the same precision as a professional 
                        tournament. This continuous flow of text serves to demonstrate the capacity
                        of your user interface to handle long-form instructional content while 
                        maintaining readability and proper scroll-bar behavior within your layout.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Rules
