"use client";

import { useState } from "react";

export default function Home() {
  const [dogUrl, setDogUrl] = useState<string | null>(null);

  async function fetchDog() {
    const res = await fetch("/api/dog"); // 调用本地 API
    const data = await res.json();
    setDogUrl(data.image);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-4">随机狗狗图片 🐶</h1>
      <button
        onClick={fetchDog}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        获取狗狗
      </button>
      {dogUrl && (
        <div className="mt-4">
          <img src={dogUrl} alt="dog" className="rounded-lg shadow-md" />
        </div>
      )}
    </main>
  );
}
