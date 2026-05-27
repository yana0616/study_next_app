import { Post } from "@/types/post";

type Props = {
  post: Post;
}

export default function PostDetail({ post }: Props) {
  return (
    <article className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{post.title}</h1>
      <p className="text-gray-600 leading-relaxed">{post.body}</p>
    </article>
  )
}