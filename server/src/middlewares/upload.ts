import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { cloudinary } from '../config/cloudinary';
import { ApiError } from '../utils/ApiError';
import { HttpStatus } from '../constants/httpStatus';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'apartments',
            allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        };
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new ApiError(HttpStatus.BAD_REQUEST, 'Only image files are allowed!'));
        }
    },
});

export { upload };
