import { createUserSchema } from "./schemas/create-user.schema";
import { db } from "../db";
import { prisma } from "prisma";

export class UserRepository {
  async createUser(data: any) {
    await createUserSchema.parseAsync(data);
    const user = await prisma.users.create({ data });
    return user;
  }

  async readUser(id: number) {
    const user = await prisma.users.findFirst({
      where: { id }
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
    const friends = db
      .prepare(
        /* sql */
        `select * from users where id in (
        select user_b
        from friends
        where user_a = ?
        union
        select user_a
        from friends
        where user_b = ?)order by created_at desclimit 9;`
      )
      .all(userId, userId);
    return friends;
  }

  async getRandomUser() {
    const randomUser = db.prepare(/* sql */ `select * from users order by random() limit 1`).get();
    return randomUser;
  }
}
export function createUser(userData: { first_name: string; last_name: string; avatar: string; password: string }) {
  throw new Error("Function not implemented.");
}
