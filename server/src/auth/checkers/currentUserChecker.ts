import { JwtService } from "auth/jwt.service";
import { Action } from "routing-controllers";
import { UserRepository } from "user/user.repository";

const jwtService = new JwtService();
const userRepository = new UserRepository();

export async function currentUserChecker(action: Action) {
  try {
    const payload = jwtService.extractTokenFromHeader(action.request);

    if (!payload || !payload.email) {
      // O token não contém informações de e-mail válidas
      return null;
    }

    const user = await userRepository.findByEmail(payload.email);
    return user || null; // Retorna o usuário encontrado ou null se não encontrado
  } catch (error) {
    // Trate qualquer erro de forma apropriada
    console.error("Erro ao verificar usuário atual:", error);
    return null;
  }
}
