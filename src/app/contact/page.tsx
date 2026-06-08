'use client'

import { useActionState } from 'react'
import { createContact, ContactResult } from '@/app/actions/contact'

const initialState: ContactResult = { success: false }

export default function ContactPage() {
  const [state, formAction] = useActionState(createContact, initialState)

  if (state.success) {
    return (
      <main className="max-w-md mx-auto px-4 py-16">
        <p className="text-green-600 text-xl font-semibold">{state.message}</p>
      </main>
    )
  }

  return (
    <main className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">お問い合わせ</h1>

      {state.message && (
        <p className="text-red-500 mb-4">{state.message}</p>
      )}

      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            名前
          </label>
          <input
            type="text"
            name="name"
            defaultValue={state.fields?.name}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {state.errors?.name && (
            <p className="text-red-500 text-sm mt-1">{state.errors.name[0]}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            メールアドレス
          </label>
          <input
            type="email"
            name="email"
            defaultValue={state.fields?.email}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {state.errors?.email && (
            <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            メッセージ
          </label>
          <textarea
            name="message"
            rows={6}
            defaultValue={state.fields?.message}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {state.errors?.message && (
            <p className="text-red-500 text-sm mt-1">{state.errors.message[0]}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          送信する
        </button>
      </form>
    </main>
  )
}