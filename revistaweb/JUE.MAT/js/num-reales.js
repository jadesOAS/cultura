document.addEventListener('DOMContentLoaded', () => {
    const numbersContainer = document.getElementById('numbers-container');
    const rationalZone = document.getElementById('rational-zone');
    const irrationalZone = document.getElementById('irrational-zone');
    const checkButton = document.getElementById('check-button');
    const resetButton = document.getElementById('reset-button');
    const messageDisplay = document.getElementById('message');

    // Define los 6 números, con su tipo y valor para la pantalla.
    const numbers = [
        { value: '4/5', type: 'rational' },
        { value: '√2', type: 'irrational' },
        { value: '0.75', type: 'rational' },
        { value: 'π', type: 'irrational' },
        { value: '5', type: 'rational' },
        { value: '√3', type: 'irrational' }
    ];

    // Función para mezclar un array
    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    // Función para crear las tarjetas de números
    const createNumberCards = () => {
        numbersContainer.innerHTML = '';
        shuffle(numbers);
        numbers.forEach(num => {
            const card = document.createElement('div');
            card.className = 'number-card';
            card.textContent = num.value;
            card.dataset.type = num.type;
            card.setAttribute('draggable', true);
            numbersContainer.appendChild(card);
        });
    };

    // Funciones para arrastrar y soltar
    const handleDragStart = (e) => {
        e.dataTransfer.setData('text/plain', e.target.textContent);
        e.dataTransfer.setData('data-type', e.target.dataset.type);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        const dataType = e.dataTransfer.getData('data-type');
        const draggedElement = [...document.querySelectorAll('.number-card')].find(el => el.textContent === data);
        
        if (e.target.classList.contains('drop-zone')) {
            e.target.appendChild(draggedElement);
        }
    };

    // Asignar los eventos a los elementos
    document.addEventListener('dragstart', handleDragStart);
    rationalZone.addEventListener('dragover', handleDragOver);
    rationalZone.addEventListener('drop', handleDrop);
    irrationalZone.addEventListener('dragover', handleDragOver);
    irrationalZone.addEventListener('drop', handleDrop);

    // Función para verificar la respuesta
    const checkAnswers = () => {
        const rationalCards = rationalZone.querySelectorAll('.number-card');
        const irrationalCards = irrationalZone.querySelectorAll('.number-card');

        const rationalCorrect = Array.from(rationalCards).every(card => card.dataset.type === 'rational');
        const irrationalCorrect = Array.from(irrationalCards).every(card => card.dataset.type === 'irrational');

        if (rationalCards.length === 3 && irrationalCards.length === 3 && rationalCorrect && irrationalCorrect) {
            messageDisplay.textContent = '¡Felicidades, lo lograste! 🎉';
            messageDisplay.style.color = '#198754';
        } else {
            messageDisplay.textContent = 'Inténtalo de nuevo. 🤔';
            messageDisplay.style.color = '#dc3545';
        }
    };

    // Función para reiniciar el juego
    const resetGame = () => {
        rationalZone.innerHTML = '<h2>Números Racionales</h2>';
        irrationalZone.innerHTML = '<h2>Números Irracionales</h2>';
        messageDisplay.textContent = '';
        createNumberCards();
    };

    // Asignar eventos a los botones
    checkButton.addEventListener('click', checkAnswers);
    resetButton.addEventListener('click', resetGame);

    // Iniciar el juego
    createNumberCards();
});