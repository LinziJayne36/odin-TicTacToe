// create an anonymous closure to hold ALL of the code, keeping the global scope free
(function () {
    'use strict';
    //All other code goes below this line please!

    //This is the Gameboard module: all the UI stuff is in here for now
    const Gameboard = (() => {
        let _board = ["X", "O", "O", "X", "X", "O", "X", "O", "X"];
        const _talkToMe = console.log(`Well, something is working at least. Here's what's inside board array: ${_board}`);
        return {_talkToMe};
    })();//This is the end of the Gameboard module **************************************************************************

    Gameboard._talkToMe;//--------------------------------testing------------------------------


    //This is the Game module: it will control the flow of the game
    const Game = (() => {
        let _whoseTurn = "player1";
        return{_whoseTurn};
    })();//This is the end of the Game module *******************************************************************************

    console.log(Game._whoseTurn);//--------------------------------testing------------------------------

    //This is the player factory function
    const createPlayer = (playerName) => {
        return {playerName}
    }//This is the end of the createPlayer factory***************************************************************************

    
    //This is an example player object that's hardcoded for now for testing
    const player1 = createPlayer("Linzi");//--------------------------------testing------------------------------

    console.log(player1.playerName);//--------------------------------testing------------------------------

    //This is a second example player object that's hardcoded for now for testing

    const player2 = createPlayer("Zachary");//--------------------------------testing------------------------------
    console.log(player2.playerName);//--------------------------------testing------------------------------








}()) ;//This is the end of the enclosing anonyomus closure (wraps all the code)