"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell 
} from "recharts";
import { useRouter } from "next/navigation";


export default function Dashboard() {
  const [data, setData] = useState([]);
  const [graphType, setGraphType] = useState("line");
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("uploadedData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <div className="flex min-h-screen bg-white text-black">
      {/* サイドバー */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4">
        <h2 className="text-xl font-bold mb-4">MBI Dashboard</h2>
        <nav className="space-y-2">
          <a href="/" className="block p-2 rounded-lg hover:bg-gray-100">ホーム</a>
          <a href="/upload" className="block p-2 rounded-lg hover:bg-gray-100">データアップロード</a>
        </nav>
        <div className="mt-6">
          {isLoggedIn ? (
            <button className="w-full bg-black text-white p-2" onClick={handleLogout}>ログアウト</button>
          ) : (
            <>
              <a href="/signin" className="block bg-black text-white text-center p-2 mb-2 rounded">ログイン</a>
              <a href="/signup" className="block bg-gray-200 text-black text-center p-2 rounded">サインアップ</a>
            </>
          )}
        </div>
      </aside>

      {/* メインコンテンツ */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">データ可視化</h1>

          {/* グラフ選択 */}
          <Select onValueChange={(value) => setGraphType(value)} defaultValue="line">
            <SelectTrigger className="w-40 border border-gray-300 bg-white text-black shadow-sm">
              <SelectValue placeholder="グラフ" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300">
              <SelectItem value="line">📈 折れ線</SelectItem>
              <SelectItem value="bar">📊 棒</SelectItem>
              <SelectItem value="pie">🥧 円</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* カード */}
        <Card className="shadow-md border border-gray-300 rounded-lg">
          <CardContent className="h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              {graphType === "line" && (
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" stroke="#333" />
                  <YAxis stroke="#333" />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#000000" />
                </LineChart>
              )}
              {graphType === "bar" && (
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" stroke="#333" />
                  <YAxis stroke="#333" />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#000000" />
                </BarChart>
              )}
              {graphType === "pie" && (
                <PieChart>
                  <Pie data={data} dataKey="sales" nameKey="date" cx="50%" cy="50%" outerRadius={80} fill="#000000">
                    {data.map((_, index) => (
                      <Cell key={`cell-${index}`} fill="#000000" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
