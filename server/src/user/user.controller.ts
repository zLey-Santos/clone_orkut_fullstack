import { UserRepository } from "./user.repository";
import { JsonController, Get, Post, Param, Body } from "routing-controllers";
import { CreateUserDto } from "./dtos/create-user.dto";

@JsonController("/:userId")
export class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  userRepository: UserRepository;

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.userRepository.createUser(body);
    return user;
  }

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
