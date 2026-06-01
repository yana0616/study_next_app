import { describe, it, expect } from 'vitest'
import { PostSchema } from './post'

describe('PostSchema', () => {
  it('正常なデータはバリデーションを通過する', () => {
    const result = PostSchema.safeParse({
      title: 'テストタイトル',
      body: 'テスト本文',
    })
    expect(result.success).toBe(true)
  })

  it('タイトルが空のときエラーになる', () => {
    const result = PostSchema.safeParse({
      title: '',
      body: 'テスト本文',
    })
    expect(result.success).toBe(false)
    expect(result.error?.flatten().fieldErrors.title).toContain('タイトルは必須です')
  })

  it('本文が空のときエラーになる', () => {
    const result = PostSchema.safeParse({
      title: 'テストタイトル',
      body: '',
    })
    expect(result.success).toBe(false)
    expect(result.error?.flatten().fieldErrors.body).toContain('本文は必須です')
  })

  it('タイトルが100文字を超えるときエラーになる', () => {
    const result = PostSchema.safeParse({
      title: 'a'.repeat(101),
      body: 'テスト本文',
    })
    expect(result.success).toBe(false)
    expect(result.error?.flatten().fieldErrors.title).toContain('タイトルは100文字以内です')
  })
})