"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

// 自定义消息类型（用于 useState 类型约束）
interface Message {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  // 获取留言列表
  const fetchMessages = async () => {
    // 这里不指定泛型，让 Supabase 推断类型
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setMessages((data as Message[]) || []);
  };

  // 添加新留言
  const addMessage = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("请先登录");
      return;
    }

    const { error } = await supabase.from("messages").insert([
      { user_id: user.id, content },
    ]);

    if (error) console.error(error);
    else {
      setContent("");
      fetchMessages();
    }
  };

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">留言板</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1 rounded"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="写点什么..."
        />
        <button
          className="bg-green-500 text-white px-4 rounded"
          onClick={addMessage}
        >
          发送
        </button>
      </div>

      <ul>
        {messages.map((msg) => (
          <li key={msg.id} className="border-b py-2">
            <div className="text-gray-700">{msg.content}</div>
            <div className="text-xs text-gray-400">
              {new Date(msg.created_at).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

