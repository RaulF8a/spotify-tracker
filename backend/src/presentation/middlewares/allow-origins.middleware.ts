import { NextFunction, Request, Response } from "express";

export class AllowOriginsMiddleware {
    constructor() { }

    static addHeaders = (req: Request, res: Response, next: NextFunction) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        
        next();
    };

}
