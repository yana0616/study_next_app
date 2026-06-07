'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { useRef } from 'react'

type Props = {
  content: string
  onChange: (content: string) => void
}

export default function TiptapEditor({ content, onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    const { url } = await res.json()
    editor?.chain().focus().setImage({ src: url }).run()
  }

  return (
    <div className="border border-gray-300 rounded">
      {/* ツールバー */}
      <div className="border-b border-gray-300 p-2 flex gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded text-sm font-bold ${editor?.isActive('bold') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded text-sm italic ${editor?.isActive('italic') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2 py-1 rounded text-sm ${editor?.isActive('heading', { level: 2 }) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-2 py-1 rounded text-sm ${editor?.isActive('heading', { level: 3 }) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 rounded text-sm ${editor?.isActive('bulletList') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        >
          • リスト
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={`px-2 py-1 rounded text-sm ${editor?.isActive('orderedList') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        >
          1. リスト
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          className={`px-2 py-1 rounded text-sm ${editor?.isActive('codeBlock') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        >
          {'</>'}
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-2 py-1 rounded text-sm hover:bg-gray-100"
        >
          🖼 画像
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      {/* エディタ本体 */}
      <EditorContent
        editor={editor}
        className="p-3 min-h-[200px] prose max-w-none focus:outline-none"
      />
    </div>
  )
}