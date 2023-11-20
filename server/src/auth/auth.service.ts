import { SignInDto } from "./dto/sign-in.dto";
import { UnauthorizedError } from "routing-controllers";
import { UserRepository } from "user/user.repository";
import { JwtService } from "./jwt.service";
export class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
    this.jwtService = new JwtService();
  }

  userRepository: UserRepository;
  jwtService: JwtService;

  async signIn({ email, password }: SignInDto) {
    const maybeUser = await this.userRepository.findByEmail(email);
    if (maybeUser === null) {
      throw new UnauthorizedError("Usuario não encontrado");
    }
    if (password !== maybeUser?.passwd) {
      throw new UnauthorizedError("Email ou Senha inválidos");
    }

    const payload = {
      id: maybeUser.id,
      name: `${maybeUser.first_name} ${maybeUser.last_name}`,
      email: maybeUser.email
    };

    const token = this.jwtService.encode(payload);

    return { user: maybeUser, token };
  }
}
