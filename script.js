// idk if there's a point in putting these things in their managers
// could be in gameManager
const cellData = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
// could be in playerManager
const players = ["x", "o"];
const playerNames = ["x", "o"];
let currentPlayer;

// they're shared between stuff anyways so namespacing would just make things longer to type

const playerManager = (function () {
  // set player at start
  let playerIndex = 0;
  currentPlayer = players[0];

  function switchPlayer() {
    // cycles through player indexes
    if(++playerIndex >= players.length) playerIndex = 0;
    currentPlayer = players[playerIndex];
  }

  return {switchPlayer};
})();

const gameManager = (function () {
  // check if a player has won
  function checkWin() {
    // columns
    for(let i = 0; i < 3; i++) {
      if(!!cellData[i] && cellData[i] == cellData[i+3] && cellData[i] == cellData[i+6])
        return true;
    }
    // rows
    for(let i = 0; i < 9; i += 3) {
      if(!!cellData[i] && cellData[i] == cellData[i+1] && cellData[i] == cellData[i+2])
        return true;
    }
    // diagonals
    if(
      (!!cellData[0] && cellData[0] == cellData[4] && cellData[0] == cellData[8]) ||
      (!!cellData[2] && cellData[2] == cellData[4] && cellData[2] == cellData[6])
    ) return true;
    // nothing
    return false;
  }

  // check if it's a draw
  function checkDraw() {
    for(const cell of cellData)
      if(!cell)
        return false;
    return true;
  }

  return {checkWin, checkDraw};
})();

const displayManager = (function () {
  // elements from dom
  const cells = document.querySelectorAll(".cell");
  const xName = document.querySelector("#player-x-name");
  const oName = document.querySelector("#player-o-name");
  const nameInputs = [xName, oName];
  
  // clicking a cell
  cells.forEach(cell => cell.addEventListener("click", function () {
    const pos = +cell.dataset.pos;
    // if a move is made
    if(!cellData[pos] && !gameOver) {
      // update data + display
      cellData[pos] = currentPlayer;
      drawCells();
      // check if game is over
      if(gameManager.checkWin() || gameManager.checkDraw()) {
        gameOver = true;
        showGameOver();
      } else {
        playerManager.switchPlayer();
        drawTurnText();
      }
    }
  }));

  // redraw cells with new data
  function drawCells() {
    for(let i = 0; i < 9; i++) {
      cells[i].textContent = cellData[i];
    }
  }

  // show game over display
  function showGameOver() {
    const winnerMessage = document.querySelector(".winner-message");
  }

  // for changing player names
  for(let i = 0; i < 2; i++) {
    const input = nameInputs[i];
    input.addEventListener("change", function () {
      playerNames[i] = input.value;
      drawTurnText();
    });
  }
  
  // for showing who's turn it is
  function drawTurnText() {
    const display = document.querySelector(".player-turn");
    let playerName;
    if(currentPlayer == "x")
      playerName = playerNames[0];
    else
      playerName = playerNames[1];
    display.textContent = playerName + "'s turn";
  }

  return {};
})();
