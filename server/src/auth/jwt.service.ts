import jwt, { JwtPayload } from "jsonwebtoken";
import type { Request } from "express";
import { Action } from "routing-controllers";

export class JwtService {
  static extractTokenFromHeader(action: Action, request: any) {
    throw new Error("Method not implemented.");
  }
  private jwtSecret: string;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || "";
    if (!this.jwtSecret) {
      throw new EmptyJwtError("Falha");
    }
  }

  encode(payload: object) {
    const token = jwt.sign(payload, this.jwtSecret);
    return token;
  }

  decode(token: string) {
    const payload = jwt.verify(token, this.jwtSecret);
    return payload as JwtPayload;
  }

  extractTokenFromHeader(request: Request) {
    const authorizationHeader = request.headers.authorization;
    if (authorizationHeader === undefined) {
      throw new invalidHeaderError();
    }
    const [bearer, token] = authorizationHeader.split("");
    if (bearer !== "Bearer" || token.length < 1) {
      throw new invalidHeaderError();
    }
    const payload = this.decode(token);
    return payload;
  }
}

export class EmptyJwtError extends Error {}
export class invalidHeaderError extends Error {}
