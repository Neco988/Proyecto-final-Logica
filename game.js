document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('pacman');
    const context = canvas.getContext('2d');
    const restartButton = document.getElementById('restartButton');

    let pacMan, obstacles, gameOver;

    function initializeGame() {
        pacMan = {
            x: 50,
            y: 50,
            size: 20,
            speed: 10,  // Aumenta la velocidad de Pac-Man
            direction: 0  // Dirección inicial (0: derecha, 1: abajo, 2: izquierda, 3: arriba)
        };

        obstacles = [
            {x: 100, y: 100, width: 50, height: 50},
            {x: 200, y: 150, width: 100, height: 20},
            {x: 300, y: 300, width: 50, height: 100}
        ];

        gameOver = false;
        restartButton.style.display = 'none';
        drawPacMan();
    }

    function drawBackground() {
        context.fillStyle = '#000'; // Fondo del canvas
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawObstacles() {
        context.fillStyle = '#00f'; // Color de los obstáculos
        obstacles.forEach(obstacle => {
            context.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });
    }

    function drawPacMan() {
        drawBackground();
        drawObstacles();
        context.beginPath();
        let startAngle, endAngle;
        switch (pacMan.direction) {
            case 0: // Derecha
                startAngle = 0.2 * Math.PI;
                endAngle = 1.8 * Math.PI;
                break;
            case 1: // Abajo
                startAngle = 0.7 * Math.PI;
                endAngle = 2.3 * Math.PI;
                break;
            case 2: // Izquierda
                startAngle = 1.2 * Math.PI;
                endAngle = 2.8 * Math.PI;
                break;
            case 3: // Arriba
                startAngle = 1.7 * Math.PI;
                endAngle = 0.3 * Math.PI;
                break;
        }
        context.arc(pacMan.x, pacMan.y, pacMan.size, startAngle, endAngle);
        context.lineTo(pacMan.x, pacMan.y);
        context.fillStyle = 'yellow';
        context.fill();
        context.closePath();

        if (gameOver) {
            context.font = "40px Arial";
            context.fillStyle = "red";
            context.textAlign = "center";
            context.fillText("Game Over", canvas.width / 2, canvas.height / 2);
            restartButton.style.display = 'block';
        }
    }

    function checkCollision(newX, newY) {
        return obstacles.some(obstacle => {
            return newX + pacMan.size > obstacle.x &&
                   newX - pacMan.size < obstacle.x + obstacle.width &&
                   newY + pacMan.size > obstacle.y &&
                   newY - pacMan.size < obstacle.y + obstacle.height;
        });
    }

    function movePacMan(event) {
        if (gameOver) return;  // Detiene el movimiento si el juego ha terminado

        let newX = pacMan.x;
        let newY = pacMan.y;

        switch(event.key) {
            case 'ArrowUp':
                newY -= pacMan.speed;
                pacMan.direction = 3;
                break;
            case 'ArrowDown':
                newY += pacMan.speed;
                pacMan.direction = 1;
                break;
            case 'ArrowLeft':
                newX -= pacMan.speed;
                pacMan.direction = 2;
                break;
            case 'ArrowRight':
                newX += pacMan.speed;
                pacMan.direction = 0;
                break;
        }

        if (newX - pacMan.size > 0 &&
            newX + pacMan.size < canvas.width &&
            newY - pacMan.size > 0 &&
            newY + pacMan.size < canvas.height) {
            if (checkCollision(newX, newY)) {
                gameOver = true;  // Marca el juego como terminado si hay una colisión
            } else {
                pacMan.x = newX;
                pacMan.y = newY;
            }
        }

        drawPacMan();
    }

    document.addEventListener('keydown', movePacMan);
    restartButton.addEventListener('click', initializeGame);

    initializeGame();  // Inicializa el juego al cargar la página
});
