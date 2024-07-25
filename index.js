// ------------------------------------------------------
// | Play against the computer in Rock, Paper, Scissors |
// ------------------------------------------------------

// Write a function that will return 'rock, 'paper', 'scissors' as the computer's move.
  // Firstly, get the computer to randomly make a move.
  // Compare the resulting number to a move using decimals between 0 and 1, such as 0 - 0.33 = 'Rock'.
  // Get the computer to show that result.

function getComputerChoice () {

  let computerChoice = '';

  let getRandom = Math.random();
  
  if (getRandom >= 0 && getRandom < 0.33) {
    computerChoice = 'Rock';
  } else if (getRandom >= 0.34 && getRandom < 0.66) {
    computerChoice = 'Paper';
  } else if (getRandom >= 0.67 && getRandom < 1) {
    computerChoice = 'Scissors';
  }
  return computerChoice;
}

console.log(getComputerChoice());