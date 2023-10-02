// Function to update the short customer resolution
function updateShortCustomerResolution() {
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

    var shortCustomerResolution = "🤷";

    if (taskType === "Investigation" && investigationState === "in_progress") {
        
        shortCustomerResolution = "Investigation is currently in progress";
        if (merchantName) {
            shortCustomerResolution = 'Investigation regarding ' + merchantName + ' is in progress';
        }
        // Investigation period
        if (periodStart && !periodEnd) {
            shortCustomerResolution += '\nPeriod since ' + periodStart + ' will be investigated';
        } else if (periodStart && periodEnd && parseInt(periodEnd) === (new Date()).getFullYear()) {
            shortCustomerResolution += '\nPeriod since ' + periodStart + ' will be investigated';
        } else if (periodStart && periodEnd) {
            shortCustomerResolution += '\nPeriod since ' + periodStart + ' to ' + periodEnd + ' will be investigated';
        }
        if (etaInvestigation) {
            shortCustomerResolution += '\nETA for investigation: ' + (new Date(etaInvestigation)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        }
        // Additional comments for investigation
        if (additionalCommentInvestigation) {
            shortCustomerResolution += '\n\nAdditional Information:\n' + additionalCommentInvestigation;
        }
    } else if (taskType === "Investigation" && investigationState === "completed") {
        
        shortCustomerResolution = "Investigation is completed";
        if (merchantName) {
            shortCustomerResolution = 'Investigation regarding ' + merchantName + ' is completed';
        }
        if (periodStart && !periodEnd) {
            shortCustomerResolution += '\nPeriod since ' + periodStart + ' has been investigated';
        } else if (periodStart && periodEnd && parseInt(periodEnd) === (new Date()).getFullYear()) {
            shortCustomerResolution += '\nPeriod since ' + periodStart + ' has been investigated';
        } else if (periodStart && periodEnd) {
            shortCustomerResolution += '\nPeriod since ' + periodStart + ' to ' + periodEnd + ' has been investigated';
        }
        if (commentInvestigation) {
            shortCustomerResolution += '\n\nResults of investigation:\n' + commentInvestigation;
        }
        // Development time
        if (developmentTime) {
            shortCustomerResolution += `\n\n Development will take approximately ${developmentTime} business day${developmentTime === "1" ? '' : 's'}`;
        }
        if (additionalCommentInvestigation) {
            shortCustomerResolution += '\n\nAdditional Information:\n' + additionalCommentInvestigation;
        }
    } else if (taskType === "Development" && taskState === "in_progress") {
        
        shortCustomerResolution = "Development is currently in progress";
        if (merchantName) {
            shortCustomerResolution = 'Development of ' + merchantName + ' merchant is currently in progress;';
        }
        if (etaDevelopment) {
            shortCustomerResolution += '\nETA for development: ' + (new Date(etaDevelopment)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        }
        // Period of development
        if (periodOfDevelopmentStart && !periodOfDevelopmentEnd) {
            shortCustomerResolution += '\nPeriod since ' + periodOfDevelopmentStart + (taskState === "completed" ? " is" : " will be") + " covered during developement";
        } else if (periodOfDevelopmentStart && periodOfDevelopmentEnd && parseInt(periodOfDevelopmentEnd) === (new Date()).getFullYear()) {
            shortCustomerResolution += '\nPeriod since ' + periodOfDevelopmentStart + (taskState === "completed" ? " is" : " will be") + " covered during developement";
        } else if (periodOfDevelopmentStart && periodOfDevelopmentEnd) {
            shortCustomerResolution += '\nPeriod since ' + periodOfDevelopmentStart + ' to ' + periodOfDevelopmentEnd + (taskState === "completed" ? " " : " will be ") + "covered during developement";
        }
        if (additionalCommentDevelopment) {
            shortCustomerResolution += '\n\nAdditional Information:\n' + additionalCommentDevelopment;
        }
    } else if (taskType === "Development" && taskState === "completed") {

        shortCustomerResolution = "Development is completed";
        if (merchantName) {
            shortCustomerResolution = 'Development of ' + merchantName + ' merchant is completed';
        }
        if (commentDevelopment) {
            shortCustomerResolution += '\n\nList of changes:\n' + commentDevelopment;
        }
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
        
            shortCustomerResolution += '\n\n' + receiptFormatted + ' business objects have been modified' + additionalInfo;
        }
        if (periodOfDevelopmentStart && !periodOfDevelopmentEnd) {
            shortCustomerResolution += `\n\nDevelopment covered period since ${periodOfDevelopmentStart}`;
        } else if (periodOfDevelopmentStart && periodOfDevelopmentEnd && parseInt(periodOfDevelopmentEnd) === (new Date()).getFullYear()) {
            shortCustomerResolution += `\n\nDevelopment covered period since ${periodOfDevelopmentStart}`;
        } else if (periodOfDevelopmentStart && periodOfDevelopmentEnd) {
            shortCustomerResolution += `\n\nDevelopment covered period since ${periodOfDevelopmentStart} to ${periodOfDevelopmentEnd}`;
        }
        if (additionalCommentDevelopment) {
            shortCustomerResolution += '\n\nAdditional Information:\n' + additionalCommentDevelopment;
        }
    } else if (taskType === "Investigation + Development" && commentInvestigation) {
        shortCustomerResolution = commentInvestigation + '\n' + commentDevelopment;
    }

    document.getElementById("short-customer-resolution").textContent = shortCustomerResolution;
}




// Add event listeners to update short customer resolution on form changes
document.addEventListener("DOMContentLoaded", function () {
    var formInputs = document.querySelectorAll("#investigation-section select, #development-section select, #comment_investigation, #task_type, #comment_development, #eta_investigation, #development_time, #task_state, #eta_development, #num_receipts_modified ,#merchant_size, #period_of_development_start, #period_of_development_end, #additional_comment_investigation, #additional_comment_development, #merchant_name, #period_start, #period_end");
    formInputs.forEach(function (input) {
        input.addEventListener("change", updateShortCustomerResolution);
    });

    // Set default short customer resolution on page load
    updateShortCustomerResolution();
});