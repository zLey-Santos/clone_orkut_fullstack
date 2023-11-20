import { prisma } from "../prisma";
import type { CreateUserDto } from "./dtos/create-user.dto";

export class UserRepository {
  async createUser(data: CreateUserDto) {
    const user = await prisma.users.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        avatar: data.avatar,
        passwd: data.password
      }
    });
    return user;
  }

  async readUser(userId: number) {
    try {
      const user = await prisma.users.findUnique({
        where: { id: userId }
      });
      return user;
    } catch (error) {
      console.error("Error in readUser:", error);
      throw error;
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await prisma.users.findUnique({
        where: { email }
      });
      return user;
    } catch (error) {
      console.error("E-mail invalid", error);
    }
  }

  async listUsers() {
    const users = await prisma.users.findMany();
    return users;
  }

  async addFriend(user_a: number, user_b: number) {
    const friend = await prisma.friends.create({
      data: {
        user_a,
        user_b
      }
    });
    return friend;
  }

  async listLatestFriends(userId: number) {
    try {
      const friends = await prisma.$queryRaw`
        select * from users where id in ( 
          select user_b
          from friends
          where user_a = ${userId}
          union
          select user_a
          from friends
          where user_b = ${userId}) order by created_at desc limit 9;`;
      return friends;
    } catch (error) {
      console.error("Error in listLatestFriends:", error);
      throw error;
    }
  }
}

export async function listUsers() {
  const userRepository = new UserRepository();
  return userRepository.listUsers();
}

export async function addFriend(userA: number, userB: number) {
  const userRepository = new UserRepository();
  return userRepository.addFriend(userA, userB);
}
