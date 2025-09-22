import express from 'express';
// import router from "../../../router/router";
import { userController } from "./user.controller";
import logger from '../../../middleware/logger';
const router = express.Router();

// router.get('/', userController.allUsers) 
router.post('/create-student', userController.createStudent);


export const userRoute = router