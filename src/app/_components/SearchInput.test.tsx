import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchInput from './SearchInput'
import { usePostStore } from '@/store/postStore'

// 各テスト前にstoreをリセット
beforeEach(() => {
  usePostStore.setState({ searchQuery: '' })
})

describe('SearchInput', () => {
  it('初期状態で空のinputが表示される', () => {
    render(<SearchInput />)
    const input = screen.getByPlaceholderText('投稿を検索...')
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('')
  })

  it('入力するとstoreのsearchQueryが更新される', async () => {
    const user = userEvent.setup()
    render(<SearchInput />)

    const input = screen.getByPlaceholderText('投稿を検索...')
    await user.type(input, 'テスト')

    expect(usePostStore.getState().searchQuery).toBe('テスト')
  })
})