// CLIPBOARD BUTTON
// Function to copy the content to clipboard
function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).textContent;
    const textArea = document.createElement('textarea');
    textArea.textContent = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}

// Attach event listeners to copy buttons
document.addEventListener('DOMContentLoaded', function() {
    const copyTaskScoreButton = document.getElementById('copy-task-score');
    copyTaskScoreButton.addEventListener('click', function() {
        copyToClipboard('task-score');
    });

    const copyShortCustomerResolutionButton = document.getElementById('copy-short-customer-resolution');
    copyShortCustomerResolutionButton.addEventListener('click', function() {
        copyToClipboard('short-customer-resolution');
    });

    const copyLongCustomerResolutionButton = document.getElementById('copy-long-customer-resolution');
    copyLongCustomerResolutionButton.addEventListener('click', function() {
        copyToClipboard('long-customer-resolution');
    });
});



// HASH BUTTON
// Select the hidden textarea and the copy button
const hashOutput = document.getElementById('hash-output');
const copyButton = document.getElementById('copy-button');

// Function to update the hash output in the hidden textarea
function updateHashOutput(hash) {
    hashOutput.value = hash;
}

// Event listener for the copy button
copyButton.addEventListener('click', function () {
    // Select the hash text in the hidden textarea
    hashOutput.select();
    hashOutput.setSelectionRange(0, 99999); // For mobile devices

    // Copy the hash text to the clipboard
    document.execCommand('copy');

    // Alert the user that the hash has been copied (optional)
    alert('Hash copied to clipboard!');
});


// RESET FORM
function resetForm() {
    // Reload the page
    window.location.reload();
}