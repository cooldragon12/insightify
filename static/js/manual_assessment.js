document.addEventListener("DOMContentLoaded", function () {
    // Function to create a new assessment container
    function createAssessmentContainer() {
        // Count the number of existing assessment containers
        const numContainers = document.querySelectorAll('.assessment-container').length;

        // Create a new assessment container
        const newAssessmentContainer = document.createElement('div');
        newAssessmentContainer.classList.add('assessment-container');

        // Set the HTML content for the new assessment container
        newAssessmentContainer.innerHTML = `
            <div class="title-row">
                <h1>${numContainers + 1}</h1>
                <div class="icon-container">
                    <button class="drag-button" aria-label="Drag">
                        <img class="icon" src="./img/ic_drag.png">
                    </button>
                    <button class="delete-button" aria-label="Delete">
                        <img class="icon" src="./img/ic_delete.png">
                    </button>
                </div>
            </div>
            <div class="divider"></div>
            <div class="assessment-list">
                <div class="question">
                    <h1>question</h1>
                    <textarea class="question-textarea" placeholder="Enter question here"></textarea>
                </div>
                <div class="answer">
                    <h1>answer</h1>
                    <textarea class="answer-textarea" placeholder="Enter answer here"></textarea>
                </div>
            </div>
        `;

        // Append the new assessment container above the "Add Item" button
        const addButton = document.querySelector('.add-button');
        addButton.parentNode.insertBefore(newAssessmentContainer, addButton);

        // Update numbering for all assessment containers
        updateNumbering();

        // Add event listener for delete button
        const deleteButton = newAssessmentContainer.querySelector('.delete-button');
        deleteButton.addEventListener('click', function() {
            const container = deleteButton.closest('.assessment-container');
            container.remove();
            // Update numbering for all assessment containers
            updateNumbering();
        });

        // Add drag event listeners
        addDragAndDrop(newAssessmentContainer);
    }

    // Event listener for "Add Item" button
    const addButton = document.querySelector('.add-button');
    addButton.addEventListener('click', createAssessmentContainer);

    // Function to update numbering for all assessment containers
    function updateNumbering() {
        const assessmentContainers = document.querySelectorAll('.assessment-container');
        assessmentContainers.forEach((container, index) => {
            container.querySelector('.title-row h1').textContent = index + 1;
        });
    }

    // Function to add drag and drop event listeners
    function addDragAndDrop(container) {
        const dragButton = container.querySelector('.drag-button');
        
        dragButton.addEventListener('mousedown', function(e) {
            container.draggable = true;
        });

        dragButton.addEventListener('mouseup', function(e) {
            container.draggable = false;
        });

        container.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', container.querySelector('.title-row h1').textContent);
            container.classList.add('dragging');
        });

        container.addEventListener('dragend', function() {
            container.classList.remove('dragging');
        });

        container.addEventListener('dragover', function(e) {
            e.preventDefault();
            const draggingContainer = document.querySelector('.dragging');
            const currentContainers = [...document.querySelectorAll('.assessment-container:not(.dragging)')];
            const nextContainer = currentContainers.find(child => {
                const rect = child.getBoundingClientRect();
                return e.clientY < rect.top + rect.height / 2;
            });
            if (!nextContainer) {
                container.parentNode.insertBefore(draggingContainer, addButton);
            } else {
                container.parentNode.insertBefore(draggingContainer, nextContainer);
            }
        });

        container.addEventListener('drop', function() {
            updateNumbering();
        });
    }




    // Function to show toast notification
    const toastElement = document.getElementById('liveToast');
    const toastBody = toastElement.querySelector('.toast-body');
    const toast = new bootstrap.Toast(toastElement);

    function showToast(message) {
        toastBody.textContent = message;
        toast.show();
    }

    // Create button event listener
    const createBtn = document.getElementById('createBtn');
    createBtn.addEventListener('click', function (event) {
        event.preventDefault();

        const form = document.getElementById('manualAssessmentForm');
        const numCards = document.querySelectorAll('.assessment-container').length;
        const checkedTitles = document.querySelectorAll('.checkboxes input[type=checkbox]:checked').length;

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            showToast('Please fill out the form correctly.', 'error');
            event.preventDefault();
            event.stopPropagation();
        } else if (checkedTitles === 0) {
            alert('Please select at least one title.', 'error');
            return;
        } else if (numCards < 3) {
            alert('Please add at least 3 cards.', 'error');
            return;
        } else {
            showToast('Form is valid and ready for submission.', 'success');
            const modal = new bootstrap.Modal(document.getElementById('assessment-created-popup'));
            CreateTest(modal);
        }
    });

    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            const numCards = document.querySelectorAll('.assessment-container').length;
            const checkedTitles = document.querySelectorAll('.checkboxes input[type=checkbox]:checked').length;

            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                showToast('Please fill out the form correctly.', 'error');
            } else if (checkedTitles === 0) {
                showToast('Please select at least one title.', 'error');
                return;
            } else if (numCards < 3) {
                showToast('Please add at least 3 cards.', 'error');
                return;
            } else {
                showToast('Form is valid and ready for submission.', 'success');
            }
            form.classList.add('was-validated');
        }, false);
    });


});



