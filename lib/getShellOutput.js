import handleError from './handleError';
import { execSync } from 'child_process';

export default function (command) {
  const result = execSync(command).toString('utf-8');
  if (!result) {
    handleError('Error getting shell output');
  }
  // Do a replace because of newline in shell output
  return result.replace(/\s?$/, '');
}
