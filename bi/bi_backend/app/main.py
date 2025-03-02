from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORSを許可する設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # すべてのオリジンを許可（本番環境では特定のオリジンのみ許可する）
    allow_credentials=True,
    allow_methods=["*"],  # すべてのHTTPメソッドを許可
    allow_headers=["*"],  # すべてのヘッダーを許可
)

@app.get("/data")
def get_data():
    return [
        {"date": "2025-01-01", "sales": 1000.0},
        {"date": "2025-01-02", "sales": 1200.0},
        {"date": "2025-01-03", "sales": 1300.0},
    ]