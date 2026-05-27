import { Post } from "@/types/post";

type Props = {
  post: Post;
}

export default function PostDetail({ post }: Props) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  )
}