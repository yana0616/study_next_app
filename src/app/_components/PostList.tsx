import Link from "next/link";

import { Post } from "@/types/post";

type Props = {
  posts: Post[];
}

export default function PostList({ posts }: Props) {
  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <li key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <Link href={`/posts/${post.id}`}>
            <h3 className="text-lg font-semibold text-blue-600 hover:underline">{post.title}</h3>
            <p className="text-gray-600 mt-2 text-sm">{post.body}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}