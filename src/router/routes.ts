import { app } from "../app"
import { userRoute } from "../module/common/user/user.route"

const routes = () => {
    app.use("/api/user", userRoute),
    app.use("/api/users", userRoute)
}

export default routes;