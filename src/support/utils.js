import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

export const __ndirname = filename => dirname(fileURLToPath(filename));

export const SUCESS_EXIT_CODE = 0;
