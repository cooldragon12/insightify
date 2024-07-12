function redirectToPage(url) {
  window.location.href = url;
}

document.addEventListener('DOMContentLoaded', function() {
    const addTitleModal = new bootstrap.Modal(document.getElementById('addTitle'));
const titleSavedModal = new bootstrap.Modal(document.getElementById('title-saved-popup'));

// Form submission handling for addTitleModal
const addTitleForm = document.querySelector('#addTitle form');

// Define the event handler function
function handleAddTitleFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    if (addTitleForm.checkValidity()) {
        // Form is valid, proceed to hide addTitle modal
        addTitleModal.hide();
        addTitle(titleSavedModal); // Ensure this function is defined somewhere in your code
    } else {
        // Form is invalid, show validation feedback
        addTitleForm.classList.add('was-validated');
    }
}

// Check if the event listener is already attached
const isEventListenerAttached = addTitleForm.getAttribute('data-listener-attached');
if (!isEventListenerAttached) {
    addTitleForm.addEventListener('submit', handleAddTitleFormSubmit);
    addTitleForm.setAttribute('data-listener-attached', 'true');
}

    
    // Remove any existing event listeners (optional but ensures no duplication)
    addTitleForm.removeEventListener('submit', handleAddTitleFormSubmit);
    addTitleForm.addEventListener('submit', handleAddTitleFormSubmit);

  
    // Close button for titleSavedModal
    document.getElementById('exit-saved').addEventListener('click', function() {
        titleSavedModal.hide();
    });
  
    // Remove modal backdrop on hide
    titleSavedModal._element.addEventListener('hidden.bs.modal', function () {
        document.querySelector('.modal-backdrop').remove();
    });
  });


  