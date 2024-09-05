// ------------------------------------------------------
// | Play against the computer in Rock, Paper, Scissors |
// ------------------------------------------------------

let playerButtons = document.querySelectorAll('.playerButtons')
const resetButton = document.querySelector('#js-reset-button');
let humanScore = 0;
let computerScore = 0;

function getComputerChoice () {
  return Math.random() < 0.33 ? 'Rock' : Math.random() < 0.67 ? 'Paper' : 'Scissors';
}

playerButtons.forEach(button => {
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
  const scoreTemplate = `You ${humanScore} - ${computerScore} Computer`;
  document.querySelector('#js-score-container').textContent = scoreTemplate;

  if (humanScore === 5 || computerScore === 5) {
    endGame();
  }
}

function endGame () {
  playerButtons.forEach(button => button.disabled = true);

  const theFinalResultTemplate = `THE FINAL RESULT: You got ${humanScore} point(s), while the computer got ${computerScore} point(s). ${humanScore > computerScore ? "You Win." : "You Lose."}`;
  document.querySelector('#js-final-result-container').textContent = theFinalResultTemplate;

  resetButton.addEventListener('click', () => {
    humanScore = 0;
    computerScore = 0;
    document.querySelector('#js-result-container').textContent = '';
    document.querySelector('#js-final-result-container').textContent = '';
    document.querySelector('#js-score-container').textContent = 'You 0 - 0 Computer';

    playerButtons.forEach(button => button.disabled = false);
  });
};