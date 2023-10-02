// Get references to the select elements
var investigationStateSelect = document.getElementById("investigation-state");
var developmentStateSelect = document.getElementById("task_state");
var taskTypeSelect = document.getElementById("task_type");
var commentInvestigation = document.getElementById('comment_investigation').value;
var commentDevelopment = document.getElementById("comment_development").value;

// Get references to the container divs
var etaInvestigationContainer = document.getElementById("eta-investigation-container");
var etaDevelopmentContainer = document.getElementById("eta-development-container");
var developmentTimeContainer = document.getElementById("development-time-container");
var commentInvestigationContainer = document.getElementById("comment-investigation-container");
var commentDevelopmentContainer = document.getElementById("comment-development-container");




// Function to toggle the visibility of fields based on state
function toggleFieldVisibility() {
    // INVESTIGATION
    if (investigationStateSelect.value === "completed") {
        etaInvestigationContainer.style.display = "none"; 
        commentInvestigationContainer.style.display = "block";
        developmentTimeContainer.style.display = "block";
    } else if (investigationStateSelect.value === "in_progress") {
        etaInvestigationContainer.style.display = "block";
        developmentTimeContainer.style.display = "none";
        commentInvestigationContainer.style.display = "none";
    } else {
        etaInvestigationContainer.style.display = "none"; 
        developmentTimeContainer.style.display = "none"; 
        commentInvestigationContainer.style.display = "none"; 
    }

    // DEVELOPMENT
    if (developmentStateSelect.value === "completed") {
        etaDevelopmentContainer.style.display = "none"; 
        commentDevelopmentContainer.style.display = "block";
    } else if (developmentStateSelect.value === "in_progress") {
        etaDevelopmentContainer.style.display = "block";
        commentDevelopmentContainer.style.display = "none";
    } else {
        etaDevelopmentContainer.style.display = "none"; 
        commentDevelopmentContainer.style.display = "none"; 
    }
}

// Add event listeners to the state and task type select elements
investigationStateSelect.addEventListener("change", toggleFieldVisibility);
developmentStateSelect.addEventListener("change", toggleFieldVisibility);
taskTypeSelect.addEventListener("change", toggleFieldVisibility);

// Initial call to set the initial visibility state
toggleFieldVisibility();



// TOGGLE DQR FIELD
// Get the DQR checkbox element
var dqrCheckbox = document.getElementById('checkboxEight');
// Get the necessity_of_dqr_container element
var dqrContainer = document.getElementById('necessity_of_dqr_container');

// Add event listener to the DQR checkbox
dqrCheckbox.addEventListener('change', function() {
    // If DQR checkbox is checked, show the container; otherwise, hide it
    if (dqrCheckbox.checked) {
        dqrContainer.style.display = 'block';
    } else {
        dqrContainer.style.display = 'none';
    }
});