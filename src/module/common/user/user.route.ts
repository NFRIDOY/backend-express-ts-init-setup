import express from 'express';
// import router from "../../../router/router";
import { userController } from "./user.controller";
const router = express.Router();

router.get('/', userController.allUsers)

export const userRoute = router