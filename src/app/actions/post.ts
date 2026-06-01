'use server'

// import { z } from 'zod';
import { prisma } from '@/lib/prisma'
import { PostSchema } from '@/lib/validations/post'

// const PostSchema = z.object({
//   title: z.string().min(1, 'タイトルは必須です').max(100, 'タイトルは100文字以内です'),
//   body: z.string().min(1, '本文は必須です'),
// })

export type ActionResult = {
  success: boolean
  errors?: {
    title?: string[]
    body?: string[]
  }
}

export async function createPost(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const result = PostSchema.safeParse({
    title: formData.get('title'),
    body: formData.get('body'),
  })

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    }
  }

  await prisma.post.create({
    data: {
      title: result.data.title,
      body: result.data.body,
    }
  })

  // console.log(result.data);
  return { success: true }
}