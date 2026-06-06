'use client'

import Link from "next/link";
import DOMPurify from "dompurify";
import { Post } from "@/types/post";
import { deletePost } from "@/app/actions/post";

type Props = {
  post: Post;
}

export default function PostDetail({ post }: Props) {
  const sanitizedBody = DOMPurify.sanitize(post.body)
  return (
    <article className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{post.title}</h1>
      <div
        className="text-gray-600 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: sanitizedBody }}
      />
      <div className="mt-6 flex gap-4">
        <Link
          href={`/posts/${post.id}/edit`}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          編集する
        </Link>
        <form action={deletePost}>
          <input type="hidden" name="id" value={post.id} />
          <button
            type="submit"
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            削除する
          </button>
        </form>
      </div>
    </article>
  )
}