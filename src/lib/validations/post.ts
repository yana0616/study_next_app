import { z } from 'zod'

export const PostSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です').max(100, 'タイトルは100文字以内です'),
  body: z.string().min(1, '本文は必須です'),
})

export type PostInput = z.infer<typeof PostSchema>