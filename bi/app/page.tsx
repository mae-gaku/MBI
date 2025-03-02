"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell 
} from "recharts";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [graphType, setGraphType] = useState("line");

  // データをローカルストレージから取得
  const loadDataFromLocalStorage = () => {
    const storedData = localStorage.getItem("uploadedData");
    if (storedData) {
      setData(JSON.parse(storedData));  // ローカルストレージからデータをセット
    } else {
      fetchData();  // ローカルストレージにデータがなければAPIから取得
    }
  };

  // APIからデータを取得する関数
  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/data");
      const result = await response.json();
      setData(result);  // データを更新
    } catch (error) {
      console.error("データ取得エラー:", error);
    }
  };

  // 初回ロード時にローカルストレージからデータを取得
  useEffect(() => {
    loadDataFromLocalStorage();
  }, []); // 初回マウント時のみ実行

  // グラフタイプの変更
  useEffect(() => {
    const handleStorageChange = () => {
      loadDataFromLocalStorage();  // ローカルストレージのデータを再取得
    };

    // LocalStorageの変更を監視
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="flex">
      {/* サイドバー */}
      <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
        <h2 className="text-xl font-bold mb-4">📊 MBI Dashboard</h2>
        <nav className="space-y-2">
          <a href="/" className="block p-2 rounded hover:bg-gray-700">🏠 ホーム</a>
          <a href="/upload" className="block p-2 rounded hover:bg-gray-700">📂 データアップロード</a>
        </nav>
      </aside>

      {/* メインコンテンツ */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">データ可視化</h1>

          {/* グラフ選択 */}
          <Select onValueChange={(value) => setGraphType(value)} defaultValue="line">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="グラフ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">📈 折れ線</SelectItem>
              <SelectItem value="bar">📊 棒</SelectItem>
              <SelectItem value="pie">🥧 円</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="shadow-md">
          <CardContent className="h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              {graphType === "line" && (
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#6366F1" />
                </LineChart>
              )}
              {graphType === "bar" && (
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#10B981" />
                </BarChart>
              )}
              {graphType === "pie" && (
                <PieChart>
                  <Pie data={data} dataKey="sales" nameKey="date" cx="50%" cy="50%" outerRadius={80} fill="#6366F1">
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={["#6366F1", "#10B981", "#FACC15"][index % 3]} />
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
