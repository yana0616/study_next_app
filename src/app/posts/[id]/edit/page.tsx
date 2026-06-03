import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import EditPostForm from '../_components/PostEditForm'

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  })

  if (!post) notFound()

  return (
    <main className='max-w-2xl mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold text-gray-800 mb-6'>投稿を編集</h1>
      <EditPostForm post={post} />
    </main>
  )

}
