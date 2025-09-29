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
            card.addEventListener(´touchstart', handleToouchStart);
            card.setAttribute('draggable', true);
            numbersContainer.appendChild(card);
        });
    };
    // Variable global para almacenar el elemento que estamos arrastrando
let draggingCard = null;

// --- Adaptación para Pantallas Táctiles (Touch Events) ---

// 1. Inicia el arrastre al tocar la tarjeta
const handleTouchStart = (e) => {
    // Solo procesamos el primer toque
    if (e.touches.length !== 1) return; 

    // Guardar la tarjeta que se está tocando
    draggingCard = e.currentTarget;
    
    // Almacenar las coordenadas iniciales del toque
    const touch = e.touches[0];
    const offsetX = touch.clientX - draggingCard.getBoundingClientRect().left;
    const offsetY = touch.clientY - draggingCard.getBoundingClientRect().top;
    
    // Guardar el offset en el elemento para un arrastre suave
    draggingCard.dataset.offsetX = offsetX;
    draggingCard.dataset.offsetY = offsetY;

    // Configurar la tarjeta para que se pueda mover
    draggingCard.style.position = 'absolute';
    draggingCard.style.zIndex = '1000';
    draggingCard.style.opacity = '0.8';
};

// 2. Mueve la tarjeta mientras se arrastra el dedo
const handleTouchMove = (e) => {
    if (!draggingCard) return;
    e.preventDefault(); // IMPORTANTE: Previene el desplazamiento de la página mientras arrastramos

    const touch = e.touches[0];
    const offsetX = parseFloat(draggingCard.dataset.offsetX);
    const offsetY = parseFloat(draggingCard.dataset.offsetY);

    // Mover la tarjeta para seguir el dedo, compensando el offset
    draggingCard.style.left = `${touch.clientX - offsetX}px`;
    draggingCard.style.top = `${touch.clientY - offsetY}px`;
};

// 3. Finaliza el arrastre y suelta la tarjeta
const handleTouchEnd = (e) => {
    if (!draggingCard) return;
    
    // Obtener la posición del último toque
    const touch = e.changedTouches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    // Identificar el elemento debajo del dedo (la zona de soltar)
    // Esconder la tarjeta temporalmente para que elementFromPoint detecte lo que hay debajo
    draggingCard.style.visibility = 'hidden';
    const targetElement = document.elementFromPoint(x, y);
    draggingCard.style.visibility = 'visible';
    
    // Intentar encontrar la drop-zone correcta
    const dropZone = targetElement.closest('.drop-zone');

    if (dropZone) {
        // SOLTADO EXITOSO: Mover la tarjeta a la zona
        
        // Restaurar estilos (para que se integre al flujo normal de la drop-zone)
        draggingCard.style.position = 'static';
        draggingCard.style.zIndex = 'auto';
        draggingCard.style.opacity = '1';
        draggingCard.style.left = '';
        draggingCard.style.top = '';
        
        dropZone.appendChild(draggingCard);
    } else {
        // SOLTADO FALLIDO: La tarjeta vuelve al contenedor original (o se queda donde se soltó, dependiendo de tu diseño)
        
        // En este ejemplo, la restauramos a un estado de reposo relativo:
        draggingCard.style.position = 'static';
        draggingCard.style.zIndex = 'auto';
        draggingCard.style.opacity = '1';
        draggingCard.style.left = '';
        draggingCard.style.top = '';
    }

    draggingCard = null; // Reiniciar la variable de arrastre
};

// --- Integración ---
/* DEBES ASEGURARTE de aplicar estos listeners a tus tarjetas y al documento:
    1. Las tarjetas '.number-card' necesitan 'touchstart'
    2. El 'document' necesita 'touchmove' y 'touchend' para el arrastre global.
*/

document.addEventListener('touchmove', handleTouchMove);
document.addEventListener('touchend', handleTouchEnd);

// Ejemplo de cómo aplicar el listener (deberías hacer esto en tu función que crea las tarjetas)
/* const card = document.createElement('div');
    card.className = 'number-card';
    // ...
    card.addEventListener('touchstart', handleTouchStart);
    // ...
*/

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
