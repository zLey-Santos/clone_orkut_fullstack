import * as userService from "./user.service";
import { JsonController, Get, Param } from "routing-controllers";

@JsonController("/users")
export class UserController {
  @Get("/:userId")
  async getByd(@Param("userId") userId: number) {
    const user = await userService.readUser(userId);
    return user;
  }

  @Get("/:userId/friends")
  async listLatestFriends(@Param("userId") userId: number) {
    const friends = await userService.listLatestFriends(userId);
    return friends;
  }
}
