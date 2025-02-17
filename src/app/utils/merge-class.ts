import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function mergeClass(...args: string[]) {
	return twMerge(clsx(args));
}
