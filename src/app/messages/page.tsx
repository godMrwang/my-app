"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(""); // 新增验证码状态

  // 获取邮箱 OTP
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert(error.message);
    else alert("登录链接已发送到邮箱，请查收");
  };

  // 验证 OTP
  const handleVerify = async () => {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,          // 用户输入的验证码
      type: "email"   // 说明是邮箱 OTP
    });

    if (error) alert(error.message);
    else alert("验证成功，你已登录！");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-2">
      <h1 className="text-2xl font-bold mb-4">欢迎来到留言板</h1>

      {/* 邮箱输入框 */}
      <input
        className="border p-2"
        type="email"
        placeholder="输入邮箱"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleLogin}
      >
        发送验证码
      </button>

      {/* 验证码输入框 */}
      <input
        className="border p-2 mt-4"
        type="text"
        placeholder="输入收到的验证码"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleVerify}
      >
        验证登录
      </button>
    </main>
  );
}
