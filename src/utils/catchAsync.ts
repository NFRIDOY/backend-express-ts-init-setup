import { RequestHandler } from "express"

export const catchAsync = (fn: RequestHandler): RequestHandler => {
    return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(err => next(err))
}

/**
 * catchAsync 
 * it is a Higher Order Function [HOF]
 * Recives a RequestHandler function from a controller
 * Return a RequestHandler function in the controller
 * This is for Resusable and clean code
 */