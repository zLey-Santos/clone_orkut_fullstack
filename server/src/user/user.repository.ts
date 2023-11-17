import { createUserSchema } from "./schemas/create-user.schema";
import { prisma } from "../prisma";

export class UserRepository {
  async createUser(data: any) {
    await createUserSchema.parseAsync(data);
    const user = await prisma.users.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        avatar: data.avatar,
        passwd: data.password
      }
    });
    return user;
  }

  async readUser(userId: number) {
    const user = await prisma.users.findUnique({
      where: { id: userId }
    });
    return user;
  }

  async listUsers() {
    const user = await prisma.users.findMany();
    return user;
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
    const friends = await prisma.$queryRaw`
    select * from users where id in ( 
      select user_b
      from friends
      where user_a = ?
      union
      select user_a
      from friends
      where user_b = ?) order by created_at desc limit 9;`;
    return friends;
  }
}

export function listUsers() {
  throw new Error("Function not implemented.");
}

export function addFriend(userA: any, userB: any) {
  throw new Error("Function not implemented.");
}
/*  async getRandomUser() {
    const randomUser = prisma.$queryRaw`select * from users order by random() limit 1`;
    return randomUser;
  }
}
export function createUser(userData: { first_name: string; last_name: string; avatar: string; password: string }) {
  throw new Error("Function not implemented.");
} */
