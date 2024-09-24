// ------------------------------------------------------
// | Play against the computer in Rock, Paper, Scissors |
// ------------------------------------------------------

const backgroundGradient = document.querySelector('.backgroundGradient');
const modal = document.querySelector('.modal')
let overallScore = document.querySelectorAll('.score');
const roundResult = document.querySelector('#js-outcome-container')
let humanResult = document.querySelector('#js-human-result-container');
let computerResult = document.querySelector('#js-computer-result-container');
const mainContainer = document.querySelector('.mainContainer');
const playerMovesBackground = document.querySelector('.playerButtonsMasterContainer');
let playerButtons = document.querySelectorAll('.playerButtons');
const resetButtons = document.querySelectorAll('.reset');
const mainPageReset = document.querySelector('#js-main-page-reset');
const nextMove = document.querySelector('.nextMove');
const leftCurtain = document.querySelector('.curtain-panel-left');
const rightCurtain = document.querySelector('.curtain-panel-right');
let animationsRemaining = 6 // Six, one for each animation. modal, curtain-panel-leftt, curtain-panel-right, mainContainer, humanImage and computerImage.
let humanImageSelector
let computerImageSelector
let isRoundInProgress = false
let humanScore = 0;
let computerScore = 0;

function updateScore() {
  overallScore.forEach((overallScore) => overallScore.textContent = `${humanScore} - ${computerScore}`);
};

playerButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (isRoundInProgress) return;
    const humanChoice = button.id.charAt(0).toUpperCase() + button.id.slice(1);
    playRound(humanChoice, getComputerChoice())
  });
});

resetButtons.forEach(button => button.addEventListener('click', resetGame));
nextMove.addEventListener('click', nextMoveGame)

function getComputerChoice () {
  const randomNum = Math.random()
  return randomNum < 0.33 ? 'Rock' : randomNum < 0.67 ? 'Paper' : 'Scissors';
};

function playRound (humanChoice, computerChoice) {
  isRoundInProgress = true;

  resetRoundState();

  animationsRemaining = 6;

  humanImageSelector = `#human-${humanChoice}`;
  computerImageSelector = `#computer-${computerChoice}`;
  
  playerButtons.forEach(button => {
    button.disabled = true;
    button.classList.add('noPointer');
  });

  mainPageReset.disabled = true;
  mainPageReset.classList.add('noPointer');

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

  //Reset function
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
  };

  setTimeout(() => showModal(humanChoice, computerChoice), 3000); // Pass choices to showModal.
};
  
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

    updateScore();
    
    // Check if the game is over.
    if (humanScore === 5 || computerScore === 5) {
      endGame();
    } else {
      enableButtons();
      isRoundInProgress = false; // Reset round in progress flag.
  }
}

updateScore();
 
function enableButtons() {
  animationsRemaining--; // Decrease the counter when an animation ends.
  if (animationsRemaining === 0) {
    // All animations are done, enable buttons.
    playerButtons.forEach(button => {
      button.disabled = false;
      button.classList.remove('noPointer');
    });
    mainPageReset.disabled = false;
    mainPageReset.classList.remove('noPointer');
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
  //Reset Score.
  humanScore = 0;
  computerScore = 0;
  overallScore.forEach((overallScore) => {
    overallScore.textContent = '0 - 0';
  });
  //Reset Background.
  backgroundGradient.style.background = "";
  // Reset curtains to the closed position.
  leftCurtain.classList.remove('curtain-panel-left-stay-out');
  rightCurtain.classList.remove('curtain-panel-right-stay-out');
  //Reset images and hide all images.
  document.querySelectorAll('.animateHuman, .animateComputer').forEach(image => {
    image.classList.add('hidden');
    image.classList.remove('animateHuman', 'animateComputer', 'animateHumanReverse', 'animateComputerReverse');
  });
  mainContainer.classList.remove('fadeAndMove', 'fadeAndMoveReverse', 'permanentlyFaded');
  //Reset Modal.
  modal.classList.add('hidden');
  modal.classList.remove('fade-in', 'fade-in-reverse');
  //Reset the animations and enable the buttons so they can be selected again.
  animationsRemaining = 0;
  playerButtons.forEach(button => {
    button.disabled = false;
    button.classList.remove('noPointer');
  });
  //Reset all text based results.
  humanResult.innerHTML = '';
  computerResult.innerHTML = '';
  roundResult.innerHTML = '';

  //Ironically reset the reset button, and the next button.
  nextMove.classList.remove('disabled');
  resetButtons.forEach(button => button.classList.remove('wiggle'));

  // Reset round in progress flag.
  isRoundInProgress = false;
}

function endGame () {
  if (humanScore > computerScore) bigConfetti();
  const finalResult = humanScore > computerScore ? `<span style="color: green; font-size: 75px;"> You beat the computer, A.I sucks!</span>`
                                                 : `<span style="color: red; font-size: 65px"> You lost against the computer, yikes...</span>`;
  roundResult.innerHTML = finalResult;

  resetButtons.forEach(button => button.classList.add('wiggle'));
  nextMove.classList.add('disabled');

  
  //Confetti by https://github.com/catdad/canvas-confetti
  
  function bigConfetti() {
    var count = 300;
    var scalar = 2;
    var defaults = {
      origin: { y: 0.5 }
    };
    
    function fire(particleRatio, opts) {
      confetti({
        scalar,
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }
    
    fire(0.25, {
      spread: 60,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 80,
    });
    fire(0.35, {
      spread: 120,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 160,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 180,
      startVelocity: 45,
    });
  }
}