import { NextFunction, Request, Response } from "express"

const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log("Logger Starts____________");
    console.log(req.url, req.hostname, req.method)
    // console.log("Request", req);
    console.log("Request Object", req.body);
    console.log("____________Logger Ends ");
    
    next();
}

export default logger