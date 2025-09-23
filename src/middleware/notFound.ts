import { Request, Response, NextFunction } from 'express';
import httpStutus from 'http-status'

const notFound = (req: Request, res: Response, next: NextFunction) => {

    return res.status(httpStutus.NOT_FOUND).json({
        success: false,
        message: "API Not Found",
        error: "",
    })
}

export default notFound;