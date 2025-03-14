from fastapi import FastAPI, File, UploadFile
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
import json

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import Dict
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext
import jwt
import datetime


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



# パスワードのハッシュ化設定
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT 設定
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# 仮のユーザーデータ
fake_users_db: Dict[str, Dict] = {}

class User(BaseModel):
    username: str
    password: str

# ユーザー登録エンドポイント
@app.post("/signup")
async def signup(user: User):
    if user.username in fake_users_db:
        raise HTTPException(status_code=400, detail="ユーザー名は既に登録されています。")

    hashed_password = pwd_context.hash(user.password)
    fake_users_db[user.username] = {"username": user.username, "password": hashed_password}
    
    return {"message": "登録が完了しました"}

# ログインエンドポイント
@app.post("/signin")
async def signin(form_data: OAuth2PasswordRequestForm = Depends()):
    user = fake_users_db.get(form_data.username)
    if not user or not pwd_context.verify(form_data.password, user["password"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="ユーザー名またはパスワードが違います")

    # JWTトークン生成
    expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    token = jwt.encode({"sub": form_data.username, "exp": expire}, SECRET_KEY, algorithm=ALGORITHM)

    return {"access_token": token, "token_type": "bearer"}
