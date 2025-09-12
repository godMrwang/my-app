"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    let { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.error(error);
    else setMessages(data || []);
  };

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
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">留言板</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
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
            {msg.content}
          </li>
        ))}
      </ul>
    </main>
  );
}
