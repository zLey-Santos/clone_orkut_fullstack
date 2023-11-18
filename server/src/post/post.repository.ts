import { prisma } from "../prisma";
import type { CreatePostDto } from "./dtos/create-post.dto";
import type { UpdatePostDto } from "./dtos/update-post.dto";
import type { CreatePostCommentsDto } from "./dtos/create-post-comment.dto";

export class PostRepository {
  async listPosts({ limit, offset, orderBy, search }: any) {
    const posts = await prisma.posts.findMany({
      select: {
        id: true,
        content: true,
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

  async createPost(data: CreatePostDto) {
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

  async updatePost(postId: number, data: UpdatePostDto) {
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

  async createPostComment(postId: number, data: CreatePostCommentsDto) {
    // Certifique-se de que post_id está definido antes de criar o comentário
    if (!postId) {
      throw new Error("post_id não pode ser undefined ou null.");
    }

    // Certifique-se de que user_id está definido antes de criar o comentário
    if (!data.user_id) {
      throw new Error("user_id não pode ser undefined ou null.");
    }

    const comment = await prisma.comments.create({
      data: {
        message: data.message,
        user_id: data.user_id,
        post_id: postId
      }
    });
    return comment;
  }
}
