import { NextFunction, Request, RequestHandler, Response } from "express";
import { ZodObject } from "zod";
import { catchAsync } from "../utils/catchAsync";

export const validateRequest = (schema: ZodObject): RequestHandler => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body
            })
            next();
        } catch (err) {
            console.error("❌ Validation Failed: Please check the 'Request Format' and it must be in 'JSON' from the client");
            next(err)
        }
    })
}