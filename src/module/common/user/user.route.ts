import router from "../../../router/router";
import { userController } from "./user.controller";

router.get('/', userController.allUsers)

export const userRoute = router