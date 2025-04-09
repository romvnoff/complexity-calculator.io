// State management for resolution calculations

/**
 * Resolution states enumeration
 */
export const States = {
    INVESTIGATION_IN_PROGRESS: 'investigation_in_progress',
    INVESTIGATION_COMPLETED: 'investigation_completed',
    DEVELOPMENT_IN_PROGRESS: 'development_in_progress',
    DEVELOPMENT_COMPLETED: 'development_completed'
};

/**
 * Task types enumeration
 */
export const TaskTypes = {
    INVESTIGATION: 'Investigation',
    DEVELOPMENT: 'Development'
};

/**
 * Get current state based on task type and status
 * @param {string} taskType - Type of task
 * @param {string} investigationState - State of investigation
 * @param {string} taskState - State of development
 * @returns {string} Current state
 */
export function getCurrentState(taskType, investigationState, taskState) {
    if (taskType === TaskTypes.INVESTIGATION) {
        return investigationState === 'in_progress' 
            ? States.INVESTIGATION_IN_PROGRESS 
            : States.INVESTIGATION_COMPLETED;
    } else if (taskType === TaskTypes.DEVELOPMENT) {
        return taskState === 'in_progress' 
            ? States.DEVELOPMENT_IN_PROGRESS 
            : States.DEVELOPMENT_COMPLETED;
    }
    return null;
}

/**
 * Resolution data structure
 */
export class ResolutionData {
    constructor() {
        this.taskType = '';
        this.investigationState = '';
        this.taskState = '';
        this.merchantName = '';
        this.etaInvestigation = '';
        this.etaDevelopment = '';
        this.periodStart = null;
        this.periodEnd = null;
        this.numFilters = 0;
        this.numTemplates = 0;
        this.necessityOfDQR = '';
        this.numFiltersModified = 0;
        this.numTemplatesModified = 0;
        this.numReceiptsModified = 0;
        this.merchantSize = 0;
        this.developmentTime = '';
        this.additionalCommentInvestigation = '';
        this.additionalCommentDevelopment = '';
        this.periodOfDevelopmentStart = null;
        this.periodOfDevelopmentEnd = null;
    }

    /**
     * Load data from DOM elements
     */
    loadFromDOM() {
        const elements = {
            taskType: 'task_type',
            investigationState: 'investigation-state',
            taskState: 'task_state',
            merchantName: 'merchant_name',
            etaInvestigation: 'eta_investigation',
            etaDevelopment: 'eta_development',
            periodStart: 'period_start',
            periodEnd: 'period_end',
            numFilters: 'num_filters_investigated',
            numTemplates: 'num_templates_investigated',
            necessityOfDQR: 'necessity_of_dqr',
            numFiltersModified: 'num_filters_modified',
            numTemplatesModified: 'num_templates_modified',
            numReceiptsModified: 'num_receipts_modified',
            merchantSize: 'merchant_size',
            developmentTime: 'development_time',
            additionalCommentInvestigation: 'additional_comment_investigation',
            additionalCommentDevelopment: 'additional_comment_development',
            periodOfDevelopmentStart: 'period_of_development_start',
            periodOfDevelopmentEnd: 'period_of_development_end'
        };

        for (const [key, id] of Object.entries(elements)) {
            const element = document.getElementById(id);
            if (element) {
                this[key] = ['numFilters', 'numTemplates', 'numFiltersModified', 
                            'numTemplatesModified', 'numReceiptsModified', 'merchantSize',
                            'periodStart', 'periodEnd', 'periodOfDevelopmentStart', 
                            'periodOfDevelopmentEnd'].includes(key)
                    ? parseInt(element.value, 10) || 0
                    : element.value;
            }
        }
    }

    /**
     * Get current state
     * @returns {string} Current state
     */
    getState() {
        return getCurrentState(this.taskType, this.investigationState, this.taskState);
    }
}