// post.controller.ts

import type { User } from "../user/user.types";
import {
  JsonController,
  Get,
  Post,
  Delete,
  Put,
  QueryParam,
  Param,
  Body,
  HttpCode,
  Authorized,
  CurrentUser,
  HttpError
} from "routing-controllers";
import { PostRepository } from "./post.repository";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dtos/create-post.dto";
import { UpdatePostDto } from "./dtos/update-post.dto";
import { CreatePostCommentDto } from "./dtos/create-post-comment.dto";

@JsonController("/posts")
export class PostController {
  constructor(private postRepository: PostRepository, private postService: PostService) {}

  @Get()
  async getAll(
    @QueryParam("limit") limit: number = 30,
    @QueryParam("offset") offset: number = 0,
    @QueryParam("order_by") orderBy: string = "desc",
    @QueryParam("search") search: string
  ) {
    const posts = await this.postRepository.listPosts({
      limit,
      offset,
      orderBy: orderBy as "asc" | "desc",
      search
    });
    return posts;
  }

  @Get("/:id")
  async getById(@Param("id") postId: number) {
    const post = await this.postRepository.readPost(postId);
    if (!post) {
      throw new HttpError(404, "Post not found");
    }
    return post;
  }

  @Authorized()
  @HttpCode(201)
  @Post()
  async createPost(@Body() body: CreatePostDto, @CurrentUser() user: User) {
    try {
      body.user_id = user.id;
      const post = await this.postRepository.createPost(body);
      return post;
    } catch (error) {
      console.error("Error creating post:", error);
      throw new HttpError(500, "Error creating post");
    }
  }

  @Authorized()
  @Delete("/:id")
  async deleteById(@Param("id") postId: number, @CurrentUser() user: User) {
    const post = await this.postService.deletePost(postId, user.id);
    if (!post) {
      throw new HttpError(404, "Post not found");
    }
    return post;
  }

  @Authorized()
  @Put("/:id")
  async updateById(@Param("id") postId: number, @Body() body: UpdatePostDto, @CurrentUser() user: User) {
    try {
      body.user_id = user.id;
      const post = await this.postService.updatePost(postId, body);
      if (!post) {
        throw new HttpError(404, "Post not found");
      }
      return post;
    } catch (error) {
      console.error("Error updating post:", error);
      throw new HttpError(500, "Error updating post");
    }
  }

  @Get("/:id/comments")
  async listPostComments(@Param("id") postId: number) {
    const comments = await this.postRepository.listPostComments(postId);
    return comments;
  }

  @Authorized()
  @HttpCode(201)
  @Post("/:id/comments")
  async createPostComment(@Param("id") postId: number, @Body() body: CreatePostCommentDto, @CurrentUser() user: User) {
    try {
      body.user_id = user.id;
      const comment = await this.postRepository.createPostComment(postId, body);
      if (!comment) {
        throw new HttpError(404, "Post not found");
      }
      return comment;
    } catch (error) {
      console.error("Error creating post comment:", error);
      throw new HttpError(500, "Error creating post comment");
    }
  }
}
