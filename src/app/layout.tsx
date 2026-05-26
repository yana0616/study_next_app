import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <nav>
          <Link href="/">Home</Link>
          |
          <Link href="/about">About</Link>
        </nav>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}