"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Message {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null); // 当前展开的消息 id

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setMessages((data as Message[]) || []);
  };

  const addMessage = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("请先登录");
      return;
    }

    if (!title.trim()) {
      alert("标题不能为空");
      return;
    }

    const { error } = await supabase.from("messages").insert([
      { user_id: user.id, title, content },
    ]);

    if (error) console.error(error);
    else {
      setTitle("");
      setContent("");
      fetchMessages();
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id); // 点击同一个标题收起
  };

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">留言板</h1>

      {/* 标题输入框 */}
      <div className="flex items-center gap-2 mb-4">
        <label className="text-gray-700 font-medium">标题：</label>
        <input
          className="border p-2 rounded w-40"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="请输入标题"
        />
      </div>

      {/* 内容输入框 */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">内容：</label>
        <textarea
          className="border p-2 rounded w-full h-32"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="请输入内容"
        />
      </div>

      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-6"
        onClick={addMessage}
      >
        发送
      </button>

      {/* 消息列表 */}
      <ul>
        {messages.map((msg) => (
          <li key={msg.id} className="border-b py-2">
            {/* 点击标题展开/收起内容 */}
            <div
              className="text-gray-800 font-semibold cursor-pointer"
              onClick={() => toggleExpand(msg.id)}
            >
              {msg.title} -{" "}
              <span className="text-xs text-gray-400">
                {new Date(msg.created_at).toLocaleString()}
              </span>
            </div>

            {/* 展开内容 */}
            {expandedId === msg.id && (
              <div className="mt-1 text-gray-700">{msg.content}</div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
