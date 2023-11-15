import "express-async-errors";
import "reflect-metadata";

import "dotenv/config";
import { createExpressServer } from "routing-controllers";
import { ZodError } from "zod";
import { PostController } from "./post/post.controller";
import { UserController } from "./user/user.controller";

const port = 9000;
const host = "localhost";
const app = createExpressServer({
  cors: true,
  controllers: [PostController, UserController]
});

function handleErrorMiddleware(err, req, res, next) {
  if (err instanceof ZodError) {
    console.error(err);
    return res.status(422).json(err);
  }

  throw err;
}

app.use(handleErrorMiddleware);

app.listen(port, host, () => {
  console.log(`Servidor express iniciado em http://${host}:${port}`);
});
