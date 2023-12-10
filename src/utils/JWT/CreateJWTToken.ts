const jwt = require("jsonwebtoken");
import { secret } from "../../config/JWTSecret";
import { JWTPayload } from "../../types/JWTPayload";

export const CreateJWTToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, secret, {
    expiresIn: "24h",
  });
};
