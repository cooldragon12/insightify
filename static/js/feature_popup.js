document.addEventListener("DOMContentLoaded", function () {
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



    // Get Modal Elements
    const enterTextModal = new bootstrap.Modal(document.getElementById('enterText'));
    const enterTextTextarea = document.querySelector('#enterText textarea[name="message"]');
    const paraphrasedTextarea = document.querySelectorAll('#enterText textarea[name="message"]')[1];
    const uploadBtn = document.getElementById('uploadBtn');
    const progressBar = document.getElementById('progressBar');

    // Event Listener for Modal Buttons
    document.querySelector('#enterText .btn-primary').addEventListener('click', () => { 
        // Handle "Save Entry" logic here (e.g., send to server, store locally) 
    });
   
    // Event Listener for File Upload
    uploadBtn.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const fileType = file.type;
            resetProgressBar();

            if (fileType === 'application/pdf') {
                processPDF(file);
            } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                       fileType === 'application/msword') {
                processWord(file);
            } else if (fileType.startsWith('image/')) {
                processImage(file);
            } else {
                alert("Unsupported file type:", fileType);
            }
        }
    });

    // Simplified Text Feature Buttons
    document.querySelector('.copy-your-text').addEventListener('click', () => {
        copyToClipboard(enterTextTextarea.value);
        alert('Your text copied!');
    });

    document.querySelector('.copy-paraphrased-text').addEventListener('click', () => {
        copyToClipboard(paraphrasedTextarea.value);
        alert('Paraphrased text copied!');
    });

    document.querySelector('.delete-button').addEventListener('click', () => {
        enterTextTextarea.value = '';
        paraphrasedTextarea.value = ''; // Clear both textareas
        resetProgressBar();
    });

    // Simplify Button
    document.getElementById('simplifyBtn').addEventListener('click', () => {
        const originalText = enterTextTextarea.value;
        if (originalText.trim() === "") {
            alert("Please enter text to simplify.");
            return;
        }

        // TODO: Implement simplification logic here
        simplifyText(originalText).then(simplifiedText => {
            paraphrasedTextarea.value = simplifiedText;
            autoAdjustTextareaHeight(paraphrasedTextarea);
        }).catch(err => {
            console.error('Error simplifying text:', err);
        });
    });


    // Paraphrase Button
    document.getElementById('paraphraseBtn').addEventListener('click', () => {
        const originalText = enterTextTextarea.value;
        if (originalText.trim() === "") {
            alert("Please enter text to paraphrase.");
            return;
        }

        // TODO: Implement paraphrasing logic here
        paraphraseText(originalText).then(paraphrasedText => {
            paraphrasedTextarea.value = paraphrasedText;
            autoAdjustTextareaHeight(paraphrasedTextarea);
        }).catch(err => {
            console.error('Error Paraphrasing text:', err);
        });
    });

    // Translate Button
    document.getElementById('translateBtn').addEventListener('click', () => {
        const originalText = enterTextTextarea.value;
        if (originalText.trim() === "") {
            alert("Please enter text to translate.");
            return;
        }

        // TODO: Implement translation logic here (e.g., using a library like Google Translate API)
        const translatedText = translateText(originalText); // Replace with your translation function
        paraphrasedTextarea.value = translatedText;
        autoAdjustTextareaHeight(paraphrasedTextarea);
    });

    // Update Progress Bar Function (no changes)
    function updateProgressBar(value) {
        progressBar.style.width = value + '%';
        progressBar.textContent = value + '%';
    }

    // Reset Progress Bar Function (no changes)
    function resetProgressBar() {
        progressBar.style.width = '0%';
        progressBar.textContent = '';
    }

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

    
});

// Placeholder Functions (You'll need to replace these with your actual implementation)
function simplifyText() {
    $option = "Simplify";
    return generateSimplify($option);  
 }

function paraphraseText(text) {
    $option = "Paraphrase";
    return generateSimplify($option);
}

function translateText(text) {
    // Your translation logic
    return "Translated text..."; 
}

function generateSimplify($option) {
    var text = document.getElementById("input-text");
    return fetch("generate.php", {
        method: "POST",
        body: JSON.stringify({
            text: text.value,
            option: $option,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function(response) {
        return response.text();
    }).then(function(data) {
        return data;
    }).catch(function(error) {
        console.error('Error:', error);
        throw error; // Re-throw the error for further handling
    });
}

