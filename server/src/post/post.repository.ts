import { prisma } from "../prisma";
import { createPostSchema } from "./schemas/create-post.schema";

export class PostRepository {
  async listPosts({ limit, offset, orderBy, search }: any) {
    const whereSearch = search ? `WHERE content LIKE "%${search}%"` : "";
    const orderBySQL = orderBy === "asc" ? "asc" : "desc";

    const posts = await prisma.posts.findMany({
      select: {
        id: true,
        content: true,
        created_at: true,
        user_id: true,

        users: {
          select: { first_name: true, last_name: true, avatar: true }
        }
      },

      where: search ? { content: { contains: search } } : undefined,
      orderBy: { created_at: orderBy },
      take: limit,
      skip: offset
    });

    const count = await prisma.posts.count();

    return {
      posts,
      count
    };
  }

  async createPost(data: any) {
    await createPostSchema.parseAsync(data);
    const nextPost = await prisma.posts.create({
      data: {
        user_id: data.user_id,
        content: data.content
      }
    });
    return nextPost;
  }

  async readPost(postId: number) {
    const post = await prisma.posts.findUnique({
      where: {
        id: postId
      }
    });
    return post;
  }

  async updatePost(postId: number, data: any) {
    const post = await prisma.posts.update({
      where: { id: postId },
      data: { content: data.content }
    });
    return post;
  }

  async deletePost(postId: number) {
    const post = await prisma.posts.delete({ where: { id: postId } });
    return post;
  }

  async listPostComments(postId: number) {
    const comment = await prisma.comments.findMany({
      select: {
        id: true,
        message: true,
        created_at: true,
        user_id: true,
        users: {
          select: {
            first_name: true,
            last_name: true,
            avatar: true
          }
        }
      },
      where: { post_id: postId },
      orderBy: { created_at: "desc" }
    });
    return comment;
  }

  async createPostComment(postId: number, data: any) {
    await createPostSchema.parseAsync(data);
    const comment = await prisma.comments.create({
      data: {
        message: data.message,
        user_id: data.user_id,
        post_id: data.post_id
      }
    });
    return comment;
  }
}

/* // Execute a consulta para obter um `user_id` aleatório
    //@ts-ignore
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
  } */
