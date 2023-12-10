const jwt = require("jsonwebtoken");
import { secret } from "../../config/JWTSecret";
import { JWTPayload } from "../../types/JWTPayload";

export const VerifyJWTToken = (token: string): JWTPayload | null => {
    let jwtPayload: { [key: string]: any };
    jwtPayload = jwt.verify(token, secret) as { [key: string]: any };
    return jwtPayload as JWTPayload;
}