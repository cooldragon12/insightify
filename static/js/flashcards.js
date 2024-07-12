document.addEventListener('DOMContentLoaded', () => {
    // Card handling
    const cardContainer = document.querySelector('.card-container');
    const cards = Array.from(cardContainer.querySelectorAll('.flip-card'));
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const playBtn = document.getElementById('Play');
    const shuffleBtn = document.querySelector('.icon-btn[title="Shuffle"]');
    const cardNumberElement = document.getElementById('card-number');
    const totalCardsElement = document.getElementById('total-cards');

    let currentCardIndex = 0;
    let autoPlayInterval = null;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function updateCardsInDOM(cards) {
        while (cardContainer.firstChild) {
            cardContainer.removeChild(cardContainer.firstChild);
        }
        cards.forEach(card => cardContainer.appendChild(card));
    }

    function shuffleAndDisplayCards() {
        const shuffledCards = shuffle(cards);
        updateCardsInDOM(shuffledCards);
        currentCardIndex = 0;
        showCard(currentCardIndex);
    }

    function showCard(index) {
        cards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
        updateButtonState();
        updateCardCounter();
    }

    function updateButtonState() {
        prevBtn.disabled = currentCardIndex === 0;
        nextBtn.disabled = currentCardIndex === cards.length - 1;
    }

    function updateCardCounter() {
        cardNumberElement.textContent = currentCardIndex + 1;
    }

    function handleFlip(event) {
        if (!event.target.classList.contains('tts-btn')) {
            speechSynthesis.cancel();
            this.classList.toggle('is-flipped');
        }
    }

    function startAutoplay() {
        autoPlayInterval = setInterval(() => {
            currentCardIndex = (currentCardIndex + 1) % cards.length;
            showCard(currentCardIndex);
        }, 3000);
    }

    function stopAutoplay() {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }

    nextBtn.addEventListener('click', () => {
        speechSynthesis.cancel();
        currentCardIndex = (currentCardIndex + 1) % cards.length;
        showCard(currentCardIndex);
    });

    prevBtn.addEventListener('click', () => {
        speechSynthesis.cancel();
        currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
        showCard(currentCardIndex);
    });

    playBtn.addEventListener('click', () => {
        if (autoPlayInterval) {
            stopAutoplay();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            startAutoplay();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
    });

    shuffleBtn.addEventListener('click', shuffleAndDisplayCards);

    cards.forEach(card => {
        const flipCardInner = card.querySelector('.flip-card-inner');
        if (flipCardInner) {
            flipCardInner.addEventListener('click', handleFlip);
        }
    });

    totalCardsElement.textContent = cards.length;
    showCard(currentCardIndex);
    updateCardCounter();

    // Form handling
    const form = document.getElementById('testPopup');
    const checkboxes = document.querySelectorAll('.form-check-input');
    const checkboxContainer = document.getElementById('checkboxContainer');
    const checkboxError = document.getElementById('checkboxError');
    const counterInput = document.getElementById('counter');
    const counterError = document.getElementById('counterError');
    const decreaseButton = document.getElementById('decreaseBtn');
    const increaseButton = document.getElementById('increaseBtn');
    const selectPrompt = document.getElementById('validationSelectPrompt');
    const MIN_COUNT = 1;
    const MAX_COUNT = 99;
    const errorMessage = `Please enter a number between ${MIN_COUNT} and ${MAX_COUNT}.`;

    counterInput.addEventListener('input', function() {
        let currentValue = parseInt(this.value);
        if (isNaN(currentValue) || currentValue < MIN_COUNT) {
            this.value = MIN_COUNT;
        } else if (currentValue > MAX_COUNT) {
            this.value = MAX_COUNT;
        } else {
            this.value = currentValue;
        }
        validateCount(currentValue);
    });

    function isCheckboxSelected() {
        return Array.from(checkboxes).some(checkbox => checkbox.checked);
    }

    function validateCheckboxes() {
        if (!isCheckboxSelected()) {
            checkboxContainer.classList.add('invalid-checkbox');
            checkboxError.style.display = 'block';
            return false;
        } else {
            checkboxContainer.classList.remove('invalid-checkbox');
            checkboxError.style.display = 'none';
            return true;
        }
    }

    function decreaseCount() {
        let currentValue = parseInt(counterInput.value);
        if (currentValue > MIN_COUNT) {
            currentValue--;
            counterInput.value = currentValue;
            validateCount(currentValue);
        }
    }

    function increaseCount() {
        let currentValue = parseInt(counterInput.value);
        if (currentValue < MAX_COUNT) {
            currentValue++;
            counterInput.value = currentValue;
            validateCount(currentValue);
        }
    }

    function updateCount() {
        let currentValue = parseInt(counterInput.value);
        validateCount(currentValue);
    }

    function validateCount(value) {
        if (value < MIN_COUNT || value > MAX_COUNT || isNaN(value)) {
            counterInput.classList.add('is-invalid');
            counterInput.classList.remove('is-valid');
            counterError.textContent = errorMessage;
            if (value < MIN_COUNT) {
                counterInput.value = MIN_COUNT;
            } else if (value > MAX_COUNT) {
                counterInput.value = MAX_COUNT;
            }
        } else {
            counterInput.classList.remove('is-invalid');
            counterInput.classList.add('is-valid');
            counterError.textContent = '';
        }
    }

    function validateForm() {
        const isCheckboxesValid = validateCheckboxes();
        const isCounterValid = counterInput.classList.contains('is-valid');
        const isSelectPromptValid = selectPrompt.value !== '';

        if (!isSelectPromptValid) {
            selectPrompt.classList.add('is-invalid');
        } else {
            selectPrompt.classList.remove('is-invalid');
        }

        return isCheckboxesValid && isCounterValid && isSelectPromptValid;
    }

    decreaseButton.addEventListener('click', decreaseCount);
    increaseButton.addEventListener('click', increaseCount);
    counterInput.addEventListener('change', updateCount);

    form.addEventListener('submit', event => {
        event.preventDefault();
        event.stopPropagation();

        if (validateForm()) {
            // Form is valid, redirecting
            GotoTest();
        } else {
            form.classList.add('was-validated');
        }
    });

    validateCount(parseInt(counterInput.value));
});

// Function to speak the text content (front or back)
function speakText(button, event) {
    event.stopPropagation();
    const side = button.getAttribute('data-side');
    const card = button.closest('.flip-card-inner');
    const textElement = card.querySelector(`.flip-card-${side} .card-text`);
    const textToSpeak = textElement.textContent;

    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        window.speechSynthesis.speak(utterance);
    } else {
        alert('Text-to-speech not supported in your browser.');
    }
}