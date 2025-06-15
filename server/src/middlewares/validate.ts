import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { ApiError } from '../utils/ApiError';
import { HttpStatus } from '../constants/httpStatus';

export const validateBody =
    (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const message = result.error.issues.map((i) => i.message).join(', ');
            return next(new ApiError(HttpStatus.BAD_REQUEST, `Validation error: ${message}`));
        }
        next();
    };
