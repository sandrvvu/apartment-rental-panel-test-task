import { z } from 'zod';

export const apartmentSchema = z.object({
    title: z
        .string({
            required_error: 'Title is required.',
            invalid_type_error: 'Title must be a string.',
        })
        .min(1, { message: 'Title cannot be empty.' })
        .max(90, { message: 'Title cannot exceed 90 characters.' }),

    price: z
        .number({
            required_error: 'Price is required.',
            invalid_type_error: 'Price must be a number.',
        })
        .positive({ message: 'Price must be a positive number.' }),

    rooms: z
        .number({
            required_error: 'Number of rooms is required.',
            invalid_type_error: 'Rooms must be a number.',
        })
        .int({ message: 'Rooms must be an integer.' })
        .min(1, { message: 'Minimum 1 room required.' })
        .max(3, { message: 'Maximum 3 rooms allowed.' }),
    description: z
        .string({
            required_error: 'Description is required.',
            invalid_type_error: 'Description must be a string.',
        })
        .min(1, { message: 'Description cannot be empty.' })
        .max(335, { message: 'Description cannot exceed 335 characters.' }),
});
