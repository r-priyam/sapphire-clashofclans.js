import { container } from '@sapphire/framework';
import { cyanBright, yellowBright, greenBright } from 'colorette';

/**
 * Logs the info message with appropriate label/colors.
 */
export function info({ label, message }: { label?: string; message: string }) {
	container.logger.info(`${label ? `${cyanBright(`[${label}]`)}` : ''} ${message}`);
}

/**
 * Logs the success message with appropriate label/colors.
 */
export function success({ label, message }: { label?: string; message: string }) {
	container.logger.info(`${label ? `${greenBright(`[${label}]`)}` : ''} ${message}`);
}

/**
 * Logs the warning message with appropriate label/colors.
 */
export function warning({ label, message }: { label?: string; message: string }) {
	container.logger.warn(`${label ? `${yellowBright(`[${label}]`)}` : ''} ${message}`);
}
