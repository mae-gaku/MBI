"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username, password }),
      });

      if (!response.ok) throw new Error("ログイン失敗");

      const data = await response.json();
      localStorage.setItem("token", data.access_token);
      window.location.href = "/"; // ログイン後、メインページへ
    } catch (err) {
      setError("ユーザー名またはパスワードが間違っています");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <div className="p-6 bg-gray-900 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-4">ログイン</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Input placeholder="ユーザー名" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input type="password" placeholder="パスワード" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2" />
        <Button onClick={handleLogin} disabled={loading} className="w-full mt-4">
          {loading ? "ログイン中..." : "ログイン"}
        </Button>
      </div>
    </div>
  );
}
