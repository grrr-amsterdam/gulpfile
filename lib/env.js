import { argv } from 'yargs';

export const isStaging = argv.staging || argv.e === 'staging';
export const isProduction = argv.production || argv.e === 'production';
export const isDevelopment = !isStaging && !isProduction;

const getEnv = () => {
  switch (true) {
    case isStaging:
      return 'staging';
    case isProduction:
      return 'production';
    default:
      return 'development';
  }
};

export const env = getEnv();
