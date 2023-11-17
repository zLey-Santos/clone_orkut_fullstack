import { ReactNode } from "react";

export interface IPost {
  [x: string]: any;
  users_avatar: string; // deveria ser users.avatar
  users_last_name: ReactNode; // users.last_name
  content: string;
  created_at: string;
  id: number;
  count: number;
  initialPosts: string;
  user_id: number;
}

export type IResponseGetPost = {
  count: number;
  posts: IPost[];
};
