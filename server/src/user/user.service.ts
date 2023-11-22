import { UserRepository } from "./user.repository";
import fs from "fs/promises";
import sharp from "sharp";

export class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  userRepository: UserRepository;

  async uploadAvatar(userId: number, avatar: Express.Multer.File) {
    const avatarBuffer = await sharp(avatar.buffer)
      .resize({
        width: 256,
        height: 256,
        fit: "cover",
        position: "center"
      })
      .toBuffer();
    await fs.writeFile(`public/${userId}.jpg`, avatarBuffer);
    const avatarPath = `http://localhost:${process.env.PORT}/public/${userId}.jpg`;
    const user = await this.userRepository.updateAvatar(userId, avatarPath);
    return user;
  }
}