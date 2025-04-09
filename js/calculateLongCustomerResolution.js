// JavaScript function to calculate long customer resolution
import { generateResolutionText } from './generators/resolutionGenerator.js';
import { ResolutionData } from './state/resolutionState.js';

/**
 * Calculate and return the long customer resolution text
 * @param {string} investigationState - Current investigation state
 * @param {string} taskType - Type of task
 * @param {string} etaInvestigation - Investigation ETA
 * @param {number} periodStart - Start period
 * @param {number} periodEnd - End period
 * @param {number} numFilters - Number of filters
 * @param {number} numTemplates - Number of templates
 * @param {string} necessityOfDQR - DQR necessity
 * @param {number} periodOfDevelopmentStart - Development start period
 * @param {number} periodOfDevelopmentEnd - Development end period
 * @param {string} taskState - Task state
 * @param {string} etaDevelopment - Development ETA
 * @param {number} numFiltersModified - Number of modified filters
 * @param {number} numTemplatesModified - Number of modified templates
 * @param {number} numReceiptsModified - Number of modified receipts
 * @param {number} merchantSize - Merchant size
 * @param {string} issueReason - Reason for issue
 * @param {string} requestTypeDevelopment - Type of development request
 * @param {string} commentDevelopment - Development comment
 * @param {string} developmentTime - Development time
 * @param {string} additionalCommentInvestigation - Additional investigation comment
 * @returns {string} Formatted long customer resolution text
 */
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
    // Create and populate resolution data
    const data = new ResolutionData();
    
    // Set all the properties
    Object.assign(data, {
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
    });

    // Generate and return the resolution text
    return generateResolutionText(data);
}
