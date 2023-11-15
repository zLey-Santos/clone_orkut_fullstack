import { createUserSchema } from "./schemas/create-user.schema";
import { db } from "../db";

export class UserRepository {
  async createUser(data: any) {
    await createUserSchema.parseAsync(data);
    const user = db
      .prepare(
        /* sql */
        `insert into users(
           first_name,
           last_name,
           avatar,
           passwd
         ) values(?, ?, ?, ?) returning *`
      )
      .get(data.first_name, data.last_name, data.avatar, data.password);
    return user;
  }

  async readUser(id: number) {
    const user = db.prepare(/* sql */ `select * from users where id=?`).get(id);
    return user;
  }

  async listUsers() {
    const users = db.prepare(/* sql */ `select * from users`).all();
    return users;
  }

  async addFriend(userA: number, userB: number) {
    const friend = db
      .prepare(/* sql */ `insert into friends (user_a, user_b) values (?, ?) returning *`)
      .get(userA, userB);
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
          where user_b = ?
        )
        order by created_at desc
        limit 9;`
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
