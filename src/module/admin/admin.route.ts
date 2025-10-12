import express from 'express';
import { adminController } from './admin.controller';
import { userController } from '../common/user/user.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { AdminValidationSchema } from './admin.validation';
// import router from "../../../router/router";

const router = express.Router();

// router.post('/create-admin', validateRequest(AdminValidationSchema.createAdmin), userController.createAdmin); // TODO
router.get('/', adminController.getAllAdmins);
router.get('/:id', adminController.getSingleAdmin);
router.patch('/:id', validateRequest(AdminValidationSchema.updateAdmin), adminController.updateAdmin);
// router.delete('/:id', adminController.deleteAdmin);
// router.delete('/:id', userController.deleteAdmin); // TODO

export const adminRoute = router;
