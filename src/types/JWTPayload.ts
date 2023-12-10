import { Role } from "./Role";

export type JWTPayload = {
    id: number;
    role: Role;
  };