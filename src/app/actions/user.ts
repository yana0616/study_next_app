'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

const RegisterSchema = z.object({
  email: z.string().email('正しいメールアドレスを入力してください'),
  password: z.string().min(8, 'パスワードは8文字以上です'),
  name: z.string().min(1, '名前は必須です'),
})

export type RegisterResult = {
  success: boolean
  errors?: {
    email?: string[]
    password?: string[]
    name?: string[]
  }
  message?: string
}

export async function registerUser(
  prevState: RegisterResult,
  formData: FormData
): Promise<RegisterResult> {
  const result = RegisterSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    name: formData.get('name'),
  })

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors
    }
  }

  // メールアドレスの重複チェック
  const existing = await prisma.user.findUnique({
    where: { email: result.data.email },
  })

  if (existing) {
    return {
      success: false,
      message: 'このメールアドレスはすでに登録されています',
    }
  }

  await prisma.user.create({
    data: {
      email: result.data.email,
      password: result.data.password,
      name: result.data.name,
    }
  })

  redirect('/login');
}


