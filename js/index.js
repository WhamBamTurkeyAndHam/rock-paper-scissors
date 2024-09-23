// ------------------------------------------------------
// | Play against the computer in Rock, Paper, Scissors |
// ------------------------------------------------------

const backgroundGradient = document.querySelector('.backgroundGradient');
const modal = document.querySelector('.modal')
let overallScore = document.querySelector('#js-score-container');
const roundResult = document.querySelector('#js-outcome-container')
const finalResult = document.querySelector('#js-final-result-container');
let humanResult = document.querySelector('#js-human-result-container');
let computerResult = document.querySelector('#js-computer-result-container');
const mainContainer = document.querySelector('.mainContainer');
const playerMovesBackground = document.querySelector('.playerButtonsMasterContainer');
let playerButtons = document.querySelectorAll('.playerButtons');
const resetButton = document.querySelector('.reset');
const nextMove = document.querySelector('.nextMove');
const leftCurtain = document.querySelector('.curtain-panel-left');
const rightCurtain = document.querySelector('.curtain-panel-right');
let animationsRemaining = 6 // One for each animation. modal, curtain-panel-leftt, curtain-panel-right, mainContainer, humanImage and computerImage.
let humanImageSelector
let computerImageSelector
let isRoundInProgress = false
let humanScore = 0;
let computerScore = 0;

resetButton.addEventListener('click', resetGame);
nextMove.addEventListener('click', nextMoveGame)

function getComputerChoice () {
  const randomNum = Math.random()
  return randomNum < 0.33 ? 'Rock' : randomNum < 0.67 ? 'Paper' : 'Scissors';
}

playerButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (isRoundInProgress) return;
    const humanChoice = button.id.charAt(0).toUpperCase() + button.id.slice(1);
    playRound(humanChoice, getComputerChoice())
  });
});

function playRound (humanChoice, computerChoice) {
  isRoundInProgress = true;

  resetRoundState();

  animationsRemaining = 5;

  humanImageSelector = `#human-${humanChoice}`;
  computerImageSelector = `#computer-${computerChoice}`;
  
  playerButtons.forEach(button => button.disabled = true);
  playerButtons.forEach(button => button.classList.remove('pointer'));
  playerButtons.forEach(button => button.classList.add('noPointer'));

  //Animation for elements to move up and fade out.
  mainContainer.classList.add('fadeAndMove');

  mainContainer.addEventListener('animationend', () => {
    mainContainer.classList.add('permanentlyFaded')
    mainContainer.classList.remove('fadeAndMove')

    //Deciding which image to use.
    const humanImage = document.querySelector(humanImageSelector);
    const computerImage = document.querySelector(computerImageSelector);

    humanImage.classList.remove('hidden');
    computerImage.classList.remove('hidden');
    humanImage.classList.add('animateHuman')
    computerImage.classList.add('animateComputer');

    //Determining background color based on option picked by human or computer.
    const gradientStops = [rockColor = '#ff8000', paperColor = '#ffff00', scissorsColor = '#fd63e3']; //Orange - #ff8000, Yellow - #ffff00, Purple - #fd63e3.

    const start = humanChoice === 'Rock' ? 0 : humanChoice === 'Paper' ? 1 : 2;
    const end = computerChoice === 'Rock' ? 0 : computerChoice === 'Paper' ? 1 : 2;

    const gradient = `linear-gradient(to right, ${gradientStops[start]} 35%, ${gradientStops[end]} 65%)`;

    backgroundGradient.style.background = gradient;

    // Animate the curtains
    leftCurtain.classList.add('curtain-panel-left-move-out');
    rightCurtain.classList.add('curtain-panel-right-move-out');

    // Ensure curtains stay out after animation.
    leftCurtain.addEventListener('animationend', () => {
      leftCurtain.classList.add('curtain-panel-left-stay-out');
      leftCurtain.classList.remove('curtain-panel-left-move-out');
    }, { once: true });

    rightCurtain.addEventListener('animationend', () => {
      rightCurtain.classList.add('curtain-panel-right-stay-out');
      rightCurtain.classList.remove('curtain-panel-right-move-out');
    }, { once: true });
  }, { once: true });

  function resetRoundState() {
    // Reset all images to ensure they are visible and not hidden from the previous round.
    document.querySelectorAll('.animateHuman, .animateComputer').forEach(image => {
      image.classList.add('hidden'); // Hide all images.
      image.classList.remove('animateHuman', 'animateComputer', 'animateHumanReverse', 'animateComputerReverse');
    });

    // Reset curtains to the closed position
    leftCurtain.classList.remove('curtain-panel-left-stay-out');
    rightCurtain.classList.remove('curtain-panel-right-stay-out');

    mainContainer.classList.remove('fadeAndMove', 'fadeAndMoveReverse', 'permanentlyFaded');
  }

  setTimeout(() => showModal(humanChoice, computerChoice), 3000); // Pass choices to showModal.
}
  
