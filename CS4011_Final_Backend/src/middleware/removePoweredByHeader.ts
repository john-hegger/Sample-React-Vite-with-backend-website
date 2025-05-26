import { Request, Response, NextFunction } from "express";

export const removePoweredByHeader = (req: Request, res: Response, next: NextFunction,) => {

    res.removeHeader('X-Powered-By')
    next()
}