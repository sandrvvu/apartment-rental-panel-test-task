import { Request, Response } from 'express';
import { apartmentService } from '../services/apartment.service';
import { logger } from '../utils/logger';
import { HttpStatus } from '../constants/httpStatus';
import { messages } from '../constants/messages';

export const getAllApartments = async (req: Request, res: Response): Promise<void> => {
    try {
        const { rooms, priceFrom, priceTo } = req.query;

        const apartments = await apartmentService.getAll({
            rooms: rooms ? Number(rooms) : undefined,
            priceFrom: priceFrom ? Number(priceFrom) : undefined,
            priceTo: priceTo ? Number(priceTo) : undefined,
        });

        logger.info('Fetched all apartments successfully', {
            query: req.query,
            resultCount: apartments.length,
        });
        res.status(HttpStatus.OK).json(apartments);
    } catch (error) {
        logger.error('Error fetching apartments', {
            error,
            query: req.query,
        });
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: messages.INTERNAL_SERVER,
        });
    }
};

export const getApartmentById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const apartment = await apartmentService.getById(id);
        if (!apartment) {
            logger.warn('Apartment not found', { id });
            res.status(HttpStatus.NOT_FOUND).json({ message: messages.APARTMENT_NOT_FOUND });
            return;
        }

        logger.info('Fetched apartment by ID successfully', { id });
        res.status(HttpStatus.OK).json(apartment);
    } catch (error) {
        logger.error(`Error fetching apartment by ID: ${req.params.id}`, error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: messages.INTERNAL_SERVER,
        });
    }
};

export const createApartment = async (req: Request, res: Response): Promise<void> => {
    try {
        const apartment = await apartmentService.create({
            ...req.body,
            images: [],
        });

        logger.info('Apartment created successfully', { body: req.body, id: apartment._id });
        res.status(HttpStatus.CREATED).json(apartment);
    } catch (error) {
        logger.error('Error creating apartment', {
            error,
            body: req.body,
        });
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: messages.APARTMENT_CREATE_FAILED,
        });
    }
};

export const addApartmentImages = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const imageUrls = (req.files as Express.Multer.File[]).map((file) => file.path);

        const updated = await apartmentService.addImages(id, imageUrls);

        if (!updated) {
            logger.warn('Apartment not found for adding images', { id });
            res.status(HttpStatus.NOT_FOUND).json({ message: messages.APARTMENT_NOT_FOUND });
            return;
        }

        logger.info('Images added successfully', { id, added: imageUrls.length });
        res.status(HttpStatus.OK).json(updated);
    } catch (error) {
        logger.error('Error adding apartment images', { error, id: req.params.id });
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: messages.INTERNAL_SERVER,
        });
    }
};

export const deleteApartmentImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { imageUrl } = req.body;

        const updated = await apartmentService.deleteImage(id, imageUrl);

        if (!updated) {
            logger.warn('Apartment not found for deleting image', { id });
            res.status(HttpStatus.NOT_FOUND).json({ message: messages.APARTMENT_NOT_FOUND });
            return;
        }

        logger.info('Image deleted successfully', { id, imageUrl });
        res.status(HttpStatus.OK).json(updated);
    } catch (error) {
        logger.error('Error deleting apartment image', { error, id: req.params.id });
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: messages.INTERNAL_SERVER,
        });
    }
};

export const updateApartment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updated = await apartmentService.update(id, req.body);
        if (!updated) {
            logger.warn('Apartment not found for update', { id });
            res.status(HttpStatus.NOT_FOUND).json({ message: messages.APARTMENT_NOT_FOUND });
            return;
        }

        logger.info('Apartment updated successfully', { id, updated });
        res.status(HttpStatus.OK).json(updated);
    } catch (error) {
        logger.error(`Error updating apartment`, {
            error,
            id: req.params.id,
            body: req.body,
        });
        res.status(HttpStatus.BAD_REQUEST).json({
            message: messages.APARTMENT_UPDATE_FAILED,
        });
    }
};

export const deleteApartment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deleted = await apartmentService.remove(id);
        if (!deleted) {
            logger.warn('Apartment not found for deletion', { id });
            res.status(HttpStatus.NOT_FOUND).json({ message: messages.APARTMENT_NOT_FOUND });
            return;
        }

        logger.info('Apartment deleted successfully', { id });
        res.status(HttpStatus.OK).json({ message: messages.APARTMENT_DELETED_SUCCESSFULLY });
    } catch (error) {
        logger.error(`Error deleting apartment`, {
            error,
            id: req.params.id,
        });
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: messages.APARTMENT_DELETE_FAILED,
        });
    }
};
