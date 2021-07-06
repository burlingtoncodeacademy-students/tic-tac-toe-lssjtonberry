//grabbing the spot elements
let spot = document.getElementsByClassName("spot");
let status = document.getElementById("status");
let start = document.getElementById("start");
let reset = document.getElementById("reset");
let clock = document.getElementById("timer");

// game variables and conditions
let timer;
let interval = 0;
let hr = 0;
let min = 0;
let sec = 0;
let stop = true;
let playerOneMoves = "";
let playerTwoMoves = "";
let firstName = "";
let secondName = "";
let addedX = false;
let addedO = false;
reset.disabled = true;
let spotsFilled = 0;

//functions for the timer. First one starts the clockTick
function startClock() {
  if (stop == true) {
    stop = false;
    clockTick();
  }
}
//this one stops the clock when the games over...so people can see how long the match went
function stopClock() {
  if (stop == false) {
    stop = true;
  }
}
//allows the clock to tick upward
function clockTick() {
  if (stop == false) {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);

    sec = sec + 1;

    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }

    if (sec < 10 || sec == 0) {
      sec = "0" + sec;
    }
    if (min < 10 || min == 0) {
      min = "0" + min;
    }

    clock.textContent = hr + ":" + min + ":" + sec;

    setTimeout("clockTick()", 1000);
  }
}

// adding event listener to start that waits for a click on start
start.addEventListener("click", () => {
  // sets start button to be disabled
  start.disabled = true;
  reset.disabled = true;
  // sets status to begin counting
  status.innerText = "Starting in....";

  // call count up function each second
  timer = setInterval(countUp, 1000);
});



function countUp() {
  // increases interval by 1
  interval = interval + 1;

  if (interval <= 3) {
    // set status of interval to count 1...2...3...
    status.innerText = interval;
  } else {
    // changes status to "Begin" indicating that user can now make their move
    status.innerText = "BEGIN!";

    // clears the interval
    clearInterval(timer);

    // reset interval
    interval = 0;
    chooseSides();
  }
}

//choosing what side you want to be during the game "X's or O's"
function chooseSides() {
  firstName = window.prompt(
    "Welcome to Multiplayer Tic Tac! Here you can 1v1 friends, family, your pets or anybody you want in a classic game of Tic Tac Toe.\nBefore we go forward and pick our sides..let's find out your names. Who's player one?"
  );
  let isFactial = window.confirm(
    `You entered: ${firstName}. Is that your name?`
  );
  if (isFactial) {
    alert("Cool by me. Let's move onto player two!");
    firstName = playerOneName;
  } else {
    alert("Let's run this back again");
    chooseSides();
  }

  secondName = window.prompt(
    "What about your opponent? What's player two's name?"
  );

  let isTruth = window.confirm(
    `You've entered ${secondName}. Is that YOUR name?`
  );
  if (isTruth) {
    alert("AAALLLLLRRRRIIIGGGHGHHHTTYYY THEN. Let's move onto the next step!");
    playerTwoName = secondName;
  } else {
    alert("Maybe you two wanna switch sides?");
    chooseSides();
  }

  //Assigning variables to each player. Focuses on player one. Then player two gets the remaining choice.
  let firstPick = window.prompt(
    `Time to pick sides. For the sake of speeding things along for everyone. The choice ${firstName} makes will dictate what ${secondName} gets to play as. Probably not ideal, but hey! You guys will get to play faster :D\nWhat will you choose ${playerOneName}?`
  );
  let isTrue = window.confirm(`You entered: ${firstPick}. Are you sure?`);
  if (isTrue) {
    window.alert(`Great! Let's get started!`);
    if (firstPick === "X") {
      playerOneMoves = "X";
      addedO = true;
      playerTwoMoves = "O";
      //updating the status area
      status.innerText = `It's ${firstName}'s turn! They are ${playerOneMoves} while ${secondName} is ${playerTwoMoves}`;
    } else if (firstPick === "O") {
      playerOneMoves = "O";
      addedX = true;
      playerTwoMoves = "X";
      status.innerText = `It's ${firstName}'s turn! They are ${playerOneMoves} while ${secondName} is ${playerTwoMoves}`;
    }
  } else {
    //redoing function if first user is having second thoughts
    window.alert(
      `It's all good if you're having second thoughts. Let's try again`
    );
    chooseSides();
  }
  //first function for the timer
  startClock();
}