function showModal(humanChoice, computerChoice) {
    // Ensuring modal starts visible and stays visible until the next round starts.
    modal.classList.remove('hidden', 'fade-in-reverse');
    modal.classList.add('fade-in'); // Fade-in effect when the modal appears.

    const overallResult = humanChoice === computerChoice ? "You Tied"
        : (humanChoice === 'Rock' && computerChoice === 'Scissors' || humanChoice === 'Paper' && computerChoice === 'Rock' || humanChoice === 'Scissors' && computerChoice === 'Paper')
        ? "You Win"
        : "You Lose";
    
    overallResult === "You Win" ? humanScore++ : computerScore += overallResult === "You Lose" ? 1 : 0;
    
    // Adds text to page.
    humanResult.innerHTML = (humanChoice === 'Rock') ? `<span style="color: #ff8000;"> Rock </span>`
                          : (humanChoice === 'Paper') ? `<span style="color: #ffff00;"> Paper </span>`
                          : `<span style="color: #fd63e3;"> Scissors </span>`

    computerResult.innerHTML = (computerChoice === 'Rock') ? `<span style="color: #ff8000;"> Rock </span>`
                            : (computerChoice === 'Paper') ? `<span style="color: #ffff00;"> Paper </span>`
                            : `<span style="color: #fd63e3;"> Scissors </span>`

    roundResult.innerHTML = overallResult === "You Win" ? `You <span style="color: green;"> Win</span>`
                          : overallResult === "You Lose" ? `You <span style="color: red;"> Lose</span>`
                          : overallResult;

    overallScore.textContent = `${humanScore} - ${computerScore}`;
    
    // Check if the game is over.
    if (humanScore === 5 || computerScore === 5) {
      endGame();
    } else {
      enableButtons();
      isRoundInProgress = false; // Reset round in progress flag.
  }
}

function enableButtons() {
  animationsRemaining--; // Decrease the counter when an animation ends.
  if (animationsRemaining === 0) {
    // All animations are done, enable buttons.
    playerButtons.forEach(button => {
      button.disabled = false;
      button.classList.remove('noPointer');
      button.classList.add('pointer');
    });
  }
}

function nextMoveGame() {
   if (!isRoundInProgress) {
    setTimeout(() => {
      // Ensure the modal fades out only when triggered by the next move.
      modal.classList.remove('fade-in');
      modal.classList.add('fade-in-reverse');
      
      modal.addEventListener('animationend', () => {
        modal.classList.add('hidden');
        modal.classList.remove('fade-in-reverse'); // Ensure fade-in-reverse is removed after animation.
        enableButtons()
      }, { once: true }); // Ensures the listener only runs once per animation cycle.
    }, 100);
  
      // Animate curtains to reverse their movement.
      leftCurtain.classList.add('curtain-panel-left-move-out-reverse');
      rightCurtain.classList.add('curtain-panel-right-move-out-reverse');
  
      leftCurtain.addEventListener('animationend', () => {
        leftCurtain.classList.remove('curtain-panel-left-stay-out');
        leftCurtain.classList.remove('curtain-panel-left-move-out-reverse');
        enableButtons()
      }, { once: true });
  
      rightCurtain.addEventListener('animationend', () => {
        rightCurtain.classList.remove('curtain-panel-right-stay-out');
        rightCurtain.classList.remove('curtain-panel-right-move-out-reverse');
        enableButtons()
      }, { once: true });
  
    const humanImage = document.querySelector(humanImageSelector);
    const computerImage = document.querySelector(computerImageSelector);
  
    humanImage.classList.remove('animateHuman');
    humanImage.classList.add('animateHumanReverse');
    computerImage.classList.remove('animateComputer');
    computerImage.classList.add('animateComputerReverse');

    // Hide images after reverse animation ends
    humanImage.addEventListener('animationend', () => {
      humanImage.classList.add('hidden');
      humanImage.classList.remove('animateHumanReverse');
      enableButtons()
    }, { once: true });

    computerImage.addEventListener('animationend', () => {
      computerImage.classList.add('hidden');
      computerImage.classList.remove('animateComputerReverse');
      enableButtons()
    }, { once: true });
    
    mainContainer.classList.remove('permanentlyFaded');
    mainContainer.classList.add('fadeAndMoveReverse')
      mainContainer.addEventListener('animationend', () => {
        enableButtons()
      }, { once: true });
  
    // Show images again after the next move starts.
    setTimeout(() => {
      humanImage.classList.remove('hidden');
      computerImage.classList.remove('hidden');
    }, 400);
  }
}

//MUST WORK ON
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