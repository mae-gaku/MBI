"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("⚠️ データをアップロードするにはログインが必要です。");
      router.push("/signin");
    }
  }, [router]);
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Upload response:", result);

      if (result.success) {
        alert("✅ アップロードが完了しました！");
        setUploadSuccess(true);
        
        // アップロード成功後にデータをローカルストレージに保存
        localStorage.setItem("uploadedData", JSON.stringify(result.data));
        
        // 親コンポーネントに通知
        window.localStorage.setItem("dataUpdated", Date.now().toString());

        router.push("../"); // メイン画面に遷移
      } else {
        alert(`❌ アップロードに失敗しました: ${result.message || "原因不明"}`);
      }
    } catch (error) {
      console.error("アップロードエラー:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">📤 データアップロード</h1>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">ファイルを選択</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Input type="file" accept=".xlsx" onChange={handleFileUpload} />
          <Button className="w-full" disabled={isUploading}>
            {isUploading ? "アップロード中..." : "アップロード"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
