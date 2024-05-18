const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const cellSize = 20;
const screenWidth = canvas.width / cellSize;
const screenHeight = canvas.height / cellSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: Math.floor(Math.random() * screenWidth), y: Math.floor(Math.random() * screenHeight) };
let dx = 0;
let dy = 0;
let score = 0;
let gameInterval;

function drawSnake() {
  snake.forEach(segment => {
    ctx.fillStyle = "green";
    ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
    ctx.strokeStyle = "darkgreen";
    ctx.strokeRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
  });
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Ajustar a posição da cabeça se ela atingir uma parede
  if (head.x < 0) head.x = screenWidth - 1;
  if (head.x >= screenWidth) head.x = 0;
  if (head.y < 0) head.y = screenHeight - 1;
  if (head.y >= screenHeight) head.y = 0;

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    if (score === 15) {
      showMessage();
    }
    food = { x: Math.floor(Math.random() * screenWidth), y: Math.floor(Math.random() * screenHeight) };
  } else {
    snake.pop();
  }
}


function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

function gameOver() {
  clearInterval(gameInterval);
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  moveSnake();

  if (snake[0].x < 0 || snake[0].x >= screenWidth || snake[0].y < 0 || snake[0].y >= screenHeight) {
      gameOver();
      return;
    }
  
    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
        gameOver();
        return;
      }
    }
  
    drawFood();
    drawSnake();
    drawScore();
  }
  
  function showMessage() {
    clearInterval(gameInterval);
    document.getElementById("overlay").style.display = "block";
    document.getElementById("message").style.display = "block";
    createHearts();
  }
  
  function celebrate() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("message").style.display = "none";
    // Launch confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    // Show hearts after confetti
    setTimeout(function() {
      createHearts();
      showMessage2();
    }, 3000); // Adjust the delay as needed
  }
  
  function showMessage2() {
    // Show the second message
    const message2 = document.createElement('div');
    message2.innerHTML = "<h1>PS: AGORA É OFICIAL ESSE NAMORO KKKK❤️</h1>";
    message2.style.position = "fixed";
    message2.style.top = "50%";
    message2.style.left = "50%";
    message2.style.transform = "translate(-50%, -50%)";
    message2.style.backgroundColor = "#fff";
    message2.style.border = "2px solid #333";
    message2.style.borderRadius = "10px";
    message2.style.padding = "20px";
    message2.style.width = "400px";
    message2.style.textAlign = "center";
    message2.style.zIndex = "1000";
    document.body.appendChild(message2);
  }
  
  function createHearts() {
    for (let i = 0; i < 30; i++) {
      const heart = document.createElement('div');
      heart.classList.add('heart');
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.animationDelay = Math.random() * 2 + 's';
      document.body.appendChild(heart);
  
      setTimeout(() => {
        heart.remove();
      }, 2000);
    }
  }
  
  document.getElementById("startButton").addEventListener("click", function() {
    // Redefinir variáveis do jogo
    snake = [{ x: 10, y: 10 }];
    food = { x: Math.floor(Math.random() * screenWidth), y: Math.floor(Math.random() * screenHeight) };
    dx = 0;
    dy = 0;
    score = 0;

    // Limpar o intervalo do jogo atual
    clearInterval(gameInterval);

    // Remover qualquer mensagem ou overlay
    document.getElementById("message").style.display = "none";
    document.getElementById("overlay").style.display = "none";

    // Remover a segunda mensagem, se existir
    const message2 = document.getElementById("message2");
    if (message2) {
      message2.remove();
    }

    // Limpar o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Reiniciar o jogo
    gameInterval = setInterval(update, 100);
}); 
  
  document.getElementById("upButton").addEventListener("click", function() {
    if (dy === 0) {
      dx = 0;
      dy = -1;
    }
  });
  
  document.getElementById("downButton").addEventListener("click", function() {
    if (dy === 0) {
      dx = 0;
      dy = 1;
    }
  });
  
  document.getElementById("leftButton").addEventListener("click", function() {
    if (dx === 0) {
      dx = -1;
      dy = 0;
    }
  });
  
  document.getElementById("rightButton").addEventListener("click", function() {
    if (dx === 0) {
      dx = 1;
      dy = 0;
    }
  });
  