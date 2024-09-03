// ------------------------------------------------------
// | Play against the computer in Rock, Paper, Scissors |
// ------------------------------------------------------

// let rock = document.querySelector('#rock');
// let paper = document.querySelector('#paper');
// let scissors = document.querySelector('#scissors');
let buttons = document.querySelectorAll('.buttons')
const resetButton = document.querySelector('#js-reset-button');
resetButton.addEventListener('click', resetGame);

let humanScore = 0;
let computerScore = 0;

// Write a function that will return 'rock, 'paper', 'scissors' as the computer's move.
  // Firstly, get the computer to randomly make a move.
  // Compare the resulting number to a move using decimals between 0 and 1, such as 0 - 0.33 = 'Rock'.
  // Get the computer to show that result.

function getComputerChoice () {

  let computerOption = '';

  let getRandom = Math.random().toPrecision(2);
  
  if (getRandom <= 0.33) {
    computerOption = 'Rock';
  } else if (getRandom >= 0.34 && getRandom <= 0.66) {
    computerOption = 'Paper';
  } else if (getRandom >= 0.67) {
    computerOption = 'Scissors';
  }
  return computerOption;
}

// Write a function that will return 'rock, 'paper', 'scissors' as the human's move.
  // Firstly, get the user to input a term that is 'rock, 'paper' or 'scissors'.
  // Allow their result to be 'Rock or 'rock'.
  
  //(New Steps || UI Update)//
  //Add an event listener so that each button can now register as a player choice.

// rock.addEventListener('click', () => {
//   playRound('Rock', getComputerChoice());
// });

// paper.addEventListener('click', () => {
//   playRound('Paper', getComputerChoice())
// });

// scissors.addEventListener('click', () => {
//   playRound('Scissors', getComputerChoice())
// });

    //Condense the event listener so that each button can now register as a player choice, but within less code.

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const humanChoice = button.id;
    playRound(humanChoice, getComputerChoice())
  });
});

//(Old Code)//
// function getHumanChoice () {

//   let humanOption = '';

//   userChoice = prompt('Pick your move.', 'Rock, Paper or Scissors').toUpperCase();

//   if (userChoice === 'ROCK') {
//       humanOption = 'Rock';
//     } else if (userChoice === 'PAPER') {
//       humanOption = 'Paper';
//     } else if (userChoice === 'SCISSORS') {
//       humanOption = 'Scissors';
//     }
//     return humanOption;
//   }
//(Old Code)//

// Write a function that will play a single round.
  // Take both the human choice and the computer choice as arguements.
  // Compare the arguements.
  // Compare if the result is a Win, Loss or a Tie.
  // Give one (1) point to the human or computer, and log the result.

  function updateGameScore () {
    const scoreTemplate = `You ${humanScore} - ${computerScore} Computer`;
    document.querySelector('#js-score-container').textContent = scoreTemplate;

    if (humanScore === 5 || computerScore === 5) {
      endGame();
    }
  }

  function playRound (humanChoice, computerChoice) {
    
    let result = '';
  
    if (humanChoice === computerChoice) {
      result = 'You Tied.';
    } else if (humanChoice === 'Rock' && computerChoice === 'Scissors' || humanChoice === 'Paper' && computerChoice === 'Rock' || humanChoice === 'Scissors' && computerChoice === 'Paper') {
      result = 'You Win!';
      humanScore++
    } else {
      result = 'You Lose.';
      computerScore++;
    }

    //Change the result so that it displays the final outcome on the page instead of in the console.

    const resultTemplate = `You picked ${humanChoice}. The Computer picked ${computerChoice}. ${result}`;
    document.querySelector('#js-result-container').textContent = resultTemplate;
    updateGameScore();
  }
  
// Write a function that plays multiple rounds, in this case, 5.
  // When a result is reached, a tie will do nothing to the points, or a win/lose will give the computer or human a point.
  // Best out of 5, so keep doing this for 5 rounds, until the human has more than the computer, or vice versa.
  
  //(New Steps || UI Update)//
  //Constantly display the score on the page, updating it as it goes.

  function endGame () {
  
    document.querySelector('#js-result-container').textContent = '';
    
    buttons.forEach(button => {
      button.disabled = true;
    });
  
  if (humanScore === 5) {
    const youWinTemplate = `THE FINAL SCORE: You got ${humanScore} point(s), while the computer got ${computerScore} point(s). You win!`;
    document.querySelector('#js-final-result-container').textContent = youWinTemplate;
  } else {
    const youLoseTemplate = `THE FINAL SCORE: You got ${humanScore} point(s), while the computer got ${computerScore} point(s). You lose.`;
    document.querySelector('#js-final-result-container').textContent = youLoseTemplate;
  }
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