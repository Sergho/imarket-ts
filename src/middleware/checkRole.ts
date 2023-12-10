import { Request, Response, NextFunction } from "express";

import { Role } from "../types/Role";
import { CustomError } from "../utils/response/custom-error/CustomError";

export const checkRole = (targetRole: Role, isSelfAllowed = false) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const { role } = req.jwtPayload;
    
      if(role !== targetRole){
        const customError = new CustomError(403, 'Forbidden', 'Insufficient user rights');
        return next(customError);
      }
      
      return next();
    };
  };