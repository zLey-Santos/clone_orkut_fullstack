import "reflect-metadata";
import "dotenv/config";
import { createExpressServer } from "routing-controllers";
import { PostController } from "./post/post.controller";
import { UserController } from "./user/user.controller";
import { AuthController } from "auth/auth.controller";
import { authorizationChecker } from "./auth/checkers/authorizationChecker";
import { CurrentUserChecker } from "routing-controllers/types/CurrentUserChecker";
import { currentUserChecker } from "auth/checkers/currentUserChecker";

const port = process.env.PORT;
const host = process.env.HOST;
const app = createExpressServer({
  cors: true,
  controllers: [PostController, UserController, AuthController],
  authorizationChecker,
  currentUserChecker
});

app.listen(port, host, () => {
  console.log(`Servidor express iniciado em http://${host}:${port}`);
});
