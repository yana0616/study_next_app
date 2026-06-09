import "./globals.css";
import Link from "next/link";
import { auth, signOut } from '@/auth';
import GoogleAnalytics from "./_components/GoogleAnalytics";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth()

  return (
    <html lang="ja">
      <body className="bg-gray-50 text-gray-900">
        <GoogleAnalytics />
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <nav className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex gap-6">
              <Link href="/" className="font-semibold text-blue-600 hover:underline">トップ</Link>
              <Link href="/about" className="font-semibold text-blue-600 hover:underline">About</Link>
              {session && (
                <Link href="/posts/new" className="font-semibold text-blue-600 hover:underline">新規投稿</Link>
              )}
              <Link href="/contact" className="font-semibold text-blue-600 hover:underline">お問い合わせ</Link>
            </div>
            <div>
              {session ? (
                <form action={async () => {
                  'use server'
                  await signOut({ redirectTo: '/login' })
                }}>
                  <button type="submit" className="text-sm text-gray-600 hover:underline">ログアウト({session.user?.email})</button>
                </form>
              ) : (
                <Link href="/login" className="text-sm text-blue-600 hover:underline">ログイン</Link>
              )}
            </div>
          </nav>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}