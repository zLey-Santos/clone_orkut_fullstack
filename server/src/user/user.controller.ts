import { JsonController, Get, Post, Param, Body, Authorized, CurrentUser, UploadedFile } from "routing-controllers";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./user.types";

@JsonController("/users")
export class UserController {
  constructor() {
    this.userRepository = new UserRepository();
    this.userService = new UserService();
  }

  userRepository: UserRepository;
  userService: UserService;

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

  @Authorized()
  @Post("/avatar")
  async uploadAvatar(@UploadedFile("avatar") avatar: Express.Multer.File, @CurrentUser() user: User) {
    const response = await this.userService.uploadAvatar(user.id, avatar);
    return response;
  }
}
