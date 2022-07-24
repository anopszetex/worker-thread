import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const __ndirname = filename => dirname(fileURLToPath(filename));

export const SUCESS_EXIT_CODE = 0;
