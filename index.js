// ------------------------------------------------------
// | Play against the computer in Rock, Paper, Scissors |
// ------------------------------------------------------

let playerButtons = document.querySelectorAll('.playerButtons');
const resetButton = document.querySelector('#js-reset-button');
const playerMovesBackground = document.querySelector('.playerButtonsMasterContainer')
let overallScore = document.querySelector('#js-score-container');
const finalResult = document.querySelector('#js-final-result-container');
let humanResult = document.querySelector('#js-human-result-container');
let computerResult = document.querySelector('#js-computer-result-container');
const backgroundGradient = document.querySelector('body');
const mainContainer = document.querySelector('.mainContainer');
let humanScore = 0;
let computerScore = 0;

resetButton.addEventListener('click', resetGame);

function getComputerChoice () {
  const randomNum = Math.random()
  return randomNum < 0.33 ? 'Rock' : randomNum < 0.67 ? 'Paper' : 'Scissors';
}

playerButtons.forEach(button => {
  button.addEventListener('click', () => {
    const humanChoice = button.id.charAt(0).toUpperCase() + button.id.slice(1);
    playRound(humanChoice, getComputerChoice())
  });
});

function playRound (humanChoice, computerChoice) {  
  //Scoring.
  const result = humanChoice === computerChoice ? "You Tied."
              : (humanChoice === 'Rock' && computerChoice === 'Scissors' || humanChoice === 'Paper' && computerChoice === 'Rock' || humanChoice === 'Scissors' && computerChoice === 'Paper')
              ? "You Win."
              : "You Lose."

  result === "You Win." ? humanScore++ : computerScore += result === "You Lose." ? 1 : 0;
  
  //Adds text to page.
  humanResult.textContent = humanChoice;
  computerResult.textContent = computerChoice;
  const scoreTemplate = `You ${humanScore} - ${computerScore} Computer`;
  overallScore.textContent = scoreTemplate;

  if (humanScore === 5 || computerScore === 5) {
    endGame();
  }
}

function resetGame () {
  humanScore = 0;
  computerScore = 0;
  backgroundGradient.style.background = "";
  humanResult.textContent = "Choose your move...";
  computerResult.textContent = "...and they'll choose theirs.";
  finalResult.textContent = '';
  overallScore.textContent = 'You 0 - 0 Computer';

  playerButtons.forEach(button => button.disabled = false);
  playerButtons.forEach(button => button.classList.remove('disabled'));
  playerMovesBackground.classList.remove('disabled');
}

function endGame () {
  playerButtons.forEach(button => button.disabled = true);
  playerButtons.forEach(button => button.classList.add('disabled'));
  playerMovesBackground.classList.add('disabled');

  const theFinalResultTemplate = `THE FINAL RESULT: You got ${humanScore} point(s), while the computer got ${computerScore} point(s). ${humanScore > computerScore ? "You Win." : "You Lose."}`;
  finalResult.textContent = theFinalResultTemplate;

  resetButton.removeEventListener('click', resetGame);
  resetButton.addEventListener('click', resetGame);
}