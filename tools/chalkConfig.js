// Centralized configuration for chalk, which is used to add color to console.log statements.
import chalk from 'chalk';

export const chalkError = chalk.white.bgRed;
export const chalkSuccess = chalk.green.bold;
export const chalkWarning = chalk.yellow;
export const chalkProcessing = chalk.cyan;
