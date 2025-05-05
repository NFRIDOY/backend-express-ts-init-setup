import { NextFunction, Request, Response } from "express"
import router from "../../../router/router";

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    console.log("req");

    res.json({
        message: "User Route"
    })
})

export const userRoute = router