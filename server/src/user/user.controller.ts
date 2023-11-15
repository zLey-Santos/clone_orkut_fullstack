import { UserRepository } from "./user.repository";
import { JsonController, Get, Param } from "routing-controllers";

@JsonController("/:userId")
export class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  userRepository: UserRepository;

  @Get("/:userId")
  async getById(@Param("userId") userId: number) {
    const user = await this.userRepository.readUser(userId);
    return user;
  }

  @Get("/:userId/friends")
  async listLatestFriends(@Param("userId") userId: number) {
    const friends = await this.userRepository.listLatestFriends(userId);
    return friends;
  }
}
