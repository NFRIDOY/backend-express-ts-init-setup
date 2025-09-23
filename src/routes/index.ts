import { Router } from "express";
import { userRoute } from "../module/common/user/user.route";
import { studentRoute } from "../module/student/student.route";
import logger from "../middleware/logger";

const router = Router();

router.use("/user", userRoute)
router.use("/student", logger, studentRoute)


export default router;