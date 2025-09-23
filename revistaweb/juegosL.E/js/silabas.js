document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('comenzarsilabas');
    const optionsContainer = document.getElementById('optionsContainer');
    const consonantOptionsDiv = document.getElementById('consonantOptions');
    const vowelOptionsDiv = document.getElementById('vowelOptions');
    const consonantSlot = document.getElementById('consonantSlot');
    const vowelSlot = document.getElementById('vowelSlot');
    const speakButton = document.getElementById('speakButton');
    const resetButton = document.getElementById('resetButton');
    
    const consonants = ['M', 'P', 'S'];
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    
    let selectedConsonant = null;
    let selectedVowel = null;

    // Ocultar las opciones y botones al inicio
    optionsContainer.classList.add('hidden');
    speakButton.classList.add('hidden');
    resetButton.classList.add('hidden');

    function createLetterButtons(letters, parentElement, isVowel) {
        parentElement.innerHTML = '';
        letters.forEach(letter => {
            const button = document.createElement('button');
            button.textContent = letter;
            button.classList.add('letter-button');
            if (isVowel) {
                button.classList.add('vowel');
            }
            button.addEventListener('click', () => handleLetterClick(letter, isVowel));
            parentElement.appendChild(button);
        });
    }

    function handleLetterClick(letter, isVowel) {
        if (isVowel) {
            selectedVowel = letter;
            vowelSlot.textContent = letter;
            vowelSlot.classList.add('selected');
        } else {
            selectedConsonant = letter;
            consonantSlot.textContent = letter;
            consonantSlot.classList.add('selected');
        }

        // Si ambas letras están seleccionadas, habilita el botón de hablar
        if (selectedConsonant && selectedVowel) {
            speakButton.classList.remove('hidden');
        }
    }

    function speakSyllable() {
        if (selectedConsonant && selectedVowel) {
            const syllable = selectedConsonant + selectedVowel;
            // Aquí se usa la API de Web Speech Synthesis para la voz
            const utterance = new SpeechSynthesisUtterance(syllable);
            
            // Configurar el idioma para un acento español (latinoamericano)
            // 'es' es un buen valor por defecto
            // También se puede usar 'es-ES' (España) o 'es-MX' (México)
            utterance.lang = 'es'; 
            
            speechSynthesis.speak(utterance);
        }
    }

    function resetSlots() {
        selectedConsonant = null;
        selectedVowel = null;
        consonantSlot.textContent = '?';
        consonantSlot.classList.remove('selected');
        vowelSlot.textContent = '?';
        vowelSlot.classList.remove('selected');
        speakButton.classList.add('hidden');
    }

    function startGame() {
        startButton.classList.add('hidden');
        optionsContainer.classList.remove('hidden');
        resetButton.classList.remove('hidden');
        createLetterButtons(consonants, consonantOptionsDiv, false);
        createLetterButtons(vowels, vowelOptionsDiv, true);
        resetSlots();
    }

    startButton.addEventListener('click', startGame);
    speakButton.addEventListener('click', speakSyllable);
    resetButton.addEventListener('click', resetSlots);
});