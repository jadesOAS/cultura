 let currentNumber = 0;
    let score = 0;

    function startGame() {
      score = 0;
      document.getElementById("score").textContent = "Puntos: " + score;
      document.getElementById("result").textContent = "";
      document.getElementById("parBtn").disabled = false;
      document.getElementById("imparBtn").disabled = false;
      generateNumber();
    }

    function generateNumber() {
      currentNumber = Math.floor(Math.random() * 100) + 1; // Número entre 1 y 100
      document.getElementById("number").textContent = currentNumber;
    }

    function checkAnswer(answer) {
      const isEven = currentNumber % 2 === 0;
      if ((answer === "par" && isEven) || (answer === "impar" && !isEven)) {
        score++;
        document.getElementById("result").textContent = "✅ Correcto";
        document.getElementById("result").style.color = "#2ecc71"; // verde
      } else {
        if (score > 0) score--;
        document.getElementById("result").textContent = "❌ Incorrecto";
        document.getElementById("result").style.color = "#e74c3c"; // rojo
      }
      document.getElementById("score").textContent = "Puntos: " + score;
      generateNumber();
    }