//giving reset button functionality. thanks Google for showing me what location.reload does(very useful!)
reset.addEventListener("click", startingOver);
function startingOver() {
  reset = location.reload();
}

//the actual game. it's a for loop that repeats the options(turns) until the win condition is met
for (let turn = 0; turn < spot.length; turn++) {
  //event listener: click to add items into board when game begins
  spot[turn].addEventListener("click", function addXO() {
    XOrO();
    //each "turn"
    //in theory, when a user clicks a spot that's empty with the addedO designator, they will put an O in the spot. Once placed the spot in question is disabled, then the turn switches
    if (spot[turn].innerHTML.trim() == "" && addedO) {
      spot[turn].innerHTML = "O";
      spot[turn].disabled = true;
      status.innerText = "Player X's Turn";
      //same logic as previous "if" statement, but with user placing X in a given spot
    } else if (spot[turn].innerHTML.trim() == "" && addedX) {
      spot[turn].innerHTML = "X";
      spot[turn].disabled = true;
      status.innerText = "Player O's Turn";
    }
    //If a user clicks on what should now be a disabled spot. gets an alert and they should keep their turn to pick another open spot.
    else if (spot[turn].innerHTML == "X" || "O") {
      alert("Sorry but that spots already taken.");
      XOrO();
    }

    //keeps tabs on how many times spaces have been utilized
    spotsFilled++;

    //the win condition
    if (xWinning() || oWinning()) {
      status.innerText =
        "WE HAVE OUR WINNER!!\nPress RESET if you'd like to play another Multiplayer game";
    } else {
      if (spotsFilled === 9) {
        alert("It's a DRAW!\nGame Over man! GAME OVER");
      }
    }
    reset.disabled = false;
  });
}

//helper function to guide who's turn it is.
function XOrO() {
  if (addedO) {
    addedX = true;
    addedO = false;
  } else if (addedX) {
    addedO = true;
    addedX = false;
  }
}

//I tried looking for a way to condense this...but both my breakout room classmates and google seem to think it's just a matter of listing each combination(right now anyway)
function xWinning() {
  //switching innerHTML to textContent does work, but it makes weird bug that calls matches in favor of player one before they rightfully "win"
  if (
    (s1.innerHTML && s2.innerHTML && s3.innerHTML) ||
    (s4.innerHTML && s5.innerHTML && s6.innerHTML) ||
    (s7.innerHTML && s8.innerHTML && s9.innerHTML) ||
    (s1.innerHTML && s5.innerHTML && s9.innerHTML) ||
    (s2.innerHTML && s5.innerHTML && s8.innerHTML) ||
    (s1.innerHTML && s4.innerHTML && s7.innerHTML) ||
    (s3.innerHTML && s6.innerHTML && s9.innerHTML) ||
    (s3.innerHTML && s5.innerHTML && s7.innerHTML)
  ) {
    alert("Whichever one of y'all decided to go X...WON!!!");
    return true;
  }
  reset.disabled = false;
  stopClock();
}

//The same logic as xWinning, just changed over for O's
function oWinning() {
  if (
    (s1.innerHTML && s2.innerHTML && s3.innerHTML) ||
    (s4.innerHTML && s5.innerHTML && s6.innerHTML) ||
    (s7.innerHTML && s8.innerHTML && s9.innerHTML) ||
    (s1.innerHTML && s5.innerHTML && s9.innerHTML) ||
    (s2.innerHTML && s5.innerHTML && s8.innerHTML) ||
    (s1.innerHTML && s4.innerHTML && s7.innerHTML) ||
    (s3.innerHTML && s6.innerHTML && s9.innerHTML) ||
    (s3.innerHTML && s5.innerHTML && s7.innerHTML)
  ) {
    alert("Whichever one of y'all decided to go O...WON!!!");
    return true;
  }
  reset.disabled = false;
  stopClock();
}
