import type { Action } from "routing-controllers";
import { JwtService, invalidHeaderError } from "auth/jwt.service";

const jwtService = new JwtService();

export async function authorizationChecker(action: Action): Promise<boolean> {
  try {
    const payload = jwtService.extractTokenFromHeader(action.request);

    return true;
  } catch (error) {
    if (error instanceof invalidHeaderError) {
      return false;
    }
    throw error;
  }
}
