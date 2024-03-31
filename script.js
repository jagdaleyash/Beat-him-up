document.addEventListener("DOMContentLoaded", function() {
    const balloonContainer = document.getElementById("balloon-container");
    const gameOverScreen = document.getElementById("game-over-screen");
    const restartBtn = document.getElementById("restart-btn");
    const scoreDisplay = document.getElementById("score");
    const missedDisplay = document.getElementById("missed");
    const finalScoreDisplay = document.getElementById("final-score");

    let balloonCount = 0;
    let score = 0;
    let missed = 0;
    let generationSpeed = 1000; // Initial generation speed in milliseconds
    let gameOver = false;

    function createBalloon() {
        if (!gameOver) {
            const balloon = document.createElement("div");
            balloon.classList.add("balloon");
            balloon.style.left = Math.random() * 550 + "px"; // Random position within the container
            balloonContainer.appendChild(balloon);
            
            balloonCount++;

            balloon.addEventListener("click", function() {
                popBalloon(balloon);
            });

            setTimeout(() => {
                if (!gameOver && !balloon.classList.contains("popped")) {
                    balloon.remove();
                    balloonCount--;
                    missed++;
                    updateMissed();
                    if (missed >= 9) {
                        gameOver = true;
                        showGameOverScreen();
                    }
                }
            }, 5000);
        }
    }

    function popBalloon(balloon) {
        if (!gameOver) {
            balloon.classList.add("popped");
            balloon.style.opacity = "0";
            setTimeout(() => {
                balloon.remove();
                balloonCount--;
                score++;
                updateScore();
            }, 200);
        }
    }

    function showGameOverScreen() {
        gameOverScreen.classList.remove("hidden");
        finalScoreDisplay.textContent = score;
    }

    restartBtn.addEventListener("click", function() {
        gameOver = false;
        gameOverScreen.classList.add("hidden");
        balloonContainer.innerHTML = ""; // Clear balloons
        score = 0;
        missed = 0;
        updateScore();
        updateMissed();
        startGame();
    });

    function startGame() {
        generationSpeed -= 100; // Increase generation speed
        if (generationSpeed < 100) {
            generationSpeed = 100; // Set minimum generation speed
        }
        setInterval(createBalloon, generationSpeed);
    }

    function updateScore() {
        scoreDisplay.textContent = score;
    }

    function updateMissed() {
        missedDisplay.textContent = missed;
    }

    startGame(); // Start the game initially
});
