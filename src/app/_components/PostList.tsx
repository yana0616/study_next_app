import Link from "next/link";

import { Post } from "@/types/post";

type Props = {
  posts: Post[];
}

export default function PostList({ posts }: Props) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/posts/${post.id}`}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}