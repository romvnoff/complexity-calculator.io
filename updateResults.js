function updateResults() {
    console.log("Updating results...");
    // Get values from the form
    const taskType = document.getElementById('task_type').value;
    const investigationState = document.getElementById('investigation-state').value;
    const merchantType = document.getElementById('merchant_type').value;
    const periodStart = parseInt(document.getElementById('period_start').value, 10);
    const periodEnd = parseInt(document.getElementById('period_end').value, 10);
    const periodOfDevelopmentStart = parseInt(document.getElementById('period_of_development_start').value, 10);
    const periodOfDevelopmentEnd = parseInt(document.getElementById('period_of_development_end').value, 10);
    const numFilters = parseInt(document.getElementById('num_filters_investigated').value, 10);
    const numTemplates = parseInt(document.getElementById('num_templates_investigated').value, 10);
    const numFiltersModified = parseInt(document.getElementById('num_filters_modified').value, 10);
    const numTemplatesModified = parseInt(document.getElementById('num_templates_modified').value, 10);
    const templateTypeModified = document.getElementById('template_type_modified').value;
    const necessityOfDQR = document.getElementById('necessity_of_dqr').value;
    const numReceiptsModified = parseInt(document.getElementById('num_receipts_modified').value, 10);
    // const additionalDevelopmentActions = document.getElementById('additional_development_actions').value;
    // const additionalInvestigationActions = document.getElementById('additional_investigation_actions').value;


   
    // Task complexity scores for each INVESTIGATION/DEVELOPMENT action type
    const taskScores = {
        "trend_inconsistency": 5,
        "data_enrichment": 4,
        "incorrect_data_extraction": 4,
        "new_receipt_type": 4,
        "high_template_complexity": 6,
        "dq_issue": 3,
        "parsing_issue": 3,
        "traffic_research": 5,

        "New Template": 10,
        "Template Fix": 7,
        "Template Enrichment": 7,
        "New Filter": 5,
        "Refactoring": 20,
        "DQR": 9,
        "Filter Modification": 5,
        "New Attribute": 8,
        "Custom Visualisation": 5,
        "SQL Procedure": 12,
    };

    // Task type weights
    const taskTypeWeights = {
        "Investigation": 0,
        "Development": 0,
    };

    // Merchant type scores
    const merchantTypeScores = {
        "Regular": 0,
        "Cancellation": 1,
        "FS": 2,
        "Meal": 3,
        "Taxi": 3,
        "Cruise": 4,
        "Car Rental": 3,
        "TE": 5,
    };



    // INVESTIGATION & DEVELOPMENT ACTIONS

    // Get selected INVESTIGATION options from the multiselect field with checkboxes
    const selectedRequestTypesInvestigation = Array.from(document.querySelectorAll('#investigation-section input[type="checkbox"]:checked')).map(checkbox => checkbox.value);

    // Sum up the scores for selected options in the multiselect field
    let investigationRequestTypeScore = 0;
    selectedRequestTypesInvestigation.forEach(requestType => {
        investigationRequestTypeScore += taskScores[requestType] || 0;
    });


    // Get selected DEVELOPMENT options from the multiselect field with checkboxes
    const selectedRequestTypesDevelopment = Array.from(document.querySelectorAll('#development-section input[type="checkbox"]:checked')).map(checkbox => checkbox.value);

    // Sum up the scores for selected options in the multiselect field
    let developmentRequestTypeScore = 0;
    selectedRequestTypesDevelopment.forEach(requestType => {
        developmentRequestTypeScore += taskScores[requestType] || 0;
    });



    // TOTAL SCORE CALCULATION
    // Calculate the total task score based on the selected values
    let totalScore = 0;
    if (taskType === "Investigation") {
        totalScore = investigationRequestTypeScore;
        totalScore += calculatePeriodComplexity(periodStart, periodEnd);
        totalScore += calculateFiltersComplexity(numFilters);
        totalScore += calculateTemplatesComplexity(numTemplates);
        // totalScore += calculateAdditionalInvestigationActionsComplexity(additionalInvestigationActions);
    } else if (taskType === "Development") {
        totalScore = developmentRequestTypeScore; // Include the checkbox selected options score
        totalScore += calculateNumFiltersComplexity(numFiltersModified);
        totalScore += calculateDevelopmentPeriodWeight(periodOfDevelopmentStart, periodOfDevelopmentEnd);
        totalScore += calculateNumFiltersComplexity(numFiltersModified);
        totalScore += calculateNumTemplatesModifiedComplexity(numTemplatesModified);
        totalScore += calculateTemplateTypeComplexity(templateTypeModified);
        totalScore += calculateDQRComplexity(necessityOfDQR);
        totalScore += calculateReceiptsComplexity(numReceiptsModified);
        // totalScore += calculateAdditionalDevelopmentActionsComplexity(additionalDevelopmentActions);
    }

    totalScore += taskTypeWeights[taskType] || 0;
    totalScore += merchantTypeScores[merchantType] || 0;

    // Update the results on the page
    document.getElementById('task-score').textContent = totalScore;

    // Update the task complexity range
    updateTaskComplexityRange(totalScore);



    // HASH
    const selectedFields = {
        'taskType': taskType,
        'merchantType': merchantType,
        'investigationAction': selectedRequestTypesInvestigation,
        'developmentAction': selectedRequestTypesDevelopment, 
        'investigationPeriodStart': periodStart,
        'investigationPeriodEnd': periodEnd,
        'developmentPeriodStart': periodOfDevelopmentStart,
        'developmentPeriodEnd': periodOfDevelopmentEnd,
        'numFiltersInvestigated': numFilters,
        'numTemplatesInvestigated': numTemplates,
        'numFiltersModified': numFiltersModified,
        'numTemplatesModified': numTemplatesModified,
        'receiptType': templateTypeModified,
        'typeOfDQR': necessityOfDQR,
        'numReceiptsModified': numReceiptsModified,
        'taskScore': totalScore,
    };

    // Convert the object to a JSON string
    const selectedFieldsJSON = JSON.stringify(selectedFields);

    // Add an event listener to the Copy Hash button
    const copyButton = document.getElementById('copy-hash-button');
    copyButton.addEventListener('click', function() {
        // Create a hidden textarea element to hold the hash
        const textarea = document.createElement('textarea');
        textarea.value = selectedFieldsJSON;
        textarea.style.position = 'fixed';
        textarea.style.top = 0;
        textarea.style.left = 0;

        // Append the textarea to the document
        document.body.appendChild(textarea);

        // Select the text in the textarea
        textarea.select();
        textarea.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text to the clipboard
        document.execCommand('copy');

        // Remove the textarea from the document
        document.body.removeChild(textarea);
    });



    // CONSOLE OUTPUT
    console.log('Task Type:', taskType);
    console.log('Task Score:', totalScore);
    console.log('Investigation Action:', selectedRequestTypesInvestigation);
    console.log('Development Action:', selectedRequestTypesDevelopment);
    console.log('Selected Fields:', selectedFieldsJSON);

}


