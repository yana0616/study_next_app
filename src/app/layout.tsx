import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 text-gray-900">
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <nav className="max-w-2xl mx-auto px-4 py-4 flex gap-6">
            <Link href="/" className="font-semibold text-blue-600 hover:underline">トップ</Link>
            <Link href="/about" className="font-semibold text-blue-600 hover:underline">About</Link>
          </nav>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}