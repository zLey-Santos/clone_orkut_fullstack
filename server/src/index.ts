import "reflect-metadata";
import "dotenv/config";

import express from "express";
import { createExpressServer } from "routing-controllers";
import { PostController } from "./post/post.controller";
import { UserController } from "./user/user.controller";
import { AuthController } from "./auth/auth.controller";
import { FileController } from "./file/file.controller";
import { authorizationChecker } from "./auth/checkers/authorizationChecker";
import { currentUserChecker } from "./auth/checkers/currentUserChecker";

const port = process.env.PORT;
const host = process.env.HOST;
const app = createExpressServer({
  cors: true,
  controllers: [PostController, UserController, AuthController, FileController],
  authorizationChecker,
  currentUserChecker
});

app.use("/public", express.static("public"));

app.listen(port, host, () => {
  console.log(`Servidor express iniciado em http://${host}:${port}`);
});
