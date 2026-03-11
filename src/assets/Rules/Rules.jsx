import React from "react";
import "./Rules.css";


function Rules({ toggleShowRules }) {


    return (
        <div id="Rules">
            <div id="rulesContent">
                <button id="closeRules" onClick={toggleShowRules}>Close</button>
                <div>
                    <h2 className="RulesHeading">Checkers Rules</h2>
                    <p>Checkers is a two player game, in this case will be between a player with red,
                        you, and the AI in black. Make a move by selecting a piece and choosing one of
                        the valid moves for it to go. A piece can either move by sliding, moving to a 
                        square directly diagonal to itself, or by jumping an opponenets piece. When a piece jumps
                        an opponents piece by doing so you capture their piece. When you capture someones piece
                        You are able to jump another piece, if it is a valid move in the same turn. At the beginning
                        of the game none of the pieces are kings. This means they can only move towards the otherside
                        of the board from where they started in the squares diagonal to where they are now. By reaching
                        the farthest row from the starting position, pieces promote to a king and gain the ability
                        to move diagonally in all four directions not just forward right and left. In this version
                        of chess if you capture pieces and land on a tile that will promote you piece to a king you will
                        be able to immediately use the new moving capabilites and jump pieces in all directions in the
                        same turn.
                    </p>
                    <h2 className="RulesHeading">Win Conditions</h2>
                    <p>To win the game of checkers there are three ways to do so: 
                        <ul>First, by capturing all of your opponents pieces you win</ul>
                        <ul>Second, by blocking all of you opponents moves so they have no valid moves you win</ul>
                        <ul>Thirdly, if your opponents timer runs out you win.</ul>
                         To lose would be the inverse version of all of these.
                        To tie there are three ways to do so:
                        <ul>First, make 80 moves, 40 by red, 40 by black, without advancement (a non-king moving, a piece being promoted, of a piece being captured)</ul> 
                        <ul>Second, repeating the same position three times</ul>
                        <ul>Thirdly, if there are insufficent pieces (one king per team)</ul>
                    </p>
                    <h2 className="RulesHeading">AI Opponent</h2>
                    <p>There are two options to play against on this website. The first is the Alphazero Monte Carlo Tree Search
                        AI. What this AI does is it takes a given state simulated all given moves and sees which moves lead to the most wins.
                        The AlphaZero adaptation of this is having the AI learn a win percentage for a given state of Checkers and using
                        that to only look and moves that lead to good results and more wins. The Alpha Beta pruning AI uses a minimax algorithm 
                        which looks ahead a set number of moves and assumes both players are playing optimally — it tries to maximize its own score 
                        while minimizing yours. Alpha Beta pruning makes this faster by skipping branches of the game tree that can't possibly lead 
                        to a better outcome than what's already been found, allowing it to search deeper in the same amount of time.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Rules
