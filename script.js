const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('start-btn');
let score = 0;
let timeLeft = 30;
let insectInterval, countdownInterval;

function createInsect() {
  const insect = document.createElement('div');
  insect.classList.add('insect');
  const x = Math.random() * (gameBoard.clientWidth - 50);
  const y = Math.random() * (gameBoard.clientHeight - 50);
  insect.style.left = `${x}px`;
  insect.style.top = `${y}px`;

  insect.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = score;
    insect.remove();
  });

  gameBoard.appendChild(insect);

  setTimeout(() => {
    if (gameBoard.contains(insect)) {
      insect.remove();
    }
  }, 3000);
}

function startGame() {
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;

  startBtn.classList.add('hidden');
  gameBoard.classList.remove('hidden');

  createInsect();

  setTimeout(() => {
    insectInterval = setInterval(() => {
      const numberOfInsects = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < numberOfInsects; i++) {
        createInsect();
      }
    }, 1000);
  }, 5000);

  countdownInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(insectInterval);
      clearInterval(countdownInterval);
      gameBoard.classList.add('hidden');
      alert(`Game Over! Your score is ${score}`);
      startBtn.classList.remove('hidden');
    }
  }, 1000);
}

startBtn.addEventListener('click', startGame);
