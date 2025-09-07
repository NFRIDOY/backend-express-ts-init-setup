import { app } from "../app"
import { userRoute } from "../module/common/user/user.route"
import { studentRoute } from "../module/student/route/student.route";

const routes = () => {
    app.use("/api/user", userRoute),
    app.use("/api/student", studentRoute)
}

export default routes;