const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 15;
const canvasSize = 280;
let snake = [{ x: 2 * box, y: 2 * box }];
let direction = null;
let food = {};
let letters = "ABCDEFGHIJKLMNñOPQRSTUVWXYZ".split("");
let currentLetterIndex = 0;
let gameInterval;
let gameRunning = false;

const status = document.getElementById("status");
const startBtn = document.getElementById("startBtn");

// Función para generar letra siguiente
function placeFood() {
  const x = Math.floor(Math.random() * (canvasSize / box)) * box;
  const y = Math.floor(Math.random() * (canvasSize / box)) * box;
  food = { x, y, letter: letters[currentLetterIndex] };
}

// Función para hablar letra
function speakLetter(letter) {
  const utter = new SpeechSynthesisUtterance(letter);
  utter.lang = "es";
  speechSynthesis.speak(utter);
}

// Dibujar elementos
function draw() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  // Dibujar snake
  ctx.fillStyle = "lime";
  snake.forEach((part) => {
    ctx.fillRect(part.x, part.y, box, box);
  });

  // Dibujar letra
  ctx.fillStyle = "white";
  ctx.font = "15px Arial";
  ctx.fillText(food.letter, food.x + 5, food.y + 15);
}

// Movimiento
function update() {
  const head = { ...snake[0] };

  switch (direction) {
    case "LEFT": head.x -= box; break;
    case "UP": head.y -= box; break;
    case "RIGHT": head.x += box; break;
    case "DOWN": head.y += box; break;
    default: return;
  }

  // Verificar colisiones
  if (
    head.x < 0 || head.x >= canvasSize ||
    head.y < 0 || head.y >= canvasSize ||
    snake.some(seg => seg.x === head.x && seg.y === head.y)
  ) {
    endGame("¡Perdiste!");
    return;
  }

  snake.unshift(head);

  // Verificar si comió la letra
  if (head.x === food.x && head.y === food.y) {
    speakLetter(food.letter);
    currentLetterIndex++;
    if (currentLetterIndex >= letters.length) {
      endGame("¡Ganaste! Completaste el abecedario.");
      return;
    }
    placeFood();
  } else {
    snake.pop();
  }

  draw();
}

// Dirección desde teclado
document.addEventListener("keydown", (e) => {
  if (!gameRunning) return;
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

// Iniciar juego
startBtn.addEventListener("click", () => {
  snake = [{ x: 5 * box, y: 5 * box }];
  direction = null;
  currentLetterIndex = 0;
  gameRunning = true;
  status.textContent = "";
  placeFood();
  draw();
  clearInterval(gameInterval);
  gameInterval = setInterval(update, 150);
});

function endGame(message) {
  clearInterval(gameInterval);
  gameRunning = false;
  status.textContent = message;
}
// Obtén los elementos de los botones
const upBtn = document.getElementById("upBtn");
const downBtn = document.getElementById("downBtn");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

// Agrega los event listeners
upBtn.addEventListener("click", () => {
    if (direction !== "DOWN") direction = "UP";
});

downBtn.addEventListener("click", () => {
    if (direction !== "UP") direction = "DOWN";
});

leftBtn.addEventListener("click", () => {
    if (direction !== "RIGHT") direction = "LEFT";
});

rightBtn.addEventListener("click", () => {
    if (direction !== "LEFT") direction = "RIGHT";
});

