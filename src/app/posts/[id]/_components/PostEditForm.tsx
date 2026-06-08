'use client'

import { useState, useActionState } from "react";
import { updatePost, ActionResult } from '@/app/actions/post'
import { Post } from '@/types/post'
import TiptapEditor from '@/components/editor/TiptapEditor'

type Props = {
  post: Post
}

const initialState: ActionResult = { success: false }

export default function EditPostForm({ post }: Props) {
  const [state, formAction] = useActionState(updatePost, initialState)
  const [body, setBody] = useState(post.body)

  return (
    <>
      {state.success && (
        <p className="text-green-600 mb-4">更新しました</p>
      )}
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="id" value={post.id} />
        <input type="hidden" name="body" value={body} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">タイトル</label>
          <input
            type="text"
            name="title"
            defaultValue={post.title}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {state.errors?.title && (
            <p className="text-red-500 text-sm mt-1">{state.errors.title[0]}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">本文</label>
          <TiptapEditor content={post.body} onChange={setBody} />
          {state.errors?.body && (
            <p className="text-red-500 text-sm mt-1">{state.errors.body[0]}</p>
          )}
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">更新する</button>
      </form>
    </>
  )
}