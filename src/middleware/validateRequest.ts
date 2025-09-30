import { RequestHandler } from "express";
import { ZodObject } from "zod";

export const validateRequest = (schema: ZodObject): RequestHandler => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync({
                body: req.body
            })
            next();
        } catch (err) {
            console.error("❌ Validation Failed: Please check the 'Request Format' from the client");
            next(err)
        }
    }
}