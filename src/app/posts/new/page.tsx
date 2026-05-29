'use client'

import { useActionState } from 'react'
import { createPost, ActionResult } from '@/app/actions/post'

const initialState: ActionResult = { success: false }

export default function NewPostPage() {
  const [state, formAction] = useActionState(createPost, initialState)

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">新規投稿</h1>

      {state.success && (
        <p className="text-green-600 mb-4">投稿しました！</p>
      )}

      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">タイトル</label>
          <input
            type="text"
            name="title"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {state.errors?.title && (
            <p className="text-red-500 text-sm mt-1">{state.errors.title[0]}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">本文</label>
          <textarea
            name="body"
            rows={4}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {state.errors?.body && (
            <p className="text-red-500 text-sm mt-1">{state.errors.body[0]}</p>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          投稿する
        </button>
      </form>
    </main>
  )
}