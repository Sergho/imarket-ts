import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/response/custom-error/CustomError";
import { VerifyJWTToken } from "../utils/JWT/VerifyJWTToken";

export const checkJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const customError = new CustomError(401, 'Unauthorized', 'Authorization header not provided');
    return next(customError);
  }

  const token = authHeader.split(' ')[1];
  try {
    req.jwtPayload = VerifyJWTToken(token);
    return next();
  } catch (err) {
    const customError = new CustomError(401, 'General', 'JWT error');
    return next(customError);
  }
};