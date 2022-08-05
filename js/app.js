// create an anonymous closure to hold ALL of the code, keeping the global scope free
(function () {// -------------------------START----------------------------------------------------------------------------
    'use strict';
    //All other code goes below this line please!


    //This is the factory func for creating player objects*****************************************************************
    const createPlayer = (playerName) => {
        const playersName = playerName;
        let playersMarker;
        const selectPosition = () => {
            console.log("for now we just say i can make a choice...")
        }
        return {playersName, playersMarker, selectPosition};
    }//This is the end of the createPlayer() factory function ************************************************************



    //These are the player objects themselves*****************************************************************************
    const playerXobj = createPlayer("Player X");
    playerXobj.playersMarker = "X";
    const playerOobj = createPlayer("Player O");
    playerOobj.playersMarker = "O";
    console.log(`PlayerO has a marker of: ${playerOobj.playersMarker}`);
    console.log(`Player X has a marker of: ${playerXobj.playersMarker}`);
    //********************************************************************************************************************









    //This is the Gameboard module: all the UI stuff is in here for now
    const gameBoard = (() => { //*****************************************************************************************
        let board = ["X", " ", " ", " ", " ", " ", " ", " ", " "];
        let randomPhrase = "One in the hand's worth two in the bush";
        const talkToMe = () => console.log(`Well, something is working at least.Here's the board contents: ${board}`);
        function accessBoard() {//making the board data available without exposing board variable
            return board;
        }
        //create & render the grid in the UI
        const boardGrid = ( () => {
            const numOfDivs = 3*3;
            let jsDivs;
            const gridContainer = document.getElementById('gbGridContainer');
            function createDivs() {
                jsDivs = document.createElement('div');
                gridContainer.appendChild(jsDivs);
                jsDivs.setAttribute('class', 'squares');
            }
            for (let i = 0; i < numOfDivs; i++) {
                //console.log(`created another grid div: ${i}`);
                createDivs();
                jsDivs.setAttribute('id', `${i}`);
            }
        })
        boardGrid();//renders here rather than in display module to reduce coupling
        return {talkToMe, randomPhrase, accessBoard};
    })();//This is the end of the Gameboard module **************************************************************************

   







   //This is the display module: it will control what is displayed in th UI 
   const display = (() => {//*************************************************************************************************
    //console.log(gameBoard.accessBoard);//just testing access to gameBoard module
    const createStartBtn = () => {
        const startBtnWrapper = document.getElementById('startBtnWrapper');
        const startBtn = document.createElement('button');
        startBtn.setAttribute('id', 'startBtn');
        startBtn.setAttribute('type', 'button');
        startBtn.setAttribute('style', 'padding-left: 16px; padding-right: 16px; margin-top: 6px;');
        startBtn.innerHTML = "START";
        startBtnWrapper.appendChild(startBtn);
        //startBtn.onclick = () => game.startGame(); //references the getPlayer function in game module that has been exposed
        startBtn.addEventListener('click', (e) => {
            console.log("start btn got clicked");
            game.startGame();
        });

    }
    createStartBtn();

    const writeMove = (marker, position) => {
        let writeMarker = marker;//players marker...x or o
        let writePosition = position;//id num of players chosen sq to mark
        //let writeBoard = gameBoard.accessBoard();
        //let [sq0, sq1, sq2, sq3, sq4, sq5, sq6, sq7, sq8] = writeBoard;
        //console.log(`sq3 says: ${sq3}`);
        
        console.log("writeMove function fired");
        let writeSq = document.getElementById(`${writePosition}`);
        writeSq.innerHTML = `X`;
    }
    //writeMove();

    const insertPlayerNameForm = ( () => {
        const linebreak = document.createElement('br');
        const formWrapper = document.createElement('div');
        const main = document.getElementById('main');
        main.appendChild(formWrapper);
        formWrapper.setAttribute('class', 'formWrapper');
        const playerXLabel = document.createElement('label');
        playerXLabel.setAttribute('for', 'nameX');
        playerXLabel.innerHTML = "Player X: ";
        formWrapper.appendChild(playerXLabel);
        const playerXInput = document.createElement('input');
        playerXInput.setAttribute('id', 'nameX');
        playerXInput.setAttribute('name', 'nameX');
        playerXInput.setAttribute('type', 'text');
        formWrapper.appendChild(playerXInput);
        formWrapper.appendChild(linebreak.cloneNode());
        formWrapper.appendChild(linebreak.cloneNode());
        const playerOLabel = document.createElement('label');
        playerOLabel.setAttribute('for', 'nameO');
        playerOLabel.innerHTML = "Player O: ";
        formWrapper.appendChild(playerOLabel);
        const playerOInput = document.createElement('input');
        playerOInput.setAttribute('id', 'nameO');
        playerOInput.setAttribute('name', 'nameO');
        playerOInput.setAttribute('type', 'text');
        formWrapper.appendChild(playerOInput);
        formWrapper.appendChild(linebreak.cloneNode());
        const enterBtn = document.createElement('button');
        enterBtn.setAttribute('type', 'button');
        enterBtn.setAttribute('id', 'enterBtn');
        enterBtn.setAttribute('style', 'padding-left: 16px; padding-right: 16px; margin-top: 6px;');
        enterBtn.innerHTML = "ENTER";
        formWrapper.appendChild(enterBtn);
        enterBtn.onclick = () => game.getPlayer(); //references the getPlayer function in game module that has been exposed
    });
    insertPlayerNameForm();

    

    //Return statement will go here
    return {writeMove};
    
   })();//End of display module **********************************************************************************************








    //This is the Game module: it will control the flow of the game **********************************************************
    const game = (() => {

       

        let whoseTurn;//hardcoded for now
        let currentMarker = playerXobj.playersName; //hardcoded for now
        gameBoard.talkToMe();//This is how you call functions that are returned from other modules
        //const sayTurn = () => console.log(whoseTurn,gameBoard.randomPhrase);
        console.log(gameBoard.randomPhrase);
        const getPlayer = () => {
            //code to grab player names from form goes in here...
            let playerXName = document.getElementById('nameX').value;
            let playerOName = document.getElementById('nameO').value;
            console.log(`Player X Name is: ${playerXName}`);
            console.log(`Player O Name is: ${playerOName}`);
            //This is better! We are updating the objects rather than creating them here...
            playerOobj.playersName = playerOName;
            playerXobj.playersName = playerXName;
            console.log(`Did it work? If so, then player O is: ${playerOobj.playersName} and player X is: ${playerXobj.playersName} `);
           
        }

        const startGame = () => {
            //fires when start button is clicked...
            whoseTurn = playerXobj.playersName;
            console.log(`Game has started: ${whoseTurn} take your turn`);//in practice, this will call the display module to write the message to screen
            
        }

        const setMove = () => {
            let currentPlayer = whoseTurn; 
            console.log(currentPlayer);
            let marker = currentMarker; 
            console.log(`The marker of the player whose turn it is: ${marker}`);
            const positions = document.querySelectorAll('.squares');
            console.log(positions);
            positions.forEach((position) => {
                position.addEventListener('click', (e) => {
                    let playerSelected = position.id;
                    console.log(`Is this the clicked elements id? : ${playerSelected}`);
                    let checked = checkVacant(playerSelected);
                    if (checked) {
                        console.log("Yay, it's free");
                        display.writeMove(`${marker}`, `${playerSelected}`);
                        //display.writeMove(marker, playerSelected);
                        //return true; //true that player has played their move
                    } else {
                        console.log("Nope, not free");
                    }

                });
            });
        }

        setMove();

        function checkVacant(sq) {
            let isVacant;
            //1. Access board array via gameBoard module's exposed accessBoard() 
            let boardContents = gameBoard.accessBoard();
            console.log(`boardContents successfully grabbed?...${boardContents}`);
            if (boardContents[sq] == " ") {
                isVacant = true;
                return isVacant;
            } else {
                isVacant = false;
                return isVacant;
            }
        }


        return {getPlayer, startGame};
    })();//This is the end of the Game module *******************************************************************************

    




}()) ;//This is the end of the enclosing anonyomus closure -----------------END------------------------------------------------------------