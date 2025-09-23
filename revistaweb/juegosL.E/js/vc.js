document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('comenzarvc');
    const gridContainer = document.getElementById('grid-container');
    const feedback = document.getElementById('feedback');
    const scoreCounter = document.getElementById('scoreCounter');
    const roundCounter = document.getElementById('roundCounter');

    const vowels = 'AEIOU';
    const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
    const numItems = 6;
    let score = 0;
    let currentRound = 0;
    const maxRounds = 6;

    function generateRandomCharacters() {
        const characters = [];
        const isVowel = [];
        
        // Asegurar que al menos una vocal esté presente en el grupo
        const hasVowel = Math.random() < 1; // 100% de probabilidad de tener una vocal
        const numVowels = hasVowel ? 1 : 0;
        const vowelIndices = new Set();
        while(vowelIndices.size < numVowels) {
            vowelIndices.add(Math.floor(Math.random() * numItems));
        }

        for (let i = 0; i < numItems; i++) {
            if (vowelIndices.has(i)) {
                const randomChar = vowels.charAt(Math.floor(Math.random() * vowels.length));
                characters.push(randomChar);
                isVowel.push(true);
            } else {
                const randomChar = consonants.charAt(Math.floor(Math.random() * consonants.length));
                characters.push(randomChar);
                isVowel.push(false);
            }
        }
        
        // Mezclar los caracteres
        for (let i = characters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [characters[i], characters[j]] = [characters[j], characters[i]];
            [isVowel[i], isVowel[j]] = [isVowel[j], isVowel[i]];
        }
        
        return { characters, isVowel };
    }

    function createGrid() {
        if (currentRound >= maxRounds) {
            endGame();
            return;
        }

        gridContainer.innerHTML = '';
        const { characters, isVowel } = generateRandomCharacters();
        
        characters.forEach((char, index) => {
            const item = document.createElement('div');
            item.classList.add('grid-item');
            item.textContent = char;
            
            if (isVowel[index]) {
                item.classList.add('vowel');
            } else {
                item.classList.add('consonant');
            }
            
            item.addEventListener('click', () => handleItemClick(isVowel[index]));
            gridContainer.appendChild(item);
        });
        
        // Aumentar el contador de ronda
        roundCounter.textContent = ++currentRound;
    }

    function handleItemClick(isCorrect) {
        if (isCorrect) {
            score++;
            scoreCounter.textContent = score;
            feedback.textContent = '¡Correcto! 👍';
            feedback.classList.remove('incorrect');
            feedback.classList.add('correct');
        } else {
            feedback.textContent = '¡Incorrecto! 👎';
            feedback.classList.remove('correct');
            feedback.classList.add('incorrect');
        }

        // Desactivar el clic después de una respuesta para evitar trampas
        const items = document.querySelectorAll('.grid-item');
        items.forEach(item => {
            item.style.pointerEvents = 'none';
        });

        // Pasar a la siguiente ronda
        setTimeout(() => {
            feedback.textContent = '';
            createGrid();
            // Reactivar el clic
            items.forEach(item => {
                item.style.pointerEvents = 'auto';
            });
        }, 1500); 
    }

    function endGame() {
        gridContainer.innerHTML = '';
        const message = document.createElement('div');
        message.classList.add('game-over-message');
        message.textContent = `¡Juego terminado! Lograste ${score} aciertos.`;
        gridContainer.appendChild(message);
        startButton.textContent = 'Jugar de nuevo';
        startButton.style.display = 'block';
    }

    function resetGame() {
        score = 0;
        currentRound = 0;
        scoreCounter.textContent = score;
        roundCounter.textContent = currentRound;
        gridContainer.innerHTML = '';
        feedback.textContent = '';
    }

    startButton.addEventListener('click', () => {
        resetGame();
        startButton.style.display = 'none';
        createGrid();
    });
});