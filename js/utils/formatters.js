// Utility functions for formatting and text manipulation

/**
 * Format number to K/M notation
 * @param {number} number - Number to format
 * @returns {string} Formatted number
 */
export function formatLargeNumber(number) {
    if (isNaN(number)) return '0';
    
    const num = parseInt(number, 10);
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

/**
 * Format date to locale string
 * @param {string} date - Date string
 * @returns {string} Formatted date
 */
export function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

/**
 * Add plural suffix if needed
 * @param {number} count - Count to check
 * @param {string} word - Word to pluralize
 * @returns {string} Pluralized word
 */
export function pluralize(count, word) {
    return `${count} ${word}${count === 1 ? '' : 's'}`;
}