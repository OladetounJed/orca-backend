import mongoose from 'mongoose';
import { config } from '../config';
import { logger } from '../utils/logger';

const connect = async () => {
  const { database, server } = config;

  try {
    await mongoose.connect(database.uri);
    logger.info(`Application started on URL ${server.host}:${server.port} 🎉`);
  } catch (error) {
    logger.error(error);
    throw error; // Rethrow the error to be caught in connectDBWithRetry
  }
};

const maxRetries = 5; // Maximum number of retries
let retries = 0; // Current retry count

export const connectDBWithRetry = async () => {
  try {
    await connect();
  } catch (error) {
    retries += 1;
    if (retries > maxRetries) {
      logger.error('Max retries reached. Exiting...');
      process.exit(1); // Exit the process with an error code
    }
    logger.info(`MongoDB connection unsuccessful, retry after 10 seconds. Attempt ${retries}`);
    setTimeout(connectDBWithRetry, 10000);
  }
};
