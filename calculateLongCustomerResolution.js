// JavaScript function to calculate long customer resolution
function calculateLongCustomerResolution(
    investigationState, 
    taskType, 
    etaInvestigation, 
    periodStart, 
    periodEnd, 
    numFilters, 
    numTemplates, 
    necessityOfDQR, 
    periodOfDevelopmentStart, 
    periodOfDevelopmentEnd, 
    taskState, 
    etaDevelopment,
    numFiltersModified,
    numTemplatesModified,
    numReceiptsModified,
    merchantSize,
    issueReason,
    requestTypeDevelopment,
    commentDevelopment,
    developmentTime,
    additionalCommentInvestigation

) {
    var requestTypeDevelopment = document.getElementById("request_type_development").value;
    var issueReason = document.getElementById("issue_reason").value;
    var commentDevelopment = document.getElementById("comment_development").value;

    if (taskType === "Investigation") {
        if (investigationState === "in_progress") {
            longCustomerResolution = "Investigation is currently in progress";
            if (etaInvestigation) {
                longCustomerResolution += '\nETA for Investigation: ' + (new Date(etaInvestigation)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            }
            if (periodStart && !periodEnd) {
                longCustomerResolution += '\nPeriod since ' + periodStart + ' will be investigated';
            } else if (periodStart && periodEnd && parseInt(periodEnd) === (new Date()).getFullYear()) {
                longCustomerResolution += '\nPeriod since ' + periodStart + ' will be investigated';
            } else if (periodStart && periodEnd) {
                longCustomerResolution += '\nPeriod since ' + periodStart + ' to ' + periodEnd + ' will be investigated';
            }
            if (numFilters && numTemplates) {
                longCustomerResolution += '\n' + numFilters + ' filter' + (numFilters === 1 ? '' : 's') + ' and ' + numTemplates + ' template' + (numTemplates === 1 ? '' : 's') + ' will be investigated';
            } else if (!numFilters && numTemplates) {
                longCustomerResolution += '\n' + numTemplates + ' template' + (numTemplates === 1 ? ' has been' : 's have been') + ' investigated';
            } else if (numFilters && !numTemplates) {
                longCustomerResolution += '\n' + numFilters + ' filter' + (numFilters === 1 ? '' : 's') + ' will be investigated';
            }
                // Additional comments for investigation
            if (additionalCommentInvestigation) {
                longCustomerResolution += '\n\nAdditional Information:\n' + additionalCommentInvestigation;
            }
        } else if (investigationState === "completed") {
            longCustomerResolution = "Investigation is completed";
            if (etaInvestigation) {
                longCustomerResolution += '\nETA for development: ' + (new Date(etaInvestigation)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            }
            if (developmentTime) {
                longCustomerResolution += `\n${developmentTime} business day${developmentTime === 1 ? '' : 's'} required for development`;
            }
            if (periodStart && !periodEnd) {
                longCustomerResolution += '\nPeriod since ' + periodStart + ' has been investigated';
            } else if (periodStart && periodEnd && parseInt(periodEnd) === (new Date()).getFullYear()) {
                longCustomerResolution += '\nPeriod since ' + periodStart + ' has been investigated';
            } else if (periodStart && periodEnd) {
                longCustomerResolution += '\nPeriod since ' + periodStart + ' to ' + periodEnd + ' has been investigated';
            }
            if (numFilters && numTemplates) {
                longCustomerResolution += '\n' + numFilters + ' filter' + (numFilters === 1 ? '' : 's') + ' and ' + numTemplates + ' template' + (numTemplates === 1 ? '' : 's') + ' have been investigated';
            } else if (!numFilters && numTemplates) {
                longCustomerResolution += '\n' + numTemplates + ' template' + (numTemplates === 1 ? ' has been' : 's have been') + ' investigated';
            } else if (numFilters && !numTemplates) {
                longCustomerResolution += '\n' + numFilters + ' filter' + (numFilters === 1 ? ' has been' : 's have been') + ' investigated';
            }
                // Additional comments for investigation
            if (additionalCommentInvestigation) {
                longCustomerResolution += '\n\nAdditional Information:\n' + additionalCommentInvestigation;
            }
        }
    } else if (taskType === "Development") {
        if (taskState === "in_progress") {
            longCustomerResolution = "Development is currently in progress";

            if (requestTypeDevelopment === "Refactoring") {
                longCustomerResolution += '\nMerchant ' + (taskState === "completed" ? "has been" : "will be") + ' refactored due to ' + issueReason.toLowerCase();
            } else if (requestTypeDevelopment === "New Template") {
                longCustomerResolution += '\nDue to ' + issueReason.toLowerCase() + ', ' + numTemplatesModified + ' new template' + (numTemplatesModified === 1 ? " " : "s ") + (taskState === "completed" ? "have been" : "will be") + ' created';
            } else if (requestTypeDevelopment === "Template Fix") {
                longCustomerResolution += '\nIssue caused by ' + issueReason.toLowerCase() + ' ' + (taskState === "completed" ? "has been" : "will be") + ' resolved by fixing the template' + (numTemplatesModified === 1 ? "" : "s");
            } else if (requestTypeDevelopment === "Template Enrichment") {
                longCustomerResolution += '\nDue to ' + issueReason.toLowerCase() + ' template' + (numTemplatesModified === 1 ? (taskState === "completed" ? " has been" : " will be") : (taskState === "in_progress" ? "s will be" : "s have been")) + ' modified';
            } else if (requestTypeDevelopment === "Filter + Template Development") {
                const filterReason = issueReason.match(/Need to (.+)/)[1];
                longCustomerResolution += '\nIn order to ' + filterReason + ', new ' + (numFiltersModified > 0 ? "filter" + (numFiltersModified === 1 ? "" : "s") + " and corresponding " : "") + 'template' + (numTemplatesModified === 1 ? (taskState === "in_progress" ? " will be" : " has been") : (taskState === "in_progress" ? "s will be" : "s have been")) + ' added';
            } else if (requestTypeDevelopment === "Filter Coverage") {
                longCustomerResolution += '\nFilter' + (numFiltersModified === 1 ? " " : "s ") + (taskState === "completed" ? "" : "will be") + ' created due to ' + issueReason.toLowerCase();
            } else if (requestTypeDevelopment === "Filter Modification") {
                longCustomerResolution += '\nFilter' + (numFiltersModified === 1 ? "" : "s") + ' parameters have been modified due to ' + issueReason.toLowerCase() + (commentDevelopment ? ': ' + commentDevelopment : "");
            } else if (requestTypeDevelopment === "Outlier [Comment Required]") {
                longCustomerResolution += '\nSee additional comment section';
            }
            if (etaDevelopment) {
                longCustomerResolution += '\nETA for Development: ' + (new Date(etaDevelopment)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            }
            if (necessityOfDQR === "Not Required") {
                longCustomerResolution += '\nHistorical data fix is not required';
            } else if (necessityOfDQR === "DQ Reparsing" || necessityOfDQR === "DQ Update") {
                longCustomerResolution += '\nHistorical data ' + (taskState === "completed" ? "has been" : "will be") + " corrected via " + necessityOfDQR;
            }
            if (periodOfDevelopmentStart && !periodOfDevelopmentEnd) {
                longCustomerResolution += '\nPeriod since ' + periodOfDevelopmentStart + (taskState === "completed" ? " is" : " will be") + " covered";
            } else if (periodOfDevelopmentStart && periodOfDevelopmentEnd && parseInt(periodOfDevelopmentEnd) === (new Date()).getFullYear()) {
                longCustomerResolution += '\nPeriod since ' + periodOfDevelopmentStart + (taskState === "completed" ? " is" : " will be") + " covered";
            } else if (periodOfDevelopmentStart && periodOfDevelopmentEnd) {
                longCustomerResolution += '\nPeriod since ' + periodOfDevelopmentStart + ' to ' + periodOfDevelopmentEnd + (taskState === "completed" ? " " : " will be ") + "covered";
            }
            if (numFiltersModified && numTemplatesModified) {
                longCustomerResolution += '\n' + numFiltersModified + ' filter' + (numFiltersModified === 1 ? '' : 's') + ' and ' + numTemplatesModified + ' template' + (numTemplatesModified === 1 ? '' : 's') + ' will be modified';
            } else if (!numFiltersModified && numTemplatesModified) {
                longCustomerResolution += '\n' + numTemplatesModified + ' template' + (numTemplatesModified === 1 ? ' will be' : 's will be') + ' modified';
            } else if (numFiltersModified && !numTemplatesModified) {
                longCustomerResolution += '\n' + numFiltersModified + ' filter' + (numFiltersModified === 1 ? '' : 's') + ' will be investigated';
            }
            if (!isNaN(numReceiptsModified) && !isNaN(merchantSize)) {
                let receiptFormatted = numReceiptsModified.toString();
                
                if (numReceiptsModified >= 1000 && numReceiptsModified < 1000000) {
                    receiptFormatted = (numReceiptsModified / 1000).toFixed(1) + 'K';
                } else if (numReceiptsModified >= 1000000) {
                    receiptFormatted = (numReceiptsModified / 1000000).toFixed(1) + 'M';
                }

                const percentMerchantVolume = (numReceiptsModified / merchantSize) * 100;
                longCustomerResolution += '\n' + receiptFormatted + ' receipts ' +
                    (taskState === "completed" ? "" : "will be") +
                    ' re-parsed' +
                    (merchantSize ? `, i.e., ${percentMerchantVolume.toFixed(2)}% of total merchant volume` : '');
            } else if (!isNaN(numReceiptsModified) && isNaN(merchantSize)) {
                let receiptFormatted = numReceiptsModified.toString();

                if (numReceiptsModified >= 1000 && numReceiptsModified < 1000000) {
                    receiptFormatted = (numReceiptsModified / 1000).toFixed(1) + 'K';
                } else if (numReceiptsModified >= 1000000) {
                    receiptFormatted = (numReceiptsModified / 1000000).toFixed(1) + 'M';
                }

                longCustomerResolution += '\n' + receiptFormatted + ' business objects will be modified';
            }
        } else if (taskState === "completed") {
            longCustomerResolution = "Development is completed";
            
            if (requestTypeDevelopment === "Refactoring") {
                longCustomerResolution += '\nMerchant ' + (taskState === "completed" ? "has been" : "will be") + ' refactored due to ' + issueReason.toLowerCase();
            } else if (requestTypeDevelopment === "New Template") {
                longCustomerResolution += '\nDue to ' + issueReason.toLowerCase() + ', ' + numTemplatesModified + ' new template' + (numTemplatesModified === 1 ? " " : "s ") + (taskState === "completed" ? "have been" : "will be") + ' created';
            } else if (requestTypeDevelopment === "Template Fix") {
                longCustomerResolution += '\nIssue caused by ' + issueReason.toLowerCase() + ' ' + (taskState === "completed" ? "has been" : "will be") + ' resolved by fixing the template' + (numTemplatesModified === 1 ? "" : "s");
            } else if (requestTypeDevelopment === "Template Enrichment") {
                longCustomerResolution += '\nDue to ' + issueReason.toLowerCase() + ' template' + (numTemplatesModified === 1 ? (taskState === "completed" ? " has been" : " will be") : (taskState === "in_progress" ? "s will be" : "s have been")) + ' modified';
            } else if (requestTypeDevelopment === "Filter + Template Development") {
                const filterReason = issueReason.match(/Need to (.+)/)[1];
                longCustomerResolution += '\nIn order to ' + filterReason + ', new ' + (numFiltersModified > 0 ? "filter" + (numFiltersModified === 1 ? "" : "s") + " and corresponding " : "") + 'template' + (numTemplatesModified === 1 ? (taskState === "in_progress" ? " will be" : " has been") : (taskState === "in_progress" ? "s will be" : "s have been")) + ' added';
            } else if (requestTypeDevelopment === "Filter Coverage") {
                longCustomerResolution += '\nFilter' + (numFiltersModified === 1 ? " " : "s ") + (taskState === "completed" ? "" : "will be") + ' created due to ' + issueReason.toLowerCase();
            } else if (requestTypeDevelopment === "Filter Modification") {
                longCustomerResolution += '\nFilter' + (numFiltersModified === 1 ? "" : "s") + ' parameters have been modified due to ' + issueReason.toLowerCase() + (commentDevelopment ? ': ' + commentDevelopment : "");
            } else if (requestTypeDevelopment === "Outlier [Comment Required]") {
                longCustomerResolution += '\nSee additional comment section';
            }
            if (necessityOfDQR === "Not Required") {
                longCustomerResolution += '\nHistorical data fix is not required';
            } else if (necessityOfDQR === "DQ Reparsing" || necessityOfDQR === "DQ Update") {
                longCustomerResolution += '\nHistorical data ' + (taskState === "completed" ? "has been" : "will be") + " corrected via " + necessityOfDQR;
            }
            if (periodOfDevelopmentStart && !periodOfDevelopmentEnd) {
                longCustomerResolution += '\nPeriod since ' + periodOfDevelopmentStart + (taskState === "completed" ? " is" : " will be") + " covered";
            } else if (periodOfDevelopmentStart && periodOfDevelopmentEnd && parseInt(periodOfDevelopmentEnd) === (new Date()).getFullYear()) {
                longCustomerResolution += '\nPeriod since ' + periodOfDevelopmentStart + (taskState === "completed" ? " is" : " will be") + " covered";
            } else if (periodOfDevelopmentStart && periodOfDevelopmentEnd) {
                longCustomerResolution += '\nPeriod since ' + periodOfDevelopmentStart + ' to ' + periodOfDevelopmentEnd + (taskState === "completed" ? " " : " will be ") + "covered";
            }
            if (numFiltersModified && numTemplatesModified) {
                longCustomerResolution += '\n' + numFiltersModified + ' filter' + (numFiltersModified === 1 ? '' : 's') + ' and ' + numTemplatesModified + ' template' + (numTemplatesModified === 1 ? '' : 's') + ' have been modified';
            } else if (!numFiltersModified && numTemplatesModified) {
                longCustomerResolution += '\n' + numTemplatesModified + ' template' + (numTemplatesModified === 1 ? ' has been' : 's have been') + ' modified';
            } else if (numFiltersModified && !numTemplatesModified) {
                longCustomerResolution += '\n' + numFiltersModified + ' filter' + (numFiltersModified === 1 ? '' : 's') + ' has been investigated';
            }
            if (!isNaN(numReceiptsModified) && !isNaN(merchantSize)) {
                let receiptFormatted = numReceiptsModified.toString();
                
                if (numReceiptsModified >= 1000 && numReceiptsModified < 1000000) {
                    receiptFormatted = (numReceiptsModified / 1000).toFixed(1) + 'K';
                } else if (numReceiptsModified >= 1000000) {
                    receiptFormatted = (numReceiptsModified / 1000000).toFixed(1) + 'M';
                }

                const percentMerchantVolume = (numReceiptsModified / merchantSize) * 100;
                longCustomerResolution += '\n' + receiptFormatted + ' orders ' +
                    (taskState === "completed" ? "" : "will be") +
                    ' re-parsed' +
                    (merchantSize ? `, i.e., ${percentMerchantVolume.toFixed(2)}% of total merchant volume` : '');
            } else if (!isNaN(numReceiptsModified) && isNaN(merchantSize)) {
                let receiptFormatted = numReceiptsModified.toString();

                if (numReceiptsModified >= 1000 && numReceiptsModified < 1000000) {
                    receiptFormatted = (numReceiptsModified / 1000).toFixed(1) + 'K';
                } else if (numReceiptsModified >= 1000000) {
                    receiptFormatted = (numReceiptsModified / 1000000).toFixed(1) + 'M';
                }

                longCustomerResolution += '\n' + receiptFormatted + ' business objects modified';
            }

        }
    } else {
        longCustomerResolution = "🙇";
    }

    return longCustomerResolution;
}
