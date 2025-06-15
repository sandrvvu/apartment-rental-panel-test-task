import { Document } from 'mongoose';

export type IApartment = Document & {
    _id: string;
    title: string;
    description: string;
    price: number;
    rooms: 1 | 2 | 3;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
};
