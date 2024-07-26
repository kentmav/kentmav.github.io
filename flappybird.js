const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load images
const birdImg = new Image();
birdImg.src = 'images/flappybird.png';
const bgImg = new Image();
bgImg.src = 'images/flappybirdbg.png';
const pipeNorthImg = new Image();
pipeNorthImg.src = 'images/toppipe.png';
const pipeSouthImg = new Image();
pipeSouthImg.src = 'images/bottompipe.png';

// Log to ensure images are loading
birdImg.onload = () => console.log('Bird image loaded');
bgImg.onload = () => console.log('Background image loaded');
pipeNorthImg.onload = () => console.log('Top pipe image loaded');
pipeSouthImg.onload = () => console.log('Bottom pipe image loaded');

// Desired sizes
const birdWidth = 34; // Adjust as needed
const birdHeight = 24; // Adjust as needed
const pipeWidth = 52; // Adjust as needed
const pipeHeight = 320; // Adjust as needed
const fgHeight = 112; // Adjust as needed

// Some variables
let gap = 85;
let constant;
let bX = 10;
let bY = 200;   // Start the bird lower on the screen
let gravity = 0.4;  // Increased gravity
let lift = -5;       // Decreased jump strength
let velocity = 0;
let score = 0;

// Audio files
const fly = new Audio();
const scor = new Audio();
fly.src = 'audio/fly.wav'; // Ensure the path is correct (if you have audio files)
scor.src = 'audio/score.wav'; // Ensure the path is correct (if you have audio files)

// On key down
document.addEventListener('keydown', moveUp);

function moveUp() {
    velocity = lift;
    fly.play();
}

// Pipe coordinates
let pipe = [];

pipe[0] = {
    x: canvas.width,
    y: 0
};

// Draw images
function draw() {
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

    for (let i = 0; i < pipe.length; i++) {
        constant = pipeHeight + gap;
        ctx.drawImage(pipeNorthImg, pipe[i].x, pipe[i].y, pipeWidth, pipeHeight);
        ctx.drawImage(pipeSouthImg, pipe[i].x, pipe[i].y + constant, pipeWidth, pipeHeight);

        pipe[i].x--;

        if (pipe[i].x === 125) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeHeight) - pipeHeight
            });
        }

        // Detect collision
        if (bX + birdWidth >= pipe[i].x && bX <= pipe[i].x + pipeWidth && (bY <= pipe[i].y + pipeHeight || bY + birdHeight >= pipe[i].y + constant) || bY + birdHeight >= canvas.height) {
            location.reload(); // Reload the page
        }

        if (pipe[i].x === 5) {
            score++;
            scor.play();
        }
    }

    ctx.drawImage(birdImg, bX, bY, birdWidth, birdHeight);

    velocity += gravity;
    bY += velocity;

    // Prevent bird from going off the top of the canvas
    if (bY < 0) {
        bY = 0;
        velocity = 0;
    }

    // Detect collision with the ground
    if (bY + birdHeight >= canvas.height) {
        location.reload(); // Reload the page
    }

    ctx.fillStyle = '#000';
    ctx.font = '20px Verdana';
    ctx.fillText('Score : ' + score, 10, canvas.height - 20);

    requestAnimationFrame(draw);
}

// Wait until all images are loaded before starting the game
window.onload = function() {
    draw();
};
