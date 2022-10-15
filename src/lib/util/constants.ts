import { URL } from 'node:url';

export const rootFolder = new URL('../../../', import.meta.url);
export const srcFolder = new URL('src/', rootFolder);
