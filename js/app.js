// create an anonymous closure to hold ALL of the code, keeping the global scope free
(function () {
    'use strict';
    //All other code goes below this line please!

    //This is the Gameboard module: all the UI stuff is in here for now
    const gameBoard = (() => { //*****************************************************************************************


        let board = ["X", "O", "O", "X", "X", "O", "X", "O", "X"];
        let randomPhrase = "One in the hand's worth two in the bush";
        const talkToMe = () => console.log(`Well, something is working at least.Here's the board contents: ${board}`);

        //create & render the grid in the UI
        const createBoard = ( () => {
            const numOfDivs = 3*3;
            const gridContainer = document.getElementById('gbGridContainer');
            function createDivs() {
                const jsDivs = document.createElement('div');
                gridContainer.appendChild(jsDivs);
                jsDivs.setAttribute('class', 'squares');
            }
            for (let i = 0; i < numOfDivs; i++) {
                createDivs();
            }
        })
        createBoard();

        //create & insert the form for player names to be entered
        const insertPlayerNameForm = ( () => {
            const linebreak = document.createElement('br');
            const formWrapper = document.createElement('div');
            const main = document.getElementById('main');
            main.appendChild(formWrapper);
            formWrapper.setAttribute('class', 'formWrapper');
            const playerXLabel = document.createElement('label');
            playerXLabel.setAttribute('for', 'name');
            playerXLabel.innerHTML = "Player X: ";
            formWrapper.appendChild(playerXLabel);
            const playerXInput = document.createElement('input');
            playerXInput.setAttribute('id', 'name');
            playerXInput.setAttribute('name', 'name');
            playerXInput.setAttribute('type', 'text');
            formWrapper.appendChild(playerXInput);

            formWrapper.appendChild(linebreak.cloneNode());
            formWrapper.appendChild(linebreak.cloneNode());

            const playerOLabel = document.createElement('label');
            playerOLabel.setAttribute('for', 'name');
            playerOLabel.innerHTML = "Player O: ";
            formWrapper.appendChild(playerOLabel);
            const playerOInput = document.createElement('input');
            playerOInput.setAttribute('id', 'name');
            playerOInput.setAttribute('name', 'name');
            playerOInput.setAttribute('type', 'text');
            formWrapper.appendChild(playerOInput);

            formWrapper.appendChild(linebreak.cloneNode());

            const enterBtn = document.createElement('button');
            enterBtn.setAttribute('type', 'button');
            enterBtn.setAttribute('id', 'enterBtn');
            enterBtn.setAttribute('style', 'padding-left: 16px; padding-right: 16px; margin-top: 6px;');
            enterBtn.innerHTML = "ENTER";
            formWrapper.appendChild(enterBtn);
        });
        insertPlayerNameForm();

        return {insertPlayerNameForm, talkToMe, randomPhrase};
    })();//This is the end of the Gameboard module **************************************************************************

   // gameBoard.talkToMe(); //----------------------------TEST-----------------------------


    //This is the Game module: it will control the flow of the game
    const game = (() => {
        let whoseTurn = "player1";
        gameBoard.talkToMe();//This is how you call functions that are returned from other modules
        const sayTurn = () => console.log(whoseTurn,gameBoard.randomPhrase);
        console.log(gameBoard.randomPhrase);
        return {sayTurn};
    })();//This is the end of the Game module *******************************************************************************

    game.sayTurn(); //----------------------------TEST-----------------------------------
    
    //This is the player factory function
    const createPlayer = (playerName) => {
        return {playerName};
    }//This is the end of the createPlayer factory***************************************************************************

    
    //This is an example player object that's hardcoded for now for testing
    const player1 = createPlayer("Linzi");//--------------------------------testing------------------------------

    console.log(player1.playerName);//--------------------------------testing------------------------------

    //This is a second example player object that's hardcoded for now for testing

    const player2 = createPlayer("Zachary");//--------------------------------testing------------------------------
    console.log(player2.playerName);//--------------------------------testing------------------------------








}()) ;//This is the end of the enclosing anonyomus closure (wraps all the code)