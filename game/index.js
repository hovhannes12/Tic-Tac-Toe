let cells = document.querySelectorAll(".cell");
let statusText = document.getElementById("statusText");
let restartBtn = document.getElementById("restartBtn");
let counterForX = 0;
let counterForO = 0;
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", "",];
let currentPlayer = "X";

let running = false;
seconds = 10;

let countdown;
initializeGame();

function initializeGame() {
  cells.forEach(cell => cell.addEventListener("click", cellClicked))

  restartBtn.addEventListener(
    "click", function () {
      location.reload();
    });
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;

}
function getElement(id) {
  return document.getElementById(id);
}
function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");

  if (seconds <= 0) {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer} wins!`;
    running = false;


    /// xaxay stop anel u asel vor haxtel e currentPlayer
  }

  if (options[cellIndex] != "" || !running) {
    return;
  }

  updateCell(this, cellIndex);
  if (!checkWinner()) {
    seconds = 10;
    getElement("time").style.color = "#0d8200";
    if (countdown) {
      clearInterval(countdown)
    }

    getElement("time").textContent = seconds;
    countdown = setInterval(function () {
      seconds--;
      getElement("time").textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdown);
        currentPlayer = (currentPlayer == "X") ? "O" : "X";
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
        if (currentPlayer == "X") {
          counterForX++;
          getElement("scorex").innerHTML = counterForX;
        } else {
          counterForO++;
          getElement("scoreo").innerHTML = counterForO;
        }
        restartGame()
        initializeGame()
        seconds = 10;
        clearInterval(countdown)
      }

      if (seconds <= 6) getElement("time").style.color = "#fc7b03";
      if (seconds <= 3) getElement("time").style.color = "#ff0000";
    }, 2000);
  } else {
    restartGame()
    initializeGame()
    seconds = 10;
    clearInterval(countdown)
  }

}
function updateCell(cell, index) {

  options[index] = currentPlayer;
  cell.textContent = currentPlayer;


}
function changePlayer() {
  currentPlayer = (currentPlayer == "X") ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;



}
function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const condation = winConditions[i];
    const cellA = options[condation[0]];
    const cellB = options[condation[1]];
    const cellC = options[condation[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC && cellA != "") {
      roundWon = true;

      break;
    }
  }
  if (roundWon) {
    if (currentPlayer == "X") {
      counterForX++;
      getElement("scorex").innerHTML = counterForX;
    } else {
      counterForO++;
      getElement("scoreo").innerHTML = counterForO;
    }



    statusText.textContent = `${currentPlayer} wins!`;
    running = false;
    return true;


  }
  else if (!options.includes("")) {
    statusText.textContent = `Draw!`;
    running = false;
    return true;
  }
  else {
    changePlayer();
  }
}
function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", "",];
  statusText.textContent = `${currentPlayer}'s turn`;


  for (var i = 0; i < cells.length; i++) {
    cells[i].textContent = ""
  }
  countdown = undefined;
  running = true;
}

