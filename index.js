// ------------------------------------------------------
// | Play against the computer in Rock, Paper, Scissors |
// ------------------------------------------------------

let humanScore = 0
let computerScore = 0

// Write a function that will return 'rock, 'paper', 'scissors' as the computer's move.
  // Firstly, get the computer to randomly make a move.
  // Compare the resulting number to a move using decimals between 0 and 1, such as 0 - 0.33 = 'Rock'.
  // Get the computer to show that result.

function getComputerChoice () {

  let computerOption = '';

  let getRandom = Math.random();
  
  if (getRandom >= 0 && getRandom < 0.33) {
    computerOption = 'Rock';
  } else if (getRandom >= 0.34 && getRandom < 0.66) {
    computerOption = 'Paper';
  } else if (getRandom >= 0.67 && getRandom < 1) {
    computerOption = 'Scissors';
  }
  return computerOption;
}

// Write a function that will return 'rock, 'paper', 'scissors' as the human's move.
  // Firstly, get the user to input a term that is 'rock, 'paper' or 'scissors'.
  // Allow their result to be 'Rock or 'rock'.

function getHumanChoice () {

  let humanOption = '';

  userChoice = prompt('Pick your move.', 'Rock, Paper or Scissors')
  if (userChoice === 'Rock') {
      humanOption = 'Rock';
    } else if (userChoice === 'Paper') {
      humanOption = 'Paper';
    } else if (userChoice === 'Scissors') {
      humanOption = 'Scissors';
    }
    return humanOption;
  }

// Write a function that will play a single round.
  // Take both the human choice and the computer choice as arguements.
  // Compare the arguements.
  // Compare if the result is a Win, Loss or a Tie.
  // Give one (1) point to the human or computer, and logs the result.

function playRound (humanChoice, computerChoice) {
  let result = '';

  if (humanChoice === 'Rock') {
    if (computerChoice === 'Rock') {
      result = 'You Tied.';
    } else if (computerChoice === 'Paper') {
      result = 'You Lose.';
      ++computerScore
    } else if (computerChoice === 'Scissors') {
      result = 'You Win!';
      ++humanScore
    }
  } else if (humanChoice === 'Paper') {
    if (computerChoice === 'Rock') {
      result = 'You Win!';
      ++humanScore
    } else if (computerChoice === 'Paper') {
      result = 'You Tied.';
    } else if (computerChoice === 'Scissors') {
      result = 'You Lose.'
      ++computerScore
    }
  } else if (humanChoice === 'Scissors') {
    if (computerChoice === 'Rock') {
      result = 'You Lose';
      ++computerScore
    } else if (computerChoice === 'Paper') {
      result = 'You Win!';
      ++humanScore
    } else if (computerChoice === 'Scissors') {
      result = 'You Tied.'
    }
  }

  console.log(`You picked ${humanChoice}. The computer picked ${computerChoice}. ${result}`)
}

const computerSelection = getComputerChoice();
const humanSelection = getHumanChoice();

playRound(humanSelection, computerSelection);