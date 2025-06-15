import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { logger } from '../utils/logger';

dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || '');
        logger.info('MongoDB connected');
    } catch (error) {
        logger.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
