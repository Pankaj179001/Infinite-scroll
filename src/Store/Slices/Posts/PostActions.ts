import { paginate } from "../../Types/Queries";

export const fetchPosts = async (queries?: paginate): Promise<Posts> => {
  const skip = queries?.skip || 0;
  const limit = queries?.limit || 15;
  const resp = await fetch(
    "https://dummyjson.com/posts?" + `skip=${skip}&limit=${limit}`
  );
  const data = await resp.json();
  return data;
};

export interface post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

export interface Posts {
  posts: post[];
  total: number;
  skip: number;
  limit: number;
}
