import { argv } from 'yargs';

export const ENV = argv.e ? argv.e : 'development';
export const PROFILE = argv.profile ? argv.profile : 'development';
