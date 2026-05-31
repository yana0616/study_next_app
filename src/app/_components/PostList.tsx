'use client'

import Link from "next/link";
import { usePostStore } from "@/store/postStore";
import { Post } from "@/types/post";

type Props = {
  posts: Post[];
}

export default function PostList({ posts }: Props) {
  const { searchQuery } = usePostStore()

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <ul className="space-y-4">
      {filteredPosts.map((post) => (
        <li key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <Link href={`/posts/${post.id}`}>
            <h3 className="text-lg font-semibold text-blue-600 hover:underline">{post.title}</h3>
            <p className="text-gray-600 mt-2 text-sm">{post.body}</p>
          </Link>
        </li>
      ))}
      {filteredPosts.length === 0 && (
        <p className="text-gray-500">該当する投稿がありません。</p>
      )}
    </ul>
  )
}