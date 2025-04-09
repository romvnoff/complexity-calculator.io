// Add event listeners to form elements
document.getElementById('task_type').addEventListener('change', () => {
    const taskType = document.getElementById('task_type').value;
    const investigationSection = document.getElementById('investigation-section');
    const developmentSection = document.getElementById('development-section');

    if (taskType === "Investigation") {
        investigationSection.style.display = "block";
        developmentSection.style.display = "none";
    } else if (taskType === "Development") {
        investigationSection.style.display = "none";
        developmentSection.style.display = "block";
    } else if (taskType === "Investigation + Development") {
        investigationSection.style.display = "block";
        developmentSection.style.display = "block";
    } else {
        investigationSection.style.display = "none";
        developmentSection.style.display = "none";
    }

    updateResults(); // Update the results when the task type is changed
});


// Add event listeners to form elements
const formElements = document.querySelectorAll('#task_type, #merchant_type, #request_type_investigation, #request_type_development, #comment_investigation, #comment_development, #eta_investigation, #eta_development, #period_start, #period_end, #period_of_development_start, #period_of_development_end, #num_filters_investigated, #num_templates_investigated, #num_filters_modified, #num_templates_modified, #template_type_modified, #necessity_of_dqr, #num_receipts_modified, #merchant_size, #development_time, #additional_development_actions, #additional_investigation_actions, #aditional_comment_investigation, #additional_comment_development, #investigation-state, #task-state, #short-customer-resolution, #long-customer-resolution');
formElements.forEach(element => element.addEventListener('change', updateResults));

// Add event listener to the reset button
document.getElementById('reset-button').addEventListener('click', resetForm);

// Add event listeners after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Task state dropdowns
    const investigationStateDropdown = document.getElementById('investigation-state');
    const developmentStateDropdown = document.getElementById('task_state');

    // Add event listeners
    investigationStateDropdown.addEventListener('change', updateResults);
    developmentStateDropdown.addEventListener('change', updateResults);
});



// PERIOD AFFECTED BY INVESTIGATION
document.addEventListener("DOMContentLoaded", function () {
    // Get select elements
    var startYearSelect = document.getElementById("period_start");
    var endYearSelect = document.getElementById("period_end");

    // Populate options for start year and end year
    var currentYear = new Date().getFullYear();
    for (var year = currentYear; year >= 2015; year--) {
        var option = document.createElement("option");
        option.value = year;
        option.text = year;
        startYearSelect.appendChild(option);
        
        // Clone the option and disable it
        var clonedOption = option.cloneNode(true);
        clonedOption.disabled = true;
        endYearSelect.appendChild(clonedOption);
    }

    // Add event listener to ensure end year is not earlier than start year
    startYearSelect.addEventListener("change", function () {
        // Enable all options in end year select
        for (var i = 0; i < endYearSelect.options.length; i++) {
            endYearSelect.options[i].disabled = false;
        }

        // Disable options that are earlier than the selected start year
        for (var i = 0; i < endYearSelect.options.length; i++) {
            if (parseInt(endYearSelect.options[i].value) < parseInt(startYearSelect.value)) {
                endYearSelect.options[i].disabled = true;
            }
        }
        
        // If end year is earlier than start year, set end year to start year
        if (parseInt(endYearSelect.value) < parseInt(startYearSelect.value)) {
            endYearSelect.value = startYearSelect.value;
        }
    });
});



// PERIOD AFFECTED BY DEVELOPMENT SECTION
document.addEventListener("DOMContentLoaded", function () {
    // Get select elements
    var startYearSelect = document.getElementById("period_of_development_start");
    var endYearSelect = document.getElementById("period_of_development_end");

    // Populate options for start year and end year
    var currentYear = new Date().getFullYear();
    for (var year = currentYear; year >= 2015; year--) {
        var option = document.createElement("option");
        option.value = year;
        option.text = year;
        startYearSelect.appendChild(option);
        
        // Clone the option and disable it
        var clonedOption = option.cloneNode(true);
        clonedOption.disabled = true;
        endYearSelect.appendChild(clonedOption);
    }

    // Add event listener to ensure end year is not earlier than start year
    startYearSelect.addEventListener("change", function () {
        // Enable all options in end year select
        for (var i = 0; i < endYearSelect.options.length; i++) {
            endYearSelect.options[i].disabled = false;
        }

        // Disable options that are earlier than the selected start year
        for (var i = 0; i < endYearSelect.options.length; i++) {
            if (parseInt(endYearSelect.options[i].value) < parseInt(startYearSelect.value)) {
                endYearSelect.options[i].disabled = true;
            }
        }
        
        // If end year is earlier than start year, set end year to start year
        if (parseInt(endYearSelect.value) < parseInt(startYearSelect.value)) {
            endYearSelect.value = startYearSelect.value;
        }
    });
});





// // Add event listeners to the request type dropdowns
// const requestTypeDevelopmentDropdown = document.getElementById('request_type_development');
// const issueReasonDropdown = document.getElementById('issue_reason');

// // Define the dependencies for request types and corresponding issue reasons
// const requestTypeDependencies = {
//     "Outlier [Comment Required]": ["Other [comment required]"],
//     "Refactoring": ["High template complexity"],
//     "Filter + Template Development": [
//         "Need to restore trend consistency",
//         "Need to process new receipt type",
//     ],
//     "Filter Coverage": ["Need to check the trend"],
//     "Template Enrichment": ["Customer request"],
//     "Filter Modification": ["Customer request", "No Fix Required"],
//     "New Template": [
//         "Data incompleteness",
//         "Need to process new type of receipts",
//         "High template complexity of existing templates",
//         "Different structure of receipts",
//     ],
//     "Template Fix": [
//         "Changes in the structure of receipts",
//         "Incorrect data extraction",
//     ],
// };

// // Function to update the issue reason options based on the selected request type
// function updateIssueReasonOptions(selectedRequestType, dropdown) {
//     const selectedIssueReason = issueReasonDropdown.value;

//     // Remove all existing options
//     while (dropdown.options.length > 0) {
//         dropdown.options.remove(0);
//     }

//     // Add default option
//     const defaultOption = document.createElement('option');
//     defaultOption.value = "";
//     defaultOption.disabled = true;
//     defaultOption.selected = true;
//     defaultOption.textContent = "Select Issue Reason";
//     dropdown.appendChild(defaultOption);

//     // Add options based on the selected request type
//     const dependentIssueReasons = requestTypeDependencies[selectedRequestType] || [];
//     dependentIssueReasons.forEach(issueReason => {
//         const option = document.createElement('option');
//         option.value = issueReason;
//         option.textContent = issueReason;
//         dropdown.appendChild(option);
//     });

//     // Select the previously selected issue reason if still available
//     if (dependentIssueReasons.includes(selectedIssueReason)) {
//         dropdown.value = selectedIssueReason;
//     }
// }

// // Add event listener to the request type development dropdown
// requestTypeDevelopmentDropdown.addEventListener('change', function() {
//     const selectedRequestType = this.value;
//     updateIssueReasonOptions(selectedRequestType, issueReasonDropdown);
//     updateResults(); // Update results when request type changes
// });

// Initial setup
document.getElementById('investigation-section').style.display = "none";
document.getElementById('development-section').style.display = "none";
updateResults(); // Update the results on page load
