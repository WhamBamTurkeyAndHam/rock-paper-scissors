// ------------------------------------------------------
// | Play against the computer in Rock, Paper, Scissors |
// ------------------------------------------------------

let buttons = document.querySelectorAll('.buttons')
const resetButton = document.querySelector('#js-reset-button');
resetButton.addEventListener('click', resetGame);

let humanScore = 0;
let computerScore = 0;

function getComputerChoice () {
  const getRandom = Math.random().toPrecision(2);
  return getRandom <= 0.33 ? 'Rock' : getRandom <= 0.67 ? 'Paper' : 'Scissors';
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const humanChoice = button.id;
    playRound(humanChoice, getComputerChoice())
  });
});

function playRound (humanChoice, computerChoice) {
  const result = humanChoice === computerChoice ? "You Tied."
  : (humanChoice === 'Rock' && computerChoice === 'Scissors' || humanChoice === 'Paper' && computerChoice === 'Rock' || humanChoice === 'Scissors' && computerChoice === 'Paper')
  ? "You Win."
  : "You Lose."

  result === "You Win." ? humanScore++ : computerScore += result === "You Lose." ? 1 : 0;
  
  const resultTemplate = `You picked ${humanChoice}. The Computer picked ${computerChoice}. ${result}`;
  document.querySelector('#js-result-container').textContent = resultTemplate;
  updateGameScore();
}

function updateGameScore () {
  const scoreTemplate = `You ${humanScore} - ${computerScore} Computer`;
  document.querySelector('#js-score-container').textContent = scoreTemplate;

  if (humanScore === 5 || computerScore === 5) {
    endGame();
  }
}

function endGame () {
  
  buttons.forEach(button => {
    button.disabled = true;
  });

  const theFinalResultTemplate = `THE FINAL SCORE: You got ${humanScore} point(s), while the computer got ${computerScore} point(s). ${humanScore > computerScore ? "You Win." : "You Lose."}`;
  document.querySelector('#js-final-result-container').textContent = theFinalResultTemplate;
}

function resetGame () {
  humanScore = 0;
  computerScore = 0;
  document.querySelector('#js-final-result-container').textContent = '';
  document.querySelector('#js-score-container').textContent = 'You 0 - 0 Computer';

  const buttons = document.querySelectorAll(".buttons");
  buttons.forEach(button => {
    button.disabled = false;
  });
}