'use client';

import { useState } from 'react';

export default function AboutPage() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <h1>About</h1>
      <p>カウント：{count}</p>
      <button onClick={() => setCount(count + 1)}>増やす</button>
      <p>これはAboutページです。</p>
    </main>
  )
}