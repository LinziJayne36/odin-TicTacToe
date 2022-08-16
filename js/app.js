// create an anonymous closure to hold ALL of the code, keeping the global scope free
(function () {// -------------------------START----------------------------------------------------------------------------
    'use strict';
    //All other code goes below this line please!


    //This is the factory func for creating player objects*****************************************************************
    const createPlayer = (playerName) => {
        const playersName = playerName;
        let defaultName;
        let playersMarker;
        const selectPosition = () => {
            console.log("for now we just say i can make a choice...")
        }
        return {playersName, playersMarker, defaultName, selectPosition};
    }//This is the end of the createPlayer() factory function ************************************************************



    //These are the player objects themselves*****************************************************************************
    const playerXobj = createPlayer("Player X");
    playerXobj.playersMarker = "X";
    playerXobj.defaultName = "Player X";
    const aiObj = createPlayer("AI");
    aiObj.playersMarker = "O";
    aiObj.defaultName = "AI";
    console.log(`PlayerO has a marker of: ${aiObj.playersMarker}`);
    console.log(`Player X has a marker of: ${playerXobj.playersMarker}`);
    //********************************************************************************************************************




    //This is the Gameboard module: all the UI stuff is in here for now
    const gameBoard = (() => { //*****************************************************************************************
        let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        function accessBoard() {//making the board data available without exposing board variable - for other code that needs to read but not change its data
            return board;
        }

        const emptyBoardArray = () => {
            board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
        }

        const updateBoardArray = (positionTaken, marker) => {
            let updatePosition = positionTaken;
            let updateMarker = marker;
            console.log(`the function to update board array is running and awaiting further instructions...`);
            console.log(`this function was sent the position: ${updatePosition}, and the marker: ${updateMarker}`);
            board[updatePosition] = updateMarker;
            console.log(board);
        }

        //create & render the grid in the UI
        const boardGrid = ( () => {
            const numOfDivs = 3*3;
            let jsDivs;
            const gridContainer = document.getElementById('gbGridContainer');
            function createDivs() {
                jsDivs = document.createElement('div');
                gridContainer.appendChild(jsDivs);
                gridContainer.setAttribute('style', 'border-right: solid; border-bottom: solid; border-color: rgb(248, 246, 246); border-width: 0.5px;');
                jsDivs.setAttribute('class', 'squares');
                
            }
            for (let i = 0; i < numOfDivs; i++) {
                //console.log(`created another grid div: ${i}`);
                createDivs();
                jsDivs.setAttribute('id', `${i}`);
            }
            
        })
       // boardGrid();
        return {accessBoard, updateBoardArray, emptyBoardArray, boardGrid};
    })();//This is the end of the Gameboard module **************************************************************************

   

   //This is the display module: it will control what is displayed in th UI 
   const display = (() => {//*************************************************************************************************
    const createStartBtn = (text="START") => {
        const btnTxt = text;
        const startBtnWrapper = document.getElementById('gbGridContainer');
        const startBtn = document.createElement('button');
        startBtn.setAttribute('id', 'startBtn');
        startBtn.setAttribute('type', 'button');
        startBtn.setAttribute('style', 'padding-left: 16px; padding-right: 16px; margin-top: 6px;');
        startBtn.innerHTML = `${btnTxt}`;
        startBtnWrapper.appendChild(startBtn);
        startBtn.addEventListener('click', (e) => {
            game.playGame();
        });

    }
    createStartBtn('START');

    const removeStartBtn = () => {
        const rmvStartBtn = document.getElementById('startBtn');
        rmvStartBtn.remove();
    }

    const writeMove = (marker, position) => {
        let writeMarker = marker;//players marker...x or o
        let writePosition = position;//id num of players chosen sq to mark
        console.log("writeMove function fired");
        let writeSq = document.getElementById(`${writePosition}`);
        writeSq.innerHTML = writeMarker;
    }

    const showTurnMsg = (currentName) => {
        const turnName = currentName;
        console.log(`Hey ${turnName}, it is your turn now`);
        const msgArea = document.getElementById('msgWrapper');
        const yourTurnMsg = document.createElement('div');
        yourTurnMsg.setAttribute('id', 'turnMsgTxt');
        msgArea.appendChild(yourTurnMsg);
        yourTurnMsg.innerHTML = `${turnName}'s turn...`;
    }

    const removeTurnMsg = () => {
        const rmvTurnMsg = document.getElementById('msgWrapper');
        rmvTurnMsg.innerHTML = '';
    }

    const displayNotVacant =() => {
        console.log("Hey dude! That one is already taken. Try another square...");
        const msgArea = document.getElementById('msgWrapper');
        const notVacantMsg = document.createElement('div');
        notVacantMsg.setAttribute('id', 'vacancyTxt');//for styling css
        msgArea.appendChild(notVacantMsg);
        notVacantMsg.innerHTML = "OCCUPIED! TRY AGAIN...";
    }

    const removeVacancyMsg = () => {
        const rmvVacancyMsg = document.getElementById('vacancyTxt');
        rmvVacancyMsg.innerHTML = ''; 
    }

    const declareResultMsg = (gameResult) => {
    
        const endResult = gameResult;
        let msgTxt;
        if (endResult === 'xWon') {
            msgTxt = 'GAME OVER! Player X WINS!'
        } else if (endResult === 'oWon') {
            msgTxt = 'GAME OVER! AI WINS!'
        } else if (endResult === 'tie') {
            msgTxt = 'GAME OVER! It was a tie!'
        }
        const resultMsgArea = document.getElementById('msgWrapper');
        const resultMsg = document.createElement('div');
        resultMsg.setAttribute('id', 'resultsMsg');
        resultMsgArea.appendChild(resultMsg);
        //resultMsgArea.innerHTML = '';
        resultMsg.innerHTML = ` ${msgTxt}`;
    }

    const removeResultMsg = () => {
        const rmvResultMsg = document.getElementById('msgWrapper');
        rmvResultMsg.innerHTML = '';

    }
   

    const clearBoard = () => {
        console.log('func to clear board ui was called');
        let clearId = 0;//id's of squares directly correspond to array indexes 0-9 so if we can grab squares with an id through 0-9 we can access the inner html
        const clearSquares = document.querySelectorAll('.squares');
        const grid = document.getElementById('gbGridContainer');

        for (let i = 0; i < clearSquares.length; i++) {
            
            let rmvMarker = document.getElementById(`${clearId}`);
            setTimeout(function() {
                rmvMarker.innerHTML = '';
                grid.innerHTML = '';
                grid.setAttribute('style', 'border-right: none; border-bottom: none;');
            }, 4000);
            clearId++;
            
        }
        
    }

    
    
/*
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
*/
    //Return statement will go here
    return {writeMove, createStartBtn, showTurnMsg, removeTurnMsg, displayNotVacant, removeVacancyMsg, declareResultMsg, removeResultMsg, removeStartBtn, clearBoard};
    
   })();//End of display module **********************************************************************************************


    //This is the Game module: it will control the flow of the game **********************************************************
    const game = (() => {
        let gameResult = 'inPlay';// inPlay means still playing | win means win | tie means tie!
        let currentMarker = playerXobj.playersName; //hardcoded for now
        if (currentMarker == playerXobj.playersName) {
            currentMarker = playerXobj.playersMarker;
        }
        else {
            currentMarker = aiObj.playersMarker;
        }
       
        /*const getPlayer = () => {
            //code to grab player names from form 
            let playerXName = document.getElementById('nameX').value;
            let playerOName = document.getElementById('nameO').value;
            console.log(`Player X Name is: ${playerXName}`);
            console.log(`Player O Name is: ${playerOName}`);
            //This is better! We are updating the objects rather than creating them here...
            playerOobj.playersName = playerOName;
            playerXobj.playersName = playerXName;
            console.log(`Did it work? If so, then player O is: ${playerOobj.playersName} and player X is: ${playerXobj.playersName} `);
           
        }*/

        let aiSelection = () => {
            let randomSq = Math.floor(Math.random()*9);
            return randomSq;
        }

  let whoseTurn = playerXobj.playersName;//Player x always goes first...
        const playGame = () => {
            //fires when start button is clicked...
          
           gameBoard.boardGrid();
           display.removeStartBtn();
           console.log(`Game has started: ${whoseTurn} take your turn`);//in practice, this will call the display module to write the message to screen
           // display.showTurnMsg(whoseTurn);//call function to display take your turn message
            setMove(whoseTurn);
            //console.log(whoseTurn);

            //whoseTurn is just for telling setMove who is going first...
        }

        const setMove = (turn) => {
            let currentPlayer = turn; 
            console.log(currentPlayer);
            let marker = currentMarker; 
            console.log(`The marker of the player whose turn it is: ${marker}`);
            const positions = document.querySelectorAll('.squares');
            console.log(positions);
            display.showTurnMsg(whoseTurn);//call function to display take your turn message
            
                positions.forEach((position) => {
                
                    position.addEventListener('click', (e) => {
                        let playerSelected = position.id;
                        console.log(`Is this the clicked elements id? : ${playerSelected}`);
                        let checked = checkVacant(playerSelected);
                        if (checked) {
                            console.log("Yay, it's free");
                            display.writeMove(`${marker}`, `${playerSelected}`);
                            display.removeTurnMsg();
                            display.removeTurnMsg();
                           //Pass playerSelected variable as the positionTaken arg,and marker variable as the markerPlaced arg...
                            gameBoard.updateBoardArray(playerSelected, marker);
                            //TODO call function to check for win or tie: call it checkResult()
                           // console.log(gameResult);
                            gameResult = checkResult();//value is returned from checkResult to this variable. Either 'oWin' 'xWin' or 'tie'
                            console.log(gameResult);
                            if (gameResult === 'xWon' || gameResult === 'oWon' || gameResult === 'tie') {
                                //TODO write and call a function: endGame()
                                endGame(gameResult);
                                setTimeout(function() {
                                    
                                    display.createStartBtn('REPLAY');
                                    display.removeResultMsg();
                                }, 4400);
                                
                            } else {
                                //somehow switch player and do the turn again :o
                                console.log("game continues....");
                                //save return value of togglePlayer to currentPlayer
                                currentPlayer = togglePlayer(currentPlayer);
                                console.log(`was the return value passed ok: ${currentPlayer}`);
                                display.showTurnMsg(currentPlayer);//call function to display take your turn message
                                marker = updateMarker(currentPlayer);
                                if (currentPlayer === "AI") {
                                    console.log("AI should take its turn now");
                                    let aiChoice = aiSelection();
                                    console.log(`AI chose square: ${aiChoice}`);
                                   //need to check if square is free and if not, choose again
                                   const boardCheck = gameBoard.accessBoard();
                                   if (boardCheck[aiChoice]!=" ") {
                                        aiChoice = aiSelection();
                                        console.log('the first if condition for checking ai move said the square is occupied ');
                                   } else {
                                    console.log(`square no. ${aiChoice} is free to make the move`);
                                    setTimeout(function() {
                                        display.writeMove("O", aiChoice);
                                    }, 1500);
                                    display.removeTurnMsg();
                                    
                                   }
                                   //if square is free, get AI to place marker on that square
                                   
                                }
                                
                            }
    
                        } else {
                            console.log("Nope, not free");
                            //TODO:write and call a function display.writeNotVacantMsg
                            display.displayNotVacant();
                        }
                       
    
                    });
                });
            

            
        }

        const checkResult = () => {
            const boardResult = gameBoard.accessBoard();
            console.log(boardResult);
            let xWin = ['X','X','X'];
            console.log(typeof xWin);
            let oWin = ['O', 'O', 'O'];
            let horiz1 = [boardResult[0],boardResult[1],boardResult[2]];
            console.log(`horiz1 contains ${horiz1}`);
            console.log(typeof horiz1);
            let horiz2 = [boardResult[3],boardResult[4],boardResult[5]];
            console.log(`horiz2 contains ${horiz2}`);
            let horiz3 = [boardResult[6],boardResult[7],boardResult[8]];
            console.log(`horiz3 contains ${horiz3}`);
            let vert1 = [boardResult[0],boardResult[3],boardResult[6]];
            console.log(`vert1 contains ${vert1}`);
            console.log(`xWin contains ${xWin}`);
            let vert2 = [boardResult[1],boardResult[4],boardResult[7]];
            console.log(`vert2 contains ${vert2}`);
            let vert3 = [boardResult[2],boardResult[5],boardResult[8]];
            console.log(`vert3 contains ${vert3}`);
            let diag1 = [boardResult[2],boardResult[4],boardResult[6]];
            console.log(`diag1 contains ${diag1}`);
            let diag2 = [boardResult[0],boardResult[4],boardResult[8]];
            console.log(`diag2 contains ${diag2}`);
            if (
                xWin.join('') === vert1.join('')||
                xWin.join('')===vert2.join('')||
                xWin.join('')===vert3.join('')||
                xWin.join('')===horiz1.join('')||
                xWin.join('')===horiz2.join('')||
                xWin.join('')===horiz3.join('')||
                xWin.join('')===diag1.join('')||
                xWin.join('')===diag2.join('')
                ) {
                console.log('win line played!!! PLAYER X WINS !!!*****************************************************');
                return 'xWon';
            } else if (
                oWin.join('') === vert1.join('')||
                oWin.join('')===vert2.join('')||
                oWin.join('')===vert3.join('')||
                oWin.join('')===horiz1.join('')||
                oWin.join('')===horiz2.join('')||
                oWin.join('')===horiz3.join('')||
                oWin.join('')===diag1.join('')||
                oWin.join('')===diag2.join('')
            ) {
                console.log('win line played!!! PLAYER O WINS !!!*****************************************************');
                return 'oWon';
            } else if (boardResult.includes(" ")===false) {
                console.log('The game is a TIE!!!***************************************************************************');
                return 'tie';
            }


            
            
        }

        const endGame = (result) => {
            const results = result;
            console.log('GAME OVER');
            console.log(`gameResult passed: ${results}`);
            display.declareResultMsg(results);//deliver result message usning functions in display module declareResultMsg()
            //gameBoard.board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
            gameBoard.emptyBoardArray();
            console.log(gameBoard.accessBoard());
            //TODO call function to remove markers from UI
            display.clearBoard();//TODO still need to disable board until restart though
            
            //TODO reset all initial game variables
            //TODO call to clear the board and gameover message
            //TODO call to display start btn again
            
        }

        const togglePlayer = (name) => {
            //if curentPlayer is X, set currentPlayer to O, else if currentPlayer is O set it to X
            let playingNow = name;
            console.log(`did name come through of current player? ${playingNow}`);
            let nextPlayer;
            if (playingNow === 'Player X') {
                //return "AI";
                nextPlayer = "AI";
            } else if (playingNow === 'AI') {
                //return "Player X";
                nextPlayer = "Player X";
            }
            console.log(`curentPlayer should have been toggled: ${nextPlayer}`);
            return nextPlayer;
        }

        const updateMarker = (name) => {
            //set the marker to match the player and return it
            let whoseMarker = name;
            let nextMarker;
            if (whoseMarker === "Player X") {
                nextMarker = "X";
            } else if (whoseMarker === "AI") {
                nextMarker = "O";
            }
            console.log(`did name come through of whose marker it is? ${whoseMarker}`);
            return nextMarker;
        }

        //setMove();

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


        return {playGame};
    })();//This is the end of the Game module *******************************************************************************


}()) ;//This is the end of the enclosing anonyomus closure -----------------END------------------------------------------------------------