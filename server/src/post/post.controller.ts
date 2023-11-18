import { JsonController, Get, Post, QueryParam, Param, Body, HttpCode, Delete, Put } from "routing-controllers";
import { PostRepository } from "./post.repository";
import { CreatePostDto } from "./dtos/create-post.dto";
import { UpdatePostDto } from "./dtos/update-post.dto";
import { CreatePostCommentsDto } from "./dtos/create-post-comment.dto"; // Corrected typo in the import

@JsonController("/posts")
export class PostController {
  constructor() {
    this.postRepository = new PostRepository();
  }

  postRepository: PostRepository;

  @Get()
  async getAll(
    @QueryParam("limit") limit: number = 30,
    @QueryParam("offset") offset: number = 0,
    @QueryParam("order_by") orderBy: string = "desc",
    @QueryParam("search") search: string
  ) {
    const posts = await this.postRepository.listPosts({ limit, offset, orderBy, search });
    return posts;
  }

  @Get("/:id")
  async getById(@Param("id") postId: number) {
    const post = await this.postRepository.readPost(postId);
    return post;
  }

  @HttpCode(201)
  @Post()
  async createPost(@Body() body: CreatePostDto) {
    const post = await this.postRepository.createPost(body);
    return post;
  }

  @Delete("/:id")
  async deleteById(@Param("id") postId: number) {
    const post = await this.postRepository.deletePost(postId);
    return post;
  }

  @Put("/:id")
  async updateById(@Param("id") postId: number, @Body() body: UpdatePostDto) {
    const post = await this.postRepository.updatePost(postId, body);
    return post;
  }

  @Get("/:id/comments")
  async listPostComments(@Param("id") postId: number) {
    const comments = await this.postRepository.listPostComments(postId);
    return comments;
  }

  @HttpCode(201)
  @Post("/:id/comments")
  async createPostComments(@Param("id") postId: number, @Body() body: CreatePostCommentsDto) {
    const comments = await this.postRepository.createPostComment(postId, body);
    return comments;
  }
}
