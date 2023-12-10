import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/response/custom-error/CustomError";

export function ErrorHandler(err: CustomError, req: Request, res: Response, next: NextFunction) {
    if(!err.HttpStatusCode) return res.status(400).json("Bad request")
    return res.status(err.HttpStatusCode).json(err.JSON);
}