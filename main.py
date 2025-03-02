from fastapi import FastAPI, File, UploadFile
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
import json

app = FastAPI()

# CORS設定 (Next.jsとの連携のため)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.jsのURL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 仮のデータAPI (デフォルトデータ)
@app.get("/data")
async def get_data():
    return [
        {"date": "2025-01-01", "sales": 1000.0},
        {"date": "2025-01-02", "sales": 1200.0},
        {"date": "2025-01-03", "sales": 1300.0},
    ]

# Excelファイルのアップロードとデータ処理
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        # ファイルを読み込んで pandas で処理
        contents = await file.read()
        df = pd.read_excel(BytesIO(contents))

        df.columns = ["date", "sales"]
        df["date"] = df["date"].astype(str)  # 日付を文字列に変換

        json_data = df.to_dict(orient="records")

        # JSON 形式で返す
        return {"success": True, "data": json_data}
    
    except Exception as e:
        print("❌ エラー:", str(e))
        return {"success": False, "message": f"エラー: {str(e)}"}
