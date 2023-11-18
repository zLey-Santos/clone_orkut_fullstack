import "reflect-metadata";
import "dotenv/config";
import { createExpressServer } from "routing-controllers";
import { PostController } from "./post/post.controller";
import { UserController } from "./user/user.controller";

const port = 9000;
const host = "localhost";
const app = createExpressServer({
  cors: true,
  controllers: [PostController, UserController]
});

app.listen(port, host, () => {
  console.log(`Servidor express iniciado em http://${host}:${port}`);
});
