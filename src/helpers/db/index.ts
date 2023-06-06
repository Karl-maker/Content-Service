import mongoose from 'mongoose';
import config from '../../config';
import logger from '../logger';

export default (async () => {
  try {
    await mongoose.connect(config.service.content.db.url);
    logger.info('Connected to MongoDB');
  } catch (error) {
    throw error
  }
})();
