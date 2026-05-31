'use client'

import { usePostStore } from "@/store/postStore"

export default function SearchInput() {
  const { searchQuery, setSearchQuery } = usePostStore()

  return (
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="投稿を検索..."
      className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
    />
  )
}