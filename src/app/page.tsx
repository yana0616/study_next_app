import Link from "next/link";

import PostList from "./_components/PostList";

import { Post } from "@/types/post";

export default async function HomePage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  const posts: Post[] = await res.json();

  return (
    <main>
      <h1>トップページ</h1>
      <Link href="/about">Aboutページへのリンク</Link>

      <h2>投稿一覧</h2>
      <PostList posts={posts} />
    </main>
  )
}