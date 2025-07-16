const rounds = [
  { word: "C__sa", correct1: "a", options: ["a", "e", "i"], meaning: "Construcción para habitar." },
  { word: "L__bro", correct1: "i", options: ["e", "i", "o"], meaning: "Conjunto de hojas escritas o impresas." },
  { word: "M__no", correct1: "a", options: ["a", "e", "u"], meaning: "Parte del cuerpo usada para agarrar o tocar." },
  { word: "S__lla", correct1: "i", options: ["o", "u", "i"], meaning: "Mueble para sentarse." },
  { word: "R__sa", correct1: "o", options: ["a", "e", "o"], meaning: "Flor generalmente roja o rosada." },
  { word: "C__lor", correct1s: "o", options: ["a", "o", "u"], meaning: "Sensación visual causada por la luz." }
];

let currentRound = 0;

function loadRound() {
  if (currentRound < rounds.length) {
    const roundData = rounds[currentRound];
    document.getElementById("word-display").textContent = roundData.word;
    document.getElementById("round-label").textContent = `Ronda ${currentRound + 1} de ${rounds.length}`;
    const optionsDiv = document.getElementById("options");
    const result = document.getElementById("result");
    result.textContent = "";
    document.body.style.backgroundColor = "#f9f5ed";
    optionsDiv.innerHTML = "";

    roundData.options.forEach(letter => {
      const btn = document.createElement("button");
      btn.textContent = letter;
      btn.onclick = () => checkAnswer(letter, roundData.correct1);
      optionsDiv.appendChild(btn);
    });
  } else {
    document.getElementById("word-display").textContent = "¡Juego terminado!";
    document.getElementById("options").innerHTML = "";
    document.getElementById("result").textContent = "¡Bien hecho!";
    document.getElementById("round-label").textContent = "";
  }
}

function checkAnswer(selected, correct1) {
  const result = document.getElementById("result");
  const roundData = rounds[currentRound];

  if (selected === correct1) {
    result.innerHTML = `¡Correcto!<br><strong>${roundData.word.replace("__", correct1)}</strong>: ${roundData.meaning}`;
    result.style.color = "green";
    document.body.style.backgroundColor = "#d4edda";
    currentRound++;
    setTimeout(loadRound, 3000); // Espera más para que lean el significado
  } else {
    result.textContent = "Inténtalo de nuevo.";
    result.style.color = "red";
    document.body.style.backgroundColor = "#f8d7da";
  }
}
window.onload = loadRound;let numero, numero2, numero3;

