const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;

let playerPaddle = { x: 0, y: canvas.height / 2 - paddleHeight / 2, dy: 0 };
let aiPaddle = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, dy: 4 };
let ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 4, dy: 4 };

function drawRect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx *= -1;
}

function movePaddles() {
    playerPaddle.y += playerPaddle.dy;
    aiPaddle.y += aiPaddle.dy;

    if (playerPaddle.y < 0) playerPaddle.y = 0;
    if (playerPaddle.y + paddleHeight > canvas.height) playerPaddle.y = canvas.height - paddleHeight;

    if (ball.y < aiPaddle.y) aiPaddle.y -= aiPaddle.dy;
    if (ball.y > aiPaddle.y + paddleHeight) aiPaddle.y += aiPaddle.dy;

    if (aiPaddle.y < 0) aiPaddle.y = 0;
    if (aiPaddle.y + paddleHeight > canvas.height) aiPaddle.y = canvas.height - paddleHeight;
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y < 0 || ball.y > canvas.height) {
        ball.dy *= -1;
    }

    let paddle = ball.x < canvas.width / 2 ? playerPaddle : aiPaddle;
    if (ball.x < playerPaddle.x + paddleWidth && ball.y > playerPaddle.y && ball.y < playerPaddle.y + paddleHeight) {
        ball.dx *= -1;
    } else if (ball.x + ballRadius > aiPaddle.x && ball.y > aiPaddle.y && ball.y < aiPaddle.y + paddleHeight) {
        ball.dx *= -1;
    }

    if (ball.x < 0 || ball.x > canvas.width) {
        resetBall();
    }
}

function update() {
    movePaddles();
    moveBall();
}

function render() {
    drawRect(0, 0, canvas.width, canvas.height, '#000');
    drawRect(playerPaddle.x, playerPaddle.y, paddleWidth, paddleHeight, '#FFF');
    drawRect(aiPaddle.x, aiPaddle.y, paddleWidth, paddleHeight, '#FFF');
    drawCircle(ball.x, ball.y, ballRadius, '#FFF');
}

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp') playerPaddle.dy = -6;
    else if (event.key === 'ArrowDown') playerPaddle.dy = 6;
});

document.addEventListener('keyup', event => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') playerPaddle.dy = 0;
});

gameLoop();