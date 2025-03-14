"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    const response = await fetch("http://127.0.0.1:8000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("✅ 登録が完了しました！");
      router.push("/signin");
    } else {
      alert(`❌ エラー: ${data.detail}`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">サインアップ</h1>
      <input type="text" className="w-full border p-2 mb-2" placeholder="ユーザー名"
        value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" className="w-full border p-2 mb-4" placeholder="パスワード"
        value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="w-full bg-black text-white p-2" onClick={handleSignup}>登録</button>
    </div>
  );
}
