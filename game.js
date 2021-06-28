//assigning your side for the game for both the user and computer
const player = "O";
const computer = "X";

let board_filled = false;
let play_board = ["", "", "", "", "", "", "", "", ""];

//referencing the board
const board_container = document.querySelector(".arena");

const winner_statement = document.getElementById("winner");

//function to check on the status of the board
check_board_finished = () => {
  let flag = true;
  play_board.forEach(element => {
    if (element != player && element != computer) {
      flag = false;
    }
  });
  board_filled = flag;
};


const check_line = (top, middle, bottom) => {
  return (
    play_board[top] == play_board[middle] &&
    play_board[middle] == play_board[bottom] &&
    (play_board[top] == player || play_board[top] == computer)
  );
};

//checking for a match
const check_match = () => {
  for (i = 0; i < 9; i += 3) {
    if (check_line(i, i + 1, i + 2)) {
      document.querySelector(`#block_${i}`).classList.add("win");
      document.querySelector(`#block_${i + 1}`).classList.add("win");
      document.querySelector(`#block_${i + 2}`).classList.add("win");
      return play_board[i];
    }
  }
  for (i = 0; i < 3; i++) {
    if (check_line(i, i + 3, i + 6)) {
      document.querySelector(`#block_${i}`).classList.add("win");
      document.querySelector(`#block_${i + 3}`).classList.add("win");
      document.querySelector(`#block_${i + 6}`).classList.add("win");
      return play_board[i];
    }
  }
  if (check_line(0, 4, 8)) {
    document.querySelector("#block_0").classList.add("win");
    document.querySelector("#block_4").classList.add("win");
    document.querySelector("#block_8").classList.add("win");
    return play_board[0];
  }
  if (check_line(2, 4, 6)) {
    document.querySelector("#block_2").classList.add("win");
    document.querySelector("#block_4").classList.add("win");
    document.querySelector("#block_6").classList.add("win");
    return play_board[2];
  }
  return "";
};

//function to actually declare a winner
const check_for_winner = () => {
  let result = check_match()
  if (result == player) {
    winner.textContent = "You Rock!!";
    winner.classList.add("playerWin");
    board_filled = true
  } else if (result == computer) {
    winner.textContent = "The CPU won man. Get your head in the game.";
    winner.classList.add("computerWin");
    board_filled = true
  } else if (board_filled) {
    winner.textContent = "You tied?! o.O";
    winner.classList.add("draw");
  }
};
//the main display board. updates progressively as the game moves on
const display_board = () => {
  board_container.innerHTML = ""
  play_board.forEach((e, i) => {
    board_container.innerHTML += `<div id="block_${i}" class="block" onclick="addPlayerMove(${i})">${play_board[i]}</div>`
    if (e == player || e == computer) {
      document.querySelector(`#block_${i}`).classList.add("occupied");
    }
  });
};
//repeating the game
const game_loop = () => {
  display_board();
  check_board_finished();
  check_for_winner();
}
//adding a player move
const addPlayerMove = e => {
  if (!board_filled && play_board[e] == "") {
    play_board[e] = player;
    game_loop();
    addComputerMove();
  }
};
//adding computer move. randomly picks an available spot out of the available nine
const addComputerMove = () => {
  if (!board_filled) {
    do {
      selected = Math.floor(Math.random() * 9);
    } while (play_board[selected] != "");
    play_board[selected] = computer;
    game_loop();
  }
};
//reseting the board after either a winner's decided or theres a draw
const reset_board = () => {
  play_board = ["", "", "", "", "", "", "", "", ""];
  board_filled = false;
  winner.classList.remove("playerWin");
  winner.classList.remove("computerWin");
  winner.classList.remove("draw");
  winner.innerText = "";
  display_board();
};

//displaying the board for the first time when you load/refresh page
display_board();
