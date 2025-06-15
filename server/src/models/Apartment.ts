import mongoose, { model } from 'mongoose';
import { IApartment } from '../types/apartment.types';

const ApartmentSchema = new mongoose.Schema<IApartment>(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            maxlength: [90, 'Title cannot exceed 90 characters'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            maxlength: [335, 'Description cannot exceed 335 characters'],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price cannot be negative'],
        },
        rooms: {
            type: Number,
            required: [true, 'Number of rooms is required'],
            enum: [1, 2, 3],
        },
        images: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const Apartment = model<IApartment>('Apartment', ApartmentSchema);

export default Apartment;
