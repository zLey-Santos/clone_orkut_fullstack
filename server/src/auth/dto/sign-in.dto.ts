import { IsEmail, IsString } from "class-validator";

export class SignInDto {
  @IsEmail(undefined, {
    message: "O e-mail informado é invalido"
  })
  email: string;

  @IsString({ message: "Senha invalida" })
  password: string;
}
