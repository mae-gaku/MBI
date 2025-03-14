"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignin = async () => {
    const response = await fetch("http://127.0.0.1:8000/signin", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("✅ ログイン成功！");
      localStorage.setItem("access_token", data.access_token);
      router.push("/");
    } else {
      alert(`❌ エラー: ${data.detail}`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">ログイン</h1>
      <input type="text" className="w-full border p-2 mb-2" placeholder="ユーザー名"
        value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" className="w-full border p-2 mb-4" placeholder="パスワード"
        value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="w-full bg-black text-white p-2" onClick={handleSignin}>ログイン</button>
    </div>
  );
}
