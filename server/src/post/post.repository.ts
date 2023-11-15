import { db } from "../db";
import { createPostSchema } from "./schemas/create-post.schema";

export class PostRepository {
  async listPosts({ limit, offset, orderBy, search }: any) {
    const whereSearch = search ? `WHERE content LIKE "%${search}%"` : "";
    const orderBySQL = orderBy === "asc" ? "asc" : "desc";

    const posts = db
      .prepare(
        /* sql */ `
      SELECT
        posts.id,
        posts.content,
        posts.created_at,
        posts.user_id,
        users.first_name AS user_first_name,
        users.last_name AS user_last_name,
        users.avatar AS user_avatar
      FROM posts
      JOIN users ON posts.user_id = users.id
      ${whereSearch}
      ORDER BY posts.created_at ${orderBySQL}
      LIMIT ? OFFSET ?`
      )
      .all(limit, offset);

    const { posts_count: count } = db
      .prepare(
        /* sql */ `
      SELECT COUNT(id) AS posts_count FROM posts`
      )
      .get();

    return {
      posts,
      count
    };
  }

  async createPost(data: any) {
    await createPostSchema.parseAsync(data);

    // Consulta SQL para selecionar um usuário aleatório
    const randomUserIdQuery = `
   SELECT id FROM users
   ORDER BY RANDOM()
   LIMIT 1;
  `;

    // Execute a consulta para obter um `user_id` aleatório
    const { id: user_id } = db.prepare(randomUserIdQuery).get();

    // Insira o post no banco de dados com o `user_id` aleatório
    const nextPost = db
      .prepare(
        /* sql */ `
   INSERT INTO posts (content, user_id, created_at)
   VALUES (?, ?, datetime("now"))
   RETURNING *;
  `
      )
      .get(data.content, user_id);

    return nextPost;
  }

  async readPost(id: number) {
    const post = db.prepare(/* sql */ `select * from posts where id=?`).get(id);
    return post;
  }

  async updatePost(id: number, data: any) {
    const post = db
      .prepare(
        /* sql */ `
        update posts set content=? where id=? returning *;`
      )
      .get(data.content, id);
    return post;
  }

  async deletePost(id: number) {
    const post = db.prepare(/* sql */ `delete from posts where id=? returning *;`).get(id);
    return post;
  }

  async listPostComments(postId: number) {
    const comments = db
      .prepare(
        /* sql */
        `select
          comments.id,
          comments.message,
          comments.created_at,
          comments.user_id,
          users.first_name as user_first_name,
          users.last_name as user_last_name,
          users.avatar as user_avatar
         from comments join users on comments.user_id = users.id
         where post_id=?
         order by comments.created_at desc`
      )
      .all(postId);

    return comments;
  }

  async createPostComment(data: any, post_id: number) {
    // Consulta SQL para selecionar um usuário aleatório
    const randomUserIdQuery = `
      select id from users
      order by random()
      limit 1;`;

    // Execute a consulta para obter um `user_id` aleatório
    const { id: user_id } = db.prepare(randomUserIdQuery).get();
    // Insira o comentário no banco de dados com o `user_id` aleatório
    const comment = db
      .prepare(
        `insert into comments (message, post_id, user_id, created_at)
      values (?, ?, ?, datetime("now"))
      returning *;`
      )
      .get(data.message, post_id, user_id);

    return comment;
  }
}
