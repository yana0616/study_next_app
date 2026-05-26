import { Main } from "next/document";

type Post = {
  id: number;
  title: string;
  body: string;
}

type Props = {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: Props) {
  const { id } = await params; // TSの分割代入
  console.log(id);
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post: Post = await res.json();

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </main>
  )
} 
