// Resolution text generation functions
import { formatDate, formatLargeNumber, pluralize } from '../utils/formatters.js';
import { States, TaskTypes } from '../state/resolutionState.js';

/**
 * Generate investigation in progress text
 * @param {ResolutionData} data - Resolution data
 * @returns {string} Formatted text
 */
function generateInvestigationInProgress(data) {
    let text = data.merchantName
        ? `Investigation regarding ${data.merchantName} is in progress`
        : 'Investigation is currently in progress';

    if (data.etaInvestigation) {
        text += `\n• ETA for investigation: ${formatDate(data.etaInvestigation)}`;
    }

    if (data.periodStart) {
        const currentYear = new Date().getFullYear();
        if (!data.periodEnd || data.periodEnd === currentYear) {
            text += `\n• Period since ${data.periodStart} will be investigated`;
        } else {
            text += `\n• Period since ${data.periodStart} to ${data.periodEnd} will be investigated`;
        }
    }

    if (data.numFilters || data.numTemplates) {
        const parts = [];
        if (data.numFilters) parts.push(pluralize(data.numFilters, 'filter'));
        if (data.numTemplates) parts.push(pluralize(data.numTemplates, 'template'));
        text += `\n• ${parts.join(' and ')} will be investigated`;
    }

    if (data.additionalCommentInvestigation) {
        text += '\n\nAdditional Information:\n' + data.additionalCommentInvestigation;
    }

    return text;
}

/**
 * Generate investigation completed text
 * @param {ResolutionData} data - Resolution data
 * @returns {string} Formatted text
 */
function generateInvestigationCompleted(data) {
    let text = data.merchantName
        ? `Investigation regarding ${data.merchantName} is completed`
        : 'Investigation is completed';

    if (data.periodStart) {
        const currentYear = new Date().getFullYear();
        if (!data.periodEnd || data.periodEnd === currentYear) {
            text += `\n• Period since ${data.periodStart} has been investigated`;
        } else {
            text += `\n• Period since ${data.periodStart} to ${data.periodEnd} has been investigated`;
        }
    }

    if (data.numFilters || data.numTemplates) {
        const parts = [];
        if (data.numFilters) parts.push(pluralize(data.numFilters, 'filter'));
        if (data.numTemplates) parts.push(pluralize(data.numTemplates, 'template'));
        text += `\n• ${parts.join(' and ')} have been investigated`;
    }

    if (data.developmentTime) {
        text += `\n\nDevelopment will take approximately ${pluralize(data.developmentTime, 'business day')}`;
    }

    if (data.additionalCommentInvestigation) {
        text += '\n\nAdditional Information:\n' + data.additionalCommentInvestigation;
    }

    return text;
}

/**
 * Generate development in progress text
 * @param {ResolutionData} data - Resolution data
 * @returns {string} Formatted text
 */
function generateDevelopmentInProgress(data) {
    let text = data.merchantName
        ? `Development of ${data.merchantName} merchant is currently in progress`
        : 'Development is currently in progress';

    if (data.periodOfDevelopmentStart) {
        const currentYear = new Date().getFullYear();
        if (!data.periodOfDevelopmentEnd || data.periodOfDevelopmentEnd === currentYear) {
            text += `\n• Period since ${data.periodOfDevelopmentStart} will be covered during development`;
        } else {
            text += `\n• Period since ${data.periodOfDevelopmentStart} to ${data.periodOfDevelopmentEnd} will be covered during development`;
        }
    }

    if (data.numFiltersModified || data.numTemplatesModified) {
        const parts = [];
        if (data.numFiltersModified) parts.push(pluralize(data.numFiltersModified, 'filter'));
        if (data.numTemplatesModified) parts.push(pluralize(data.numTemplatesModified, 'template'));
        text += `\n• ${parts.join(' and ')} will be modified`;
    }

    if (!isNaN(data.numReceiptsModified)) {
        const formattedReceipts = formatLargeNumber(data.numReceiptsModified);
        if (!isNaN(data.merchantSize)) {
            const percent = ((data.numReceiptsModified / data.merchantSize) * 100).toFixed(2);
            text += `\n• ${formattedReceipts} receipts will be modified, i.e., ${percent}% of total merchant volume`;
        } else {
            text += `\n• ${formattedReceipts} business objects will be modified`;
        }
    }

    if (data.necessityOfDQR) {
        if (data.necessityOfDQR === 'Not Required') {
            text += '\n• Historical data fix is not required';
        } else {
            text += `\n• Historical data will be adjusted via ${data.necessityOfDQR}`;
        }
    }

    if (data.etaDevelopment) {
        text += `\n\nETA for development: ${formatDate(data.etaDevelopment)}`;
    }

    if (data.additionalCommentDevelopment) {
        text += '\n\nAdditional Information:\n' + data.additionalCommentDevelopment;
    }

    return text;
}

/**
 * Generate development completed text
 * @param {ResolutionData} data - Resolution data
 * @returns {string} Formatted text
 */
function generateDevelopmentCompleted(data) {
    let text = data.merchantName
        ? `Development of ${data.merchantName} merchant is completed`
        : 'Development is completed';

    if (data.numFiltersModified || data.numTemplatesModified) {
        const parts = [];
        if (data.numFiltersModified) parts.push(pluralize(data.numFiltersModified, 'filter'));
        if (data.numTemplatesModified) parts.push(pluralize(data.numTemplatesModified, 'template'));
        text += `\n• ${parts.join(' and ')} have been modified`;
    }

    if (!isNaN(data.numReceiptsModified)) {
        const formattedReceipts = formatLargeNumber(data.numReceiptsModified);
        if (!isNaN(data.merchantSize)) {
            const percent = ((data.numReceiptsModified / data.merchantSize) * 100).toFixed(2);
            text += `\n• ${formattedReceipts} receipts have been modified, i.e., ${percent}% of total merchant volume`;
        } else {
            text += `\n• ${formattedReceipts} business objects have been modified`;
        }
    }

    if (data.necessityOfDQR) {
        if (data.necessityOfDQR === 'Not Required') {
            text += '\n• Historical data fix was not required';
        } else {
            text += `\n• Historical data has been adjusted via ${data.necessityOfDQR}`;
        }
    }

    if (data.additionalCommentDevelopment) {
        text += '\n\nAdditional Information:\n' + data.additionalCommentDevelopment;
    }

    return text;
}

/**
 * Generate resolution text based on current state
 * @param {ResolutionData} data - Resolution data
 * @returns {string} Formatted resolution text
 */
export function generateResolutionText(data) {
    switch (data.getState()) {
        case States.INVESTIGATION_IN_PROGRESS:
            return generateInvestigationInProgress(data);
        case States.INVESTIGATION_COMPLETED:
            return generateInvestigationCompleted(data);
        case States.DEVELOPMENT_IN_PROGRESS:
            return generateDevelopmentInProgress(data);
        case States.DEVELOPMENT_COMPLETED:
            return generateDevelopmentCompleted(data);
        default:
            return '🙇';
    }
}