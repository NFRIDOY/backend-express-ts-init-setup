import { NextFunction, Request, Response } from "express"

const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log("Logger Starts____________");
    console.log(req.url, req.hostname, req.method)
    // console.log("Request", req);
    if (req.body) {
        console.log("Request Body", req.body);
    }
    if (req.query) {
        // console.log("Request Query", req.query);
    }
    if (req.params) {
        // console.log("Request Params", req.params);
    }
    console.log("Logger Ends____________");
    
    next();
}

export default logger