import Link from "next/link";

import PostList from "./_components/PostList";

import { Post } from "@/types/post";

export default async function HomePage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  const posts: Post[] = await res.json();

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">トップページ</h1>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">投稿一覧</h2>
      <PostList posts={posts} />
    </main>
  )
}