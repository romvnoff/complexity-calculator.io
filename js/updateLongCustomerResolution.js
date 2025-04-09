// Function to update the short customer resolution
function updatelongCustomerResolution() {
    var taskType = document.getElementById("task_type").value;
    var investigationState = document.getElementById("investigation-state").value;
    var etaInvestigation = document.getElementById("eta_investigation").value;
    var etaDevelopment = document.getElementById("eta_development").value;
    var commentInvestigation = document.getElementById('comment_investigation').value;
    var commentDevelopment = document.getElementById("comment_development").value;
    var developmentTime = document.getElementById('development_time').value;
    var taskState = document.getElementById('task_state').value;
    var merchantSize = parseInt(document.getElementById('merchant_size').value, 10);
    var numReceiptsModified = parseInt(document.getElementById('num_receipts_modified').value, 10);
    var periodOfDevelopmentStart = parseInt(document.getElementById('period_of_development_start').value, 10);
    var periodOfDevelopmentEnd = parseInt(document.getElementById('period_of_development_end').value, 10);
    var additionalCommentInvestigation = document.getElementById('additional_comment_investigation').value;
    var additionalCommentDevelopment = document.getElementById('additional_comment_development').value;
    var merchantName = document.getElementById('merchant_name').value;
    var periodStart = parseInt(document.getElementById('period_start').value, 10);
    var periodEnd = parseInt(document.getElementById('period_end').value, 10);
    var numFilters = parseInt(document.getElementById('num_filters_investigated').value, 10);
    var numTemplates = parseInt(document.getElementById('num_templates_investigated').value, 10);
    var necessityOfDQR = document.getElementById('necessity_of_dqr').value;
    var numFiltersModified = parseInt(document.getElementById('num_filters_modified').value, 10);
    var numTemplatesModified = parseInt(document.getElementById('num_templates_modified').value, 10);
    var numReceiptsModified = parseInt(document.getElementById('num_receipts_modified').value, 10);

    var longCustomerResolution = "🙇";

    // INVESTIGATION IN PROGRESS
    if (taskType === "Investigation" && investigationState === "in_progress") {
        
        longCustomerResolution = "Investigation is currently in progress";

        // Investigation ETA
        if (merchantName) {
            longCustomerResolution = 'Investigation regarding ' + merchantName + ' is in progress';
        }
        if (etaInvestigation) {
            longCustomerResolution += '\n• ETA for investigation: ' + (new Date(etaInvestigation)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        }
        
        // Investigation period
        if (periodStart && !periodEnd) {
            longCustomerResolution += '\n• Period since ' + periodStart + ' will be investigated';
        } else if (periodStart && periodEnd && parseInt(periodEnd) === (new Date()).getFullYear()) {
            longCustomerResolution += '\n• Period since ' + periodStart + ' will be investigated';
        } else if (periodStart && periodEnd) {
            longCustomerResolution += '\n• Period since ' + periodStart + ' to ' + periodEnd + ' will be investigated';
        }

        // Number of filters and templates
        if (numFilters && numTemplates) {
            longCustomerResolution += '\n• ' + numFilters + ' filter' + (numFilters === 1 ? '' : 's') + ' and ' + numTemplates + ' template' + (numTemplates === 1 ? '' : 's') + ' will be investigated';
        } else if (!numFilters && numTemplates) {
            longCustomerResolution += '\n• ' + numTemplates + ' template' + (numTemplates === 1 ? '' : 's') + ' will be investigated';
        } else if (numFilters && !numTemplates) {
            longCustomerResolution += '\n• ' + numFilters + ' filter' + (numFilters === 1 ? '' : 's') + ' will be investigated';
        }

        // Additional comments for investigation
        if (additionalCommentInvestigation) {
            longCustomerResolution += '\n\nAdditional Information:\n' + additionalCommentInvestigation;
        }

    // INVESTIGATION COMPLETED
    } else if (taskType === "Investigation" && investigationState === "completed") {
        
        longCustomerResolution = "Investigation is completed";
        
        // Merchant name
        if (merchantName) {
            longCustomerResolution = 'Investigation regarding ' + merchantName + ' is completed';
        }

        // Investigation period
        if (periodStart && !periodEnd) {
            longCustomerResolution += '\n• period since ' + periodStart + ' has been investigated';
        } else if (periodStart && periodEnd && parseInt(periodEnd) === (new Date()).getFullYear()) {
            longCustomerResolution += '\n• period since ' + periodStart + ' has been investigated';
        } else if (periodStart && periodEnd) {
            longCustomerResolution += '\n• period since ' + periodStart + ' to ' + periodEnd + ' has been investigated';
        }

        // Number of filters and templates
        if (numFilters && numTemplates) {
            longCustomerResolution += '\n• ' + numFilters + ' filter' + (numFilters === 1 ? '' : 's') + ' and ' + numTemplates + ' template' + (numTemplates === 1 ? '' : 's') + ' have been investigated';
        } else if (!numFilters && numTemplates) {
            longCustomerResolution += '\n• ' + numTemplates + ' template' + (numTemplates === 1 ? ' has been' : 's have been') + ' investigated';
        } else if (numFilters && !numTemplates) {
            longCustomerResolution += '\n• ' + numFilters + ' filter' + (numFilters === 1 ? ' has been' : 's have been') + ' investigated';
        }

        // Investigation results   
        if (commentInvestigation) {
            longCustomerResolution += '\n\nResults of investigation:\n' + commentInvestigation;
        }

        // Development time
        if (developmentTime) {
            longCustomerResolution += `\n\n Development will take approximately ${developmentTime} business day${developmentTime === "1" ? '' : 's'}`;
        }

        // Additional comments for investigation
        if (additionalCommentInvestigation) {
            longCustomerResolution += '\n\nAdditional Information:\n' + additionalCommentInvestigation;
        }
    
    // DEVELOPMENT IN PROGRESS
    } else if (taskType === "Development" && taskState === "in_progress") {
        
        longCustomerResolution = "Development is currently in progress";
        
        // Merchant name
        if (merchantName) {
            longCustomerResolution = 'Development of ' + merchantName + ' merchant is currently in progress';
        }

        // Period of development
        if (periodOfDevelopmentStart && !periodOfDevelopmentEnd) {
            longCustomerResolution += '\n• Period since ' + periodOfDevelopmentStart + (taskState === "completed" ? " is" : " will be") + " covered during developement";
        } else if (periodOfDevelopmentStart && periodOfDevelopmentEnd && parseInt(periodOfDevelopmentEnd) === (new Date()).getFullYear()) {
            longCustomerResolution += '\n• Period since ' + periodOfDevelopmentStart + (taskState === "completed" ? " is" : " will be") + " covered during developement";
        } else if (periodOfDevelopmentStart && periodOfDevelopmentEnd) {
            longCustomerResolution += '\n• Period since ' + periodOfDevelopmentStart + ' to ' + periodOfDevelopmentEnd + (taskState === "completed" ? " " : " will be ") + "covered during developement";
        }

        // Number of filters and templates
        if (numFiltersModified && numTemplatesModified) {
            longCustomerResolution += '\n• ' + numFiltersModified + ' filter' + (numFiltersModified === 1 ? '' : 's') + ' and ' + numTemplatesModified + ' template' + (numTemplatesModified === 1 ? '' : 's') + ' will be modified';
        } else if (!numFiltersModified && numTemplatesModified) {
            longCustomerResolution += '\n• ' + numTemplatesModified + ' template' + (numTemplatesModified === 1 ? ' will be' : 's will be') + ' modified';
        } else if (numFiltersModified && !numTemplatesModified) {
            longCustomerResolution += '\n• ' + numFiltersModified + ' filter' + (numFiltersModified === 1 ? '' : 's') + ' will be investigated';
        }

        // Receipts
        if (!isNaN(numReceiptsModified) && !isNaN(merchantSize)) {
            let receiptFormatted = numReceiptsModified.toString();
            
            if (numReceiptsModified >= 1000 && numReceiptsModified < 1000000) {
                receiptFormatted = (numReceiptsModified / 1000).toFixed(1) + 'K';
            } else if (numReceiptsModified >= 1000000) {
                receiptFormatted = (numReceiptsModified / 1000000).toFixed(1) + 'M';
            }

            const percentMerchantVolume = (numReceiptsModified / merchantSize) * 100;
            longCustomerResolution += '\n• ' + receiptFormatted + ' receipts ' + "will be" + ' modified' + (merchantSize ? `, i.e., ${percentMerchantVolume.toFixed(2)}% of total merchant volume` : '');
        } else if (!isNaN(numReceiptsModified) && isNaN(merchantSize)) {
            let receiptFormatted = numReceiptsModified.toString();

            if (numReceiptsModified >= 1000 && numReceiptsModified < 1000000) {
                receiptFormatted = (numReceiptsModified / 1000).toFixed(1) + 'K';
            } else if (numReceiptsModified >= 1000000) {
                receiptFormatted = (numReceiptsModified / 1000000).toFixed(1) + 'M';
            }

            longCustomerResolution += '\n• ' + receiptFormatted + ' business objects will be modified';
        }

        // DQR
        if (necessityOfDQR === "Not Required") {
            longCustomerResolution += '\n• Historical data fix is not required';
        } else if (necessityOfDQR === "DQ Reparsing" || necessityOfDQR === "DQ Update") {
            longCustomerResolution += '\n• Historical data ' + "will be" + " adjusted via " + necessityOfDQR;
        }
        
        // ETA for development
        if (etaDevelopment) {
            longCustomerResolution += '\n\nETA for development: ' + (new Date(etaDevelopment)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        }
        // Additional comments for development
        if (additionalCommentDevelopment) {
            longCustomerResolution += '\n\nAdditional Information:\n' + additionalCommentDevelopment;
        }

    // DEVELOPMENT COMPLETED
    } else if (taskType === "Development" && taskState === "completed") {

        longCustomerResolution = "Development is completed";
        
        // Merchant
        if (merchantName) {
            longCustomerResolution = 'Development of ' + merchantName + ' merchant is completed';
        }

        // Number of filters and templates
        if (numFiltersModified && numTemplatesModified) {
            longCustomerResolution += '\n• ' + numFiltersModified + ' filter' + (numFiltersModified === 1 ? '' : 's') + ' and ' + numTemplatesModified + ' template' + (numTemplatesModified === 1 ? '' : 's') + ' have been modified';
        } else if (!numFiltersModified && numTemplatesModified) {
            longCustomerResolution += '\n• ' + numTemplatesModified + ' template' + (numTemplatesModified === 1 ? ' has been' : 's have been') + ' modified';
        } else if (numFiltersModified && !numTemplatesModified) {
            longCustomerResolution += '\n• ' + numFiltersModified + ' filter' + (numFiltersModified === 1 ? '' : 's') + ' has been investigated';
        }

        // Receipts
        if (!isNaN(numReceiptsModified)) {
            let receiptFormatted = numReceiptsModified.toString();
            
            if (numReceiptsModified >= 1000 && numReceiptsModified < 1000000) {
                receiptFormatted = (numReceiptsModified / 1000).toFixed(1) + 'K';
            } else if (numReceiptsModified >= 1000000) {
                receiptFormatted = (numReceiptsModified / 1000000).toFixed(1) + 'M';
            }
        
            let additionalInfo = "";
            
            if (!isNaN(merchantSize)) {
                const percentMerchantVolume = (numReceiptsModified / merchantSize) * 100;
                additionalInfo = `, i.e., ${percentMerchantVolume.toFixed(2)}% of total merchant volume`;
            }
        
            longCustomerResolution += '\n• ' + receiptFormatted + ' business objects have been modified' + additionalInfo;
        }

        // DQR
        if (necessityOfDQR === "Not Required") {
            longCustomerResolution += '\n• Historical data fix was not required';
        } else if (necessityOfDQR === "DQ Reparsing" || necessityOfDQR === "DQ Update") {
            longCustomerResolution += '\n• Historical data ' + "has been" + " adjusted via " + necessityOfDQR;
        }

        // List of changes
        if (commentDevelopment) {
            longCustomerResolution += '\n\nList of changes:\n' + commentDevelopment;
        }
        
        // Period of development
        if (periodOfDevelopmentStart && !periodOfDevelopmentEnd) {
            longCustomerResolution += `\n\nDevelopment covered period since ${periodOfDevelopmentStart}`;
        } else if (periodOfDevelopmentStart && periodOfDevelopmentEnd && parseInt(periodOfDevelopmentEnd) === (new Date()).getFullYear()) {
            longCustomerResolution += `\n\nDevelopment covered period since ${periodOfDevelopmentStart}`;
        } else if (periodOfDevelopmentStart && periodOfDevelopmentEnd) {
            longCustomerResolution += `\n\nDevelopment covered period since ${periodOfDevelopmentStart} to ${periodOfDevelopmentEnd}`;
        }
        if (additionalCommentDevelopment) {
            longCustomerResolution += '\n\nAdditional Information:\n' + additionalCommentDevelopment;
        }
    
    // INVESTIGATION + DEVELOPMENT [NOT ACTUAL]
    } else if (taskType === "Investigation + Development" && commentInvestigation) {
        longCustomerResolution = commentInvestigation + '\n' + commentDevelopment;
    }

    document.getElementById("long-customer-resolution").textContent = longCustomerResolution;
}




// Add event listeners to update short customer resolution on form changes
document.addEventListener("DOMContentLoaded", function () {
    var formInputs = document.querySelectorAll("#investigation-section select, #development-section select, #comment_investigation, #task_type, #comment_development, #eta_investigation, #development_time, #task_state, #eta_development, #num_receipts_modified ,#merchant_size, #period_of_development_start, #period_of_development_end, #additional_comment_investigation, #additional_comment_development, #merchant_name, #period_start, #period_end, #num_filters_investigated, #num_templates_investigated, #necessity_of_dqr, #num_templates_modified, #num_filters_modified, #num_receipts_modified");
    formInputs.forEach(function (input) {
        input.addEventListener("change", updatelongCustomerResolution);
    });

    // Set default short customer resolution on page load
    updatelongCustomerResolution();
});


