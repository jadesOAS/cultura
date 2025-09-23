document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const gridContainer = document.getElementById('grid-identificar');
    const feedback = document.getElementById('feedback');

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%&*?';
    
    const allCharacters = (letters + numbers + symbols).split('');
    const numItems = 6;
    
    function generateRandomCharacters() {
        const characters = [];
        const isLetter = [];
        
        // Determinar cuántas letras habrá (al menos una)
        const numLetters = Math.floor(Math.random() * (numItems - 1)) + 1;
        const letterIndices = new Set();
        while(letterIndices.size < numLetters) {
            letterIndices.add(Math.floor(Math.random() * numItems));
        }

        for (let i = 0; i < numItems; i++) {
            if (letterIndices.has(i)) {
                // Es una letra
                const randomChar = letters.charAt(Math.floor(Math.random() * letters.length));
                characters.push(randomChar);
                isLetter.push(true);
            } else {
                // Es un número o símbolo
                const nonLetters = numbers + symbols;
                const randomChar = nonLetters.charAt(Math.floor(Math.random() * nonLetters.length));
                characters.push(randomChar);
                isLetter.push(false);
            }
        }
        
        // Mezclar los caracteres para que no aparezcan en un orden predecible
        for (let i = characters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [characters[i], characters[j]] = [characters[j], characters[i]];
            [isLetter[i], isLetter[j]] = [isLetter[j], isLetter[i]];
        }
        
        return { characters, isLetter };
    }

    function createGrid() {
        gridContainer.innerHTML = '';
        const { characters, isLetter } = generateRandomCharacters();
        
        characters.forEach((char, index) => {
            const item = document.createElement('div');
            item.classList.add('grid-item');
            item.textContent = char;
            
            if (isLetter[index]) {
                item.classList.add('is-letter');
            } else {
                item.classList.add('is-symbol');
            }
            
            item.addEventListener('click', () => handleItemClick(isLetter[index]));
            gridContainer.appendChild(item);
        });
    }

    function handleItemClick(isCorrect) {
        if (isCorrect) {
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

        // Opcionalmente, puedes generar una nueva ronda después de un tiempo
        setTimeout(() => {
            feedback.textContent = '';
            createGrid();
            // Reactivar el clic
            items.forEach(item => {
                item.style.pointerEvents = 'auto';
            });
        }, 1500); 
    }

    startButton.addEventListener('click', () => {
        startButton.style.display = 'none';
        createGrid();
        feedback.textContent = '';
    });
});