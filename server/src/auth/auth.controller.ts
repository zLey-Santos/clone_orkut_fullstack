import { JsonController, Post, Body } from "routing-controllers";
import { SignInDto } from "./dto/sign-in.dto";
import { AuthService } from "./auth.service";

@JsonController("/auth")
export class AuthController {
  constructor() {
    this.authService = new AuthService();
  }
  authService: AuthService;

  @Post("/sign-in")
  async signIn(@Body() signInDto: SignInDto) {
    const response = await this.authService.signIn(signInDto);
    return response;
  }

  @Post("/sign-up")
  async signUp(@Body() signUpDto: SignInDto) {
    return SignInDto;
  }
}
