import { prisma } from "@/lib/prisma";
import PostList from "./_components/PostList";
import SearchInput from "./_components/SearchInput";

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">トップページ</h1>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">投稿一覧</h2>
      <SearchInput />
      <PostList posts={posts} />
    </main>
  )
}