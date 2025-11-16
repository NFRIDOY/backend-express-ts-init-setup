import { NextFunction, Request, Response } from "express";

export const reqBodyDataParser = (req: Request, _res: Response, next: NextFunction) => {
    req.body = JSON.parse(req?.body?.data);
    next()
}