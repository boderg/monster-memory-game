const cards = document.querySelectorAll('.memory-card');

let moveCounter = 0;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

let timeLeft = 120; 
let countdownTimer;

let timerStarted = false;

function flipCard() {
  if (lockBoard) return;

  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    if (!timerStarted) {
      startTimer();
      timerStarted = true;
    }

    return;
  }

  secondCard = this;

  moveCounter++;
  document.getElementById("moveCounter").innerHTML = moveCounter;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();

  if (document.querySelectorAll('.flip').length === cards.length) {
    clearInterval(countdownTimer);
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

function startTimer() {
  countdownTimer = setInterval(function() {
    timeLeft--;
    document.getElementById("timer").innerHTML = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdownTimer);
      
    }
  }, 1000);
}

function resetGame() {
  timeleft = 120;
  clearInterval(countdownTimer);
  timerStarted = false;
}

document.querySelector('.reset').addEventListener('click', resetGame);