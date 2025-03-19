

<h1 align="center">MBI</h1>


<p align="center">データの可視化・分析を行うことができるBIツール</p>

<p align="center">
  <a href="https://github.com/mae-gaku/MBI/releases"><img src="https://img.shields.io/github/v/release/mae-gaku/MBI?style=flat-square" alt="Version"></a>
  <a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/license-Apache%202.0-blue.svg?style=flat-square" alt="License"></a>

</p>


<p align="center">
  <img src="https://github.com/user-attachments/assets/7a60ca7c-dd41-4750-8e7c-d62af25e2243" alt="MBI Logo" width="700">
</p>


---

## ToDo
- [x] シンプルでモダンなデザイン
- [x] サインアップ・ログイン機能作成
- [ ] LLM機能の追加
- [ ] データベース管理
- [ ] Webappの高速化 




---

## Setup

### 1. Clone Repository
```sh
git clone https://github.com/mae-gaku/MBI.git
cd MBI
```

### 2. Install Dependencies
```sh
npx shadcn@latest init
npx shadcn@latest add input
npx shadcn@latest add sidebar
```

### 3. Run Application

#### FastAPI (Backend)
```sh
uvicorn main:app --reload
```

#### Next.js (Frontend)
```sh
npm run dev
```

### 4. Access
```
http://localhost:3000/
```

