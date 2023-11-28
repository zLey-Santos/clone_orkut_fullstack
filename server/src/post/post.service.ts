import { UnauthorizedError } from "routing-controllers";
import { PostRepository } from "./post.repository";
import type { UpdatePostDto } from "./dtos/update-post.dto";

export class PostService {
  constructor() {
    this.postRepository = new PostRepository();
  }

  postRepository: PostRepository;

  async deletePost(postId: number, userId: number) {
    const oldPost = await this.postRepository.readPost(postId);

    if (oldPost?.user_id !== userId) {
      throw new UnauthorizedError("Você precisa ser o dono da publicação para deletá-la. GOTCHA!");
    }

    const post = await this.postRepository.deletePost(postId);
    return post;
  }

  async updatePost(postId: number, data: UpdatePostDto) {
    const oldPost = await this.postRepository.readPost(postId);

    if (oldPost?.user_id !== data.user_id) {
      throw new UnauthorizedError("Você precisa ser o dono da publicação para editá-la. GOTCHA!");
    }

    const post = await this.postRepository.updatePost(postId, data);
    return post;
  }
}
