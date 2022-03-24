const cellData = ['', '', '', '', '', '', '', '', ''];
const players = ["x", "o"];
let currentPlayer;

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
  
  // clicking a cell
  cells.forEach(cell => cell.addEventListener("click", function () {
    const pos = +cell.dataset.pos;
    // if cell is empty (so move is made):
    if(!cellData[pos]) {
      // update data + display
      cellData[pos] = currentPlayer;
      drawCells();
      // check if game is over
      if(gameManager.checkWin() || gameManager.checkDraw())
        showGameOver();
      else
        playerManager.switchPlayer();
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
  }

  return {};
})();
