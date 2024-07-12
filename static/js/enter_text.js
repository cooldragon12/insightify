document.getElementById('uploadBtn').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const fileType = file.type;
        console.log("File selected:", file);
        resetProgressBar();

        if (fileType === 'application/pdf') {
            processPDF(file);
        } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                   fileType === 'application/msword') {
            processWord(file);
        } else if (fileType.startsWith('image/')) {
            processImage(file);
        } else {
            console.error("Unsupported file type:", fileType);
        }
    } else {
        console.error("No file selected");
    }
});

function processImage(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.src = e.target.result;
        img.onload = function() {
            recognizeText(img);
        }
    }
    reader.readAsDataURL(file);
}

function processPDF(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const typedarray = new Uint8Array(e.target.result);
        pdfjsLib.getDocument(typedarray).promise.then(pdf => {
            pdf.getPage(1).then(page => {
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                page.render({ canvasContext: context, viewport: viewport }).promise.then(() => {
                    recognizeText(canvas);
                });
            });
        });
    }
    reader.readAsArrayBuffer(file);
}

function processWord(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        mammoth.extractRawText({ arrayBuffer: e.target.result })
            .then(result => {
                document.querySelector('textarea[name="message"]').value = result.value;
                updateProgressBar('Uploaded');
            })
            .catch(err => console.error("Mammoth.js error: ", err));
    }
    reader.readAsArrayBuffer(file);
}

function recognizeText(image) {
    Tesseract.recognize(
        image,
        'eng',
        {
            logger: m => {
                console.log("Tesseract.js log:", m);
                if (m.status === 'recognizing text') {
                    updateProgressBar(Math.floor(m.progress * 100));
                }
            }
        }
    ).then(({ data: { text } }) => {
        console.log("Recognized text:", text);
        document.querySelector('textarea[name="message"]').value = text;
        updateProgressBar(100);
    }).catch(err => {
        console.error("Tesseract.js error: ", err);
        resetProgressBar();
    });
}

// Progress when uploading
function updateProgressBar(value) {
    const progressBar = document.getElementById('progressBar');
    if (value === 100) {
        progressBar.textContent = 'Uploaded';
    } else {
        progressBar.textContent = value + '%';
    }
}

function resetProgressBar() {
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = '0%';
}


// SIMPLIFIED TEXT POPUP FUNCTIONALITIES
document.addEventListener("DOMContentLoaded", function () {
    const nextButton = document.querySelector('#enter-text-popup .btn');
    const enterTextTextarea = document.querySelector('#enter-text-popup textarea[name="message"]');
    const simplifiedTextarea = document.querySelector('#simplified-popup textarea[name="message"]');
    const simplifiedPopup = document.getElementById('simplified-popup');
    const enterTextPopup = document.getElementById('enter-text-popup');

    simplifiedPopup.style.display = 'none'; // Hide the simplified-popup initially

    nextButton.addEventListener("click", function () {
        if (enterTextTextarea.value.trim() === "") {
            alert("Please enter text before proceeding.");
            return; // Stop further execution
        }

        simplifiedTextarea.value = enterTextTextarea.value;
        simplifiedPopup.style.display = 'block'; // Show the simplified-popup
        enterTextPopup.style.display = 'none'; // Hide the enter-text-popup
        autoAdjustTextareaHeight(simplifiedTextarea); // Adjust the height after setting the value
    });

    const finishButton = document.querySelector('#simplified-popup .btn');
    finishButton.addEventListener("click", function () {
        simplifiedPopup.style.display = 'none'; // Hide the simplified-popup when Finish is clicked
    });

    // Adjust textarea height after copying the text
    const textareaToCopy = document.querySelector('#enter-text-popup textarea[name="message"]');
    textareaToCopy.addEventListener("input", function () {
        autoAdjustTextareaHeight(textareaToCopy);
    }); 

    const editButton = document.querySelector('.edit-button');
    editButton.addEventListener('click', function () {
        enterTextPopup.style.display = 'block';
        simplifiedPopup.style.display = 'none';
    });

    const copyButton = document.querySelector('.copy-button');
    copyButton.addEventListener('click', function () {
        const dropdown = document.querySelector('.dropdown');
        dropdown.classList.toggle('show');
    });

    const copyYourTextButton = document.querySelector('.copy-your-text');
    const copyParaphrasedTextButton = document.querySelector('.copy-paraphrased-text');

    copyYourTextButton.addEventListener('click', function () {
        copyToClipboard(simplifiedTextarea.value);
        alert('Your text copied!');
        closeDropdown();
    });

    copyParaphrasedTextButton.addEventListener('click', function () {
        const paraphrasedTextarea = document.querySelectorAll('#simplified-popup textarea[name="message"]')[1];
        copyToClipboard(paraphrasedTextarea.value);
        alert('Paraphrased text copied!');
        closeDropdown();
    });

    const deleteButton = document.querySelector('.delete-button');
    deleteButton.addEventListener('click', function () {
        simplifiedPopup.style.display = 'none';
    });

    function closeDropdown() {
        const dropdown = document.querySelector('.dropdown');
        dropdown.classList.remove('show');
    }
});

function copyToClipboard(text) {
    const tempInput = document.createElement('input');
    tempInput.style.position = 'absolute';
    tempInput.style.left = '-9999px';
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
}

function autoAdjustTextareaHeight(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = (textarea.scrollHeight) + "px";
}
