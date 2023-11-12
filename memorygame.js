const memoryGame = document.querySelector('.memory-game');
const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    disableCards();
  } else {
    unflipCards();
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
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function resetGame() {
  if (lockBoard) return; // Prevent resetting while cards are still flipping

  cards.forEach((card) => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });

  shuffleCards();

  resetBoard();
}

function shuffleCards() {
  cards.forEach((card) => {
    const randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
}

cards.forEach((card) => card.addEventListener('click', flipCard));

const resetButton = document.querySelector('button');
resetButton.addEventListener('click', resetGame);
