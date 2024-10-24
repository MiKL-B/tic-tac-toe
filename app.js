const div_board = document.createElement("div");
div_board.classList.add("board");

const board = ["", "", "", "", "", "", "", "", ""];
let turn = false;
let gameActive = true;

function create_board() {
  for (let i = 0; i < board.length; i++) {
    let div_box = document.createElement("div");
    div_box.classList.add("box");
    div_box.setAttribute("id", i);
    div_board.appendChild(div_box);
  }
}

function changeTurn() {
  turn = !turn;
}
function getTurn() {
  let symbol = "x";
  if (turn) {
    symbol = "o";
  }
  return symbol;
}

function checkVictory(arr) {
  let combs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = combs[i];
    let a = arr[winCondition[0]];
    let b = arr[winCondition[1]];
    let c = arr[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  return roundWon;
}

function play(arr, index) {
  if (!gameActive || arr[index].includes("x") || arr[index].includes("o"))
    return;
  
  arr[index] = getTurn();
  document.getElementById(index).innerText = getTurn();
  
  if (checkVictory(board)){
    gameActive = false;
    return;
  }
  
  changeTurn();
}

document.body.addEventListener("click", (event) => {
  if (event.target.classList == "box") {
    play(board, event.target.id);
  }
});

create_board();
document.body.appendChild(div_board);
