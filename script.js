let currScore = 0;
let compScore = 0;

function getComputerChoice() {
  let nums = Math.floor(Math.random() * 3);
  const numRps = document.querySelectorAll('.rpsButton');
  return numRps[nums].value;
}

// ** getResult compares playerChoice & computerChoice and returns the score accordingly **
// human wins - getResult('Rock', 'Scissors') 👉 1
// human loses - getResult('Scissors', 'Rock') 👉 -1
// human draws - getResult('Rock', 'Rock') 👉 0
function getResult(playerChoice, computerChoice) {
  // return the result of score based on if you won, drew, or lost
  let score;

  // All situations where human draws, set `score` to 0
  if (playerChoice == computerChoice) score = 0;

  // All situations where human wins, set `score` to 1
  // make sure to use else ifs here
  else if (playerChoice == 'Stone' && computerChoice == 'Scissors') score = 1;
  else if (playerChoice == 'Paper' && computerChoice == 'Stone') score = 1;
  else if (playerChoice == 'Scissors' && computerChoice == 'Paper') score = 1;

  // Otherwise human loses (aka set score to -1)
  else score = -1;

  // return score
  return score;
}

// ** showResult updates the DOM to `You Win!` or `You Lose!` or `It's a Draw!` based on the score. Also shows Player Choice vs. Computer Choice**
function showResult(score, playerChoice, computerChoice) {
  // Hint: on a score of -1
  // You should do result.innerText = 'You Lose!'
  // Don't forget to grab the div with the 'result' id!
  let choice = document.querySelector('#hands');
  choice.innerText = `👤 ${playerChoice} vs ${computerChoice} 🖥️`;

  let res = document.querySelector('#result');
  if (score == 0) res.innerText = `It's a Draw!`;
  else if (score == 1) res.innerText = `You Win!`;
  else res.innerText = `You Lose!`;
}

// ** Calculate who won and show it on the screen **
function onClickRPS(playerChoice) {
  let computerChoice = getComputerChoice();
  let score = getResult(playerChoice, computerChoice);
  currScore += score;
  compScore -= score;

  const sc = document.querySelector("#player-score");
  sc.innerText = `Your Score: ${currScore} \n Computer Score: ${compScore}`;
  showResult(score, playerChoice, computerChoice);

}


// ** Make the RPS buttons actively listen for a click and do something once a click is detected **
function playGame() {
  // use querySelector to select all RPS Buttons
  let player = document.querySelectorAll('.rpsButton');

  // * Adds an on click event listener to each RPS button and every time you click it, it calls the onClickRPS function with the RPS button that was last clicked *
  // 1. loop through the buttons using a forEach loop
  // 2. Add a 'click' event listener to each button
  // 3. Call the onClickRPS function every time someone clicks
  // 4. Make sure to pass the currently selected rps button as an argument
  player.forEach(btn => {
    btn.addEventListener('click', () => { onClickRPS(btn.value) });
  })

  // Add a click listener to the end game button that runs the endGame() function on click
  let end = document.querySelector('#endGameButton');
  end.addEventListener('click', () => endGame());
}

// ** endGame function clears all the text on the DOM **
function endGame() {
  currScore = 0;
  compScore = 0;
  const sc = document.querySelector("#player-score");
  sc.innerText = '';

  let choice = document.querySelector('#hands');
  choice.innerText = '';

  let res = document.querySelector('#result');
  res.innerText = '';
}

playGame()
