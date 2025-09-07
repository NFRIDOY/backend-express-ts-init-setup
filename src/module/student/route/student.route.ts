import { studentController } from "../controller/student.controller";
import router from "../../../router/router";

router.post('/create-student', studentController.createStudent);

export const studentRoute = router;
