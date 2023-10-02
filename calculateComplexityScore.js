// JavaScript function to calculate complexity score based on factors and scores
function calculateComplexityScore(value, factors) {
    const factor = factors.find((factor) => value >= factor.value);
    return factor ? factor.score : 0;
}

// Define complexity ranges and text values
const complexityRanges = [
    { min: 0, max: 0, text: '' },
    { min: 1, max: 30, text: 'Easy' },
    { min: 30, max: 50, text: 'Mild' },
    { min: 50, max: 70, text: 'Moderate' },
    { min: 70, max: 85, text: 'Difficult' },
    { min: 85, max: 100, text: 'Very Difficult' },
];

// Function to get the complexity text for a given value
function getComplexityText(value) {
    const range = complexityRanges.find((range) => value >= range.min && value <= range.max);
    if (range) {
        // Define CSS classes for each category
        const cssClasses = {
            'Easy': 'easy-color',
            'Mild': 'mild-color',
            'Moderate': 'moderate-color',
            'Difficult': 'difficult-color',
            'Very Difficult': 'very-difficult-color',
        };
        
        // Return the text with the corresponding CSS class
        return `<span class="${cssClasses[range.text]}">${range.text}</span>`;
    } else {
        return 'Invalid Score';
    }
}


// JavaScript function to calculate complexity score for "Number of filters"
function calculateFiltersComplexity(numFilters) {
    const complexityFactors = [
        { value: 5, score: 3 },
        { value: 2, score: 2 },
        { value: 1, score: 1 },
    ];
    return calculateComplexityScore(numFilters, complexityFactors);
}

// JavaScript function to calculate complexity score for "Number of filters being modified"
function calculateNumFiltersComplexity(numFiltersModified) {
    const complexityFactors = [
        { value: 5, score: 4 },
        { value: 2, score: 2 },
        { value: 1, score: 1 },
    ];
    return calculateComplexityScore(numFiltersModified, complexityFactors);
}

// JavaScript function to calculate complexity score for "Number of templates"
function calculateTemplatesComplexity(numTemplates) {
    const complexityFactors = [
        { value: 5, score: 5 },
        { value: 2, score: 3 },
        { value: 1, score: 1 },
    ];
    return calculateComplexityScore(numTemplates, complexityFactors);
}

// Function to calculate complexity score for "Number of templates being modified"
function calculateNumTemplatesModifiedComplexity(numTemplatesModified) {
    const complexityFactors = [
        { value: 5, score: 10 },
        { value: 2, score: 5 },
        { value: 1, score: 2 },
    ];
    return calculateComplexityScore(numTemplatesModified, complexityFactors);
}

// JavaScript function to calculate complexity score for "Number of templates"
function calculateReceiptsComplexity(numReceiptsModified) {
    const complexityFactors = [
        { value: 10000000, score: 20 },
        { value: 1000000, score: 10 },
        { value: 100000, score: 4 },
        { value: 0, score: 2 },
    ];
    return calculateComplexityScore(numReceiptsModified, complexityFactors);
}

// JavaScript function to calculate complexity score for "Period being investigated"
function calculatePeriodComplexity(startYear, endYear) {
    const diffYears = endYear - startYear;
    const complexityFactors = [
        { value: 5, score: 8 },
        { value: 3, score: 5 },
        { value: 1, score: 3 },
        { value: 0, score: 1 },
    ];
    return calculateComplexityScore(diffYears, complexityFactors);
}

// JavaScript function to calculate complexity score for "Period of Development"
function calculateDevelopmentPeriodWeight(startYear, endYear) {
    const diffYears = endYear - startYear;
    const complexityFactors = [
        { value: 5, score: 15 },
        { value: 3, score: 9 },
        { value: 1, score: 4 },
        { value: 0, score: 2 },
    ];
    return calculateComplexityScore(diffYears, complexityFactors);
}

// Function to calculate complexity score for "Template type"
function calculateTemplateTypeComplexity(templateType) {
    const templateTypeWeights = {
        "html/txt": 0,
        "pdf": 4,
        "html/txt + pdf": 4,
    };
    return templateTypeWeights[templateType] || 0;
}

// function calculateAdditionalDevelopmentActionsComplexity(additionalDevelopmentActions) {
//     const additionalDevelopmentWeights = {
//         "dev_low_complexity":5,
//         "dev_medium_complexity":10,
//         "dev_high_complexity":15,
//     };
//     return additionalDevelopmentWeights[additionalDevelopmentActions] || 0;
// }

// function calculateAdditionalInvestigationActionsComplexity(additionalInvestigationActions) {
//     const additionalInvestigationWeights = {
//         "inv_low_complexity":2,
//         "inv_medium_complexity":4,
//         "inv_high_complexity":7,
//     };
//     return additionalInvestigationWeights[additionalInvestigationActions] || 0;
// }

// Function to calculate complexity score for "Template type"
function calculateDQRComplexity(NecessityOfDQR) {
    const DQRWeights = {
        "DQ Reparsing": 0,
        "DQ Update": 5,
    };
    return DQRWeights[NecessityOfDQR] || 0;
}

// Function to update the complexity range display
function updateTaskComplexityRange(score) {
    const complexityText = getComplexityText(score);
    const taskScoreRangeElement = document.getElementById('task-score-range');
    taskScoreRangeElement.innerHTML = complexityText;
}