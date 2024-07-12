function decreaseCount() {
    const counter = document.getElementById('counter');
    let currentValue = parseInt(counter.value);

    // Prevent decreasing below 1
    if (currentValue > 1) {
        currentValue--;
    }
    counter.value = currentValue;

    // Validate and update the counter display
    validateCount(currentValue);
}

function increaseCount() {
    const counter = document.getElementById('counter');
    let currentValue = parseInt(counter.value);

    // Increase value
    currentValue++;
    counter.value = currentValue;

    // Validate and update the counter display
    validateCount(currentValue);
}

function updateCount() {
    const counter = document.getElementById('counter');
    let currentValue = parseInt(counter.value);

    // Validate and update the counter display
    validateCount(currentValue);
}

function validateCount(value) {
    const counter = document.getElementById('counter');
    const counterError = document.getElementById('counterError');

    // Ensure the value is at least 1
    if (value < 1 || isNaN(value)) {
        counter.classList.add('is-invalid');
        counter.classList.remove('is-valid');
        counterError.textContent = 'Please enter a number greater than or equal to 1.';
        counter.value = 1; // Reset to minimum valid value
    } else {
        counter.classList.remove('is-invalid');
        counter.classList.add('is-valid');
        counterError.textContent = '';
    }
}

// Restrict input to numeric values only
document.getElementById('counter').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^0-9]/g, '');
    updateCount();
});

// Restrict key presses to numeric values only
document.getElementById('counter').addEventListener('keydown', function (e) {
    // Allow: backspace, delete, tab, escape, enter
    if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A, Command+A
        (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: home, end, left, right, down, up
        (e.keyCode >= 35 && e.keyCode <= 40)) {
        // Let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});


function redirectToPage(url) {
    window.location.href = url;
}