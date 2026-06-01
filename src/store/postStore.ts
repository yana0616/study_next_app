import { create } from 'zustand'

type PostStore = {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export const usePostStore = create<PostStore>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}))