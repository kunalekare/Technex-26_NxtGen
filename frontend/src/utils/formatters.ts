/**
 * Formats a number as a currency string without decimal points 
 * for a cleaner "Goal" look, as requested.
 */
export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(value);
};

/**
 * Formats a number with commas for standard numeric display.
 */
export const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('en-US').format(value);
};

/**
 * Ensures percentages are displayed with a single decimal point if needed.
 */
export const formatPercent = (value: number): string => {
    return `${value}%`;
};