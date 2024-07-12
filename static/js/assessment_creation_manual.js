document.addEventListener('DOMContentLoaded', () => {
    const assessmentList = document.getElementById('assessment-list');

    function updateHeaders() {
        const items = document.querySelectorAll('.assessment-item');
        items.forEach((item, index) => {
            const header = item.querySelector('.assessment-header span');
            header.textContent = index + 1;
        });
    }

    function createAssessmentItem() {
        const newItem = document.createElement('div');
        newItem.classList.add('assessment-item');
        newItem.setAttribute('draggable', 'true');
        newItem.innerHTML = `
            <div class="assessment-header">
                <span></span>
                <div class="actions">
                    <button class="drag-handle">⇅</button>
                    <button class="delete">🗑️</button>
                </div>
            </div>
            <div class="assessment-body">
                <div class="qa-container">
                    <div class="question">
                        <label>question</label>
                        <textarea placeholder="Enter question here"></textarea>
                    </div>
                    <div class="answer">
                        <label>answer</label>
                        <textarea placeholder="Enter answer here"></textarea>
                    </div>
                </div>
            </div>
        `;
        assessmentList.appendChild(newItem);
        updateHeaders();

        newItem.querySelector('.delete').addEventListener('click', () => {
            newItem.remove();
            updateHeaders();
        });

        newItem.addEventListener('dragstart', () => {
            newItem.classList.add('dragging');
        });

        newItem.addEventListener('dragend', () => {
            newItem.classList.remove('dragging');
        });

        const textareas = newItem.querySelectorAll('textarea');
        textareas.forEach(textarea => {
            textarea.addEventListener('input', autoResize);
        });
    }

    function autoResize() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    }

    document.querySelector('.add-item').addEventListener('click', () => {
        createAssessmentItem();
    });

    document.addEventListener('dragover', (event) => {
        event.preventDefault();
        const draggingItem = document.querySelector('.dragging');
        const afterElement = getDragAfterElement(assessmentList, event.clientY);
        if (afterElement == null) {
            assessmentList.appendChild(draggingItem);
        } else {
            assessmentList.insertBefore(draggingItem, afterElement);
        }
        updateHeaders();
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.assessment-item:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    createAssessmentItem(); 
});

let sidebar = document.querySelector('.sidebar'); 
function setActiveSideBar(){
    sidebar.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', () => {
    const selectAllCheckbox = document.getElementById('selectAll');
    const titleCheckboxes = document.querySelectorAll('input[name="title"]');

    selectAllCheckbox.addEventListener('change', function () {
        titleCheckboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });

    titleCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            if (!this.checked) {
                selectAllCheckbox.checked = false;
            } else {
                const allChecked = Array.from(titleCheckboxes).every(checkbox => checkbox.checked);
                selectAllCheckbox.checked = allChecked;
            }
        });
    });
});