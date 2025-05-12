import { JwtPayload } from "jwt-decode";

export interface DecodedToken extends JwtPayload {
  id: number;
  username: string;
  email: string;
}