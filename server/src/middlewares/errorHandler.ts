import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { logger } from '../utils/logger';
import { HttpStatus } from '../constants/httpStatus';
import { messages } from '../constants/messages';

export const errorHandler = (err: ApiError, req: Request, res: Response, _next: NextFunction) => {
    const statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = err.message || messages.INTERNAL_SERVER;

    logger.error(`${req.method} ${req.originalUrl} - ${statusCode}: ${message}`);

    res.status(statusCode).json({
        message,
    });
};
