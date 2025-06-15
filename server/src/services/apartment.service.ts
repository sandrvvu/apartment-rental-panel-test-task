import Apartment from '../models/Apartment';
import { IApartment } from '../types/apartment.types';
import { Filter } from '../types/filter.types';
import { v2 as cloudinary } from 'cloudinary';

export const apartmentService = {
    getAll: async (filter: Filter): Promise<IApartment[]> => {
        const mongoFilter: any = {};

        if (filter.rooms) mongoFilter.rooms = filter.rooms;
        if (filter.priceFrom !== undefined || filter.priceTo !== undefined) {
            mongoFilter.price = {};
            if (filter.priceFrom !== undefined) mongoFilter.price.$gte = filter.priceFrom;
            if (filter.priceTo !== undefined) mongoFilter.price.$lte = filter.priceTo;
        }

        return Apartment.find(mongoFilter).sort({ createdAt: -1 });
    },

    getById: async (id: string): Promise<IApartment | null> => {
        return Apartment.findById(id);
    },

    create: async (data: IApartment): Promise<IApartment> => {
        const newApartment = new Apartment(data);
        return newApartment.save();
    },

    addImages: async (id: string, imageUrls: string[]): Promise<IApartment | null> => {
        return Apartment.findByIdAndUpdate(
            id,
            { $push: { images: { $each: imageUrls } } },
            { new: true }
        );
    },

    deleteImage: async (id: string, imageUrl: string): Promise<IApartment | null> => {
        const match = imageUrl.match(/\/upload\/(?:v\d+\/)?([^\.]+)\./);
        const publicId = match ? match[1] : null;

        if (publicId) {
            await cloudinary.uploader.destroy(publicId);
        }

        return Apartment.findByIdAndUpdate(id, { $pull: { images: imageUrl } }, { new: true });
    },

    update: async (id: string, data: Partial<IApartment>): Promise<IApartment | null> => {
        return Apartment.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    },

    remove: async (id: string): Promise<IApartment | null> => {
        return Apartment.findByIdAndDelete(id);
    },
};
