const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const difficultySelect = document.getElementById('difficulty');
const startButton = document.getElementById('start-game');

let score = 0;
let timer = 30;
let moleTimeout; // To control the mole's disappearing speed
let moleInterval; // For the mole appearance interval
let gameInterval; // For the game timer

function startGame() {
    // Reset everything
    score = 0;
    timer = 30;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timer;

    clearInterval(moleInterval);
    clearTimeout(moleTimeout);
    clearInterval(gameInterval);

    const difficulty = difficultySelect.value;

    // Adjust mole appearance speed and mole "stay time" based on difficulty
    let appearanceSpeed = difficulty === 'easy' ? 1200 : difficulty === 'medium' ? 800 : 500; // Interval between mole appearances
    let moleStayTime = difficulty === 'easy' ? 1000 : difficulty === 'medium' ? 700 : 400; // Time the mole stays visible

    // Start game timer
    gameInterval = setInterval(updateTimer, 1000);

    // Mole appearance logic
    moleInterval = setInterval(() => {
        showMole(moleStayTime);
    }, appearanceSpeed);
}

function updateTimer() {
    timer--;
    timerDisplay.textContent = timer;

    if (timer <= 0) {
        clearInterval(moleInterval);
        clearTimeout(moleTimeout);
        clearInterval(gameInterval);
        alert(`Game Over! Your final score is ${score}`);
    }
}

function showMole(moleStayTime) {
    // Select a random hole
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];

    // Add mole to the selected hole
    const mole = document.createElement('div');
    mole.classList.add('mole');
    hole.appendChild(mole);
    hole.classList.add('active');

    // Add click event listener to the mole
    mole.addEventListener('click', () => {
        if (hole.classList.contains('active')) {
            score++;
            scoreDisplay.textContent = score;
            hole.classList.remove('active');
            mole.remove();
        }
    });

    // Remove mole after the moleStayTime (depending on difficulty)
    moleTimeout = setTimeout(() => {
        if (hole.classList.contains('active')) {
            hole.classList.remove('active');
            mole.remove();
        }
    }, moleStayTime);
}

startButton.addEventListener('click', startGame);
