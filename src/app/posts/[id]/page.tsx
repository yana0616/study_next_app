import { prisma } from "@/lib/prisma";
import { notFound } from 'next/navigation';
// import { Post } from "@/types/post";

import PostDetail from "./_components/PostDetail";

type Props = {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: Props) {
  const { id } = await params; // TSの分割代入
  console.log(id);
  // const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  // const post: Post = await res.json();
  const post = await prisma.post.findUnique({
    where: { id: Number(id) }
  });

  if (!post) {
    notFound()
  }

  return (
    <main>
      <PostDetail post={post} />
    </main>
  )
} 
