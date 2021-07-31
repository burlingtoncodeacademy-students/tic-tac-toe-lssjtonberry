//assigning variables for specific elements
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
//X's and O's turns
let xTurn = false;
let oTurn = false;
reset.disabled = true;

//starts the game clock
function startClock() {
  if (stop == true) {
    stop = false;
    clockTick();
  }
}
//stops the game clock
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
  // sets reset button to be disabled
  reset.disabled = true;
  // sets status to begin counting
  status.innerText = "Starting in....";

  // call count up function each second
  timer = setInterval(countUp, 1000);
});

//switching turns. 
function XOrO() {
  if (oTurn) {
    xTurn = true;
    oTurn = false;
  } else if (xTurn) {
    oTurn = true;
    xTurn = false;
  }
}

//funcion to check for the following combinations of Xs within given spot ID's textContents
function xWinning() {
  if (
    (s1.textContent=== "X" && s2.textContent=== "X" && s3.textContent === "X") ||
    (s4.textContent=== "X" && s5.textContent=== "X" && s6.textContent=== "X") ||
    (s7.textContent=== "X" && s8.textContent=== "X" && s9.textContent=== "X") ||
    (s1.textContent=== "X" && s5.textContent=== "X" && s9.textContent=== "X") ||
    (s2.textContent=== "X" && s5.textContent=== "X" && s8.textContent=== "X") ||
    (s1.textContent=== "X" && s4.textContent=== "X" && s7.textContent=== "X") ||
    (s3.textContent=== "X" && s6.textContent=== "X" && s9.textContent=== "X") ||
    (s3.textContent=== "X" && s5.textContent=== "X" && s7.textContent=== "X")
  ) {
    alert("Whichever one of y'all decided to go X...WON!!!");
    return true;
  }
  //enables reset button again once game is over
  reset.disabled = false;
  //stops clock
  stopClock();
}

//funcion to check for the following combinations of Os within given spot ID's textContents
function oWinning() {
  if (
    (s1.textContent=== "O" && s2.textContent=== "O" && s3.textContent=== "O") ||
    (s4.textContent=== "O" && s5.textContent=== "O" && s6.textContent=== "O") ||
    (s7.textContent=== "O" && s8.textContent=== "O" && s9.textContent=== "O") ||
    (s1.textContent=== "O" && s5.textContent=== "O" && s9.textContent=== "O") ||
    (s2.textContent=== "O" && s5.textContent=== "O" && s8.textContent=== "O") ||
    (s1.textContent=== "O" && s4.textContent=== "O" && s7.textContent=== "O") ||
    (s3.textContent=== "O" && s6.textContent=== "O" && s9.textContent=== "O") ||
    (s3.textContent=== "O" && s5.textContent=== "O" && s7.textContent=== "O")
  )  {
    alert("Whichever one of y'all decided to go O...WON!!!");
    return true;
  }
  //enables reset button again once game is over
  reset.disabled = false;
 //stops clock
  stopClock();
}



function countUp() {
  // increases interval by 1
  interval = interval + 1;

  // set status of interval to count 1...2...3...
  if (interval <= 3) {
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

//choosing player names 
function chooseSides() {
  firstName = window.prompt(
    "Welcome to Multiplayer Tic Tac! Here you can 1v1 friends, family, your pets or anybody you want in a classic game of Tic Tac Toe.\nBefore we go forward and pick our sides..let's find out your names. Who's player one?"
  );
  //getting confirmation that entered name is what player really wants
  let isFactial = window.confirm(
    `You entered: ${firstName}. Is that your name?`
  );
  
  if (isFactial) {
    alert("Cool by me. Let's move onto player two!");
  } else {
    //alerts player that game will loop back to player one name selection
    alert("Let's run this back and try again");
    chooseSides();
  }

  secondName = window.prompt(
    "What about your opponent? What's player two's name?"
  );

  let isTruth = window.confirm(
    `You've entered ${secondName}. Is that YOUR name?`
  );
  if (isTruth) {
    //alert to move on to picking sides
    alert("AAALLLLLRRRRIIIGGGHGHHHTTYYY THEN. Let's move onto the next step!");
  } else {
    alert("Maybe you two wanna switch sides?");
    chooseSides();
  }

  //Assigning X or O to player one. Player two gets leftover choice 
  let firstPick = window.prompt(
    `Time to pick sides. For the sake of speeding things along for everyone. The choice ${firstName} makes will dictate what ${secondName} gets to play as. Probably not ideal, but hey! You guys will get to play faster :D\nWhat will you choose ${firstName}?`
  );
  let isTrue = window.confirm(`You entered: ${firstPick}. Are you sure?`);
  if (isTrue) {
    window.alert(`Great! Let's get started!`);
    if (firstPick === "X") {
      playerOneMoves = "X";
      oTurn = true;
      playerTwoMoves = "O";
      //updating the status area
      status.innerText = `It's ${firstName}'s turn! They are ${playerOneMoves} while ${secondName} is ${playerTwoMoves}`;
    } else if (firstPick === "O") {
      playerOneMoves = "O";
      xTurn = true;
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
  //starts the game timer
  startClock();
}

//giving reset button functionality. thanks Google for showing me what location.reload does(very useful!)
reset.addEventListener("click", startingOver);
function startingOver() {
  reset = location.reload();
}


//the actual game. it's a for loop that repeats the options(turns) until the win condition is met
for (let filled = 0; turn < spot.length; filled++) {
  //event listener: click to add items into board when game begins
  spot[filled].addEventListener("click", function addXO() {
    XOrO();
    if (spot[filled].textContent.trim() == "" && oTurn) {
      spot[filled].textContent = "O";
      spot[filled].disabled = true;
      status.innerText = "Player X's Turn";
      
    } else if (spot[filled].textContent.trim() == "" && xTurn) {
      spot[filled].textContent = "X";
      spot[filled].disabled = true;
      status.innerText = "Player O's Turn";
    }
    
    else if (spot[filled].textContent == "X" || "O") {
      alert("Sorry but that spots already taken.");
      XOrO();
    }

    //spots counter which goes up by one everytime a spot is clicked
    filled++;

    //the win condition
    if (xWinning() || oWinning()) {
      status.innerText =
        "WE HAVE OUR WINNER!!";
    } else {
      //alerts that the game is a DRAW if all spots are filled without any matches
      if (filled === 9) {
        alert("It's a DRAW!\nGame Over man! GAME OVER");
      }
    }
    //enables reset button
    reset.disabled = false;
  });
}

