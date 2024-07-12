function selectButton(button) {
    // Get the parent test-container div
    var testContainer = button.closest('.test-container');
    // Deselect all buttons in this test-container
    var buttons = testContainer.querySelectorAll('.choice-button');
    buttons.forEach(function(btn) {
        btn.classList.remove('selected');
    });
    // Select the clicked button
    button.classList.add('selected');
}