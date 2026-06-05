'use client'

import { useActionState } from 'react'
import { registerUser, RegisterResult } from '@/app/actions/user'
import Link from 'next/link'

const initialState: RegisterResult = { success: false }

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initialState)

  return (
    <main className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">ユーザー登録</h1>

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
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {state.errors?.email && (
            <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            パスワード
          </label>
          <input
            type="password"
            name="password"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {state.errors?.password && (
            <p className="text-red-500 text-sm mt-1">{state.errors.password[0]}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          登録する
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        すでにアカウントをお持ちの方は
        <Link href="/login" className="text-blue-600 hover:underline ml-1">
          ログイン
        </Link>
      </p>
    </main>
  )
}