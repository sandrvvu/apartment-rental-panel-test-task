import { Router } from 'express';
import * as apartmentController from '../controllers/apartment.controller';
import { apartmentSchema } from '../schemas/apartment.schema';
import { validateBody } from '../middlewares/validate';
import { upload } from '../middlewares/upload';

const router = Router();

router.get('/', apartmentController.getAllApartments);
router.get('/:id', apartmentController.getApartmentById);
router.post('/', validateBody(apartmentSchema), apartmentController.createApartment);
router.post('/:id/images', upload.array('images', 5), apartmentController.addApartmentImages);
router.delete('/:id/images', apartmentController.deleteApartmentImage);
router.put('/:id', validateBody(apartmentSchema), apartmentController.updateApartment);
router.delete('/:id', apartmentController.deleteApartment);

export default router;
