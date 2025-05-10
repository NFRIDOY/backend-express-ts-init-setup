import { app } from "../app"
import { userRoute } from "../module/common/user/user.route"

const routes = () => {
    app.use("/user", userRoute)
}

export default routes;