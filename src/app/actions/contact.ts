'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const ContactSchema = z.object({
  name: z.string().min(1, '名前は必須です'),
  email: z.string().email('正しいメールアドレスを入力してください'),
  message: z.string().min(10, 'メッセージは10文字以上で入力してください')
})

export type ContactResult = {
  success: boolean
  errors?: {
    name?: string[]
    email?: string[]
    message?: string[]
  }
  message?: string
  fields?: {
    name: string
    email: string
    message: string
  }
}

export async function createContact(
  prevState: ContactResult,
  formData: FormData
): Promise<ContactResult> {
  const result = ContactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  })

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      fields: {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        message: formData.get('message') as string,
      }
    }
  }


  // DB保存
  await prisma.contact.create({
    data: {
      name: result.data.name,
      email: result.data.email,
      message: result.data.message,
    },
  })

  // メール送信
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'rainymoment0616@gmail.com',
    subject: `お問い合わせ：${result.data.name}様より`,
    html: `
      <h2>お問い合わせがありました</h2>
      <p><strong>名前：</strong>${result.data.name}</p>
      <p><strong>メールアドレス：</strong>${result.data.email}</p>
      <p><strong>メッセージ：</strong></p>
      <p>${result.data.message}</p>
    `
  })

  // ユーザーへの自動返信メール
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: result.data.email,
    subject: `お問い合わせを受け付けました`,
    html: `
      <p>${result.data.name}様</p>
      <p>お問い合わせありがとうございます。</p>
      <p>以下の内容でお問い合わせを受け付けました。</p>
      <hr />
      <p><strong>名前：</strong>${result.data.name}</p>
      <p><strong>メールアドレス：</strong>${result.data.email}</p>
      <p><strong>メッセージ：</strong></p>
      <p>${result.data.message}</p>
      <hr />
      <p>内容を確認のうえ、担当者よりご連絡いたします。</p>
    `,
  })

  return { success: true, message: 'お問い合わせを受け付けました！' }

}


