# JK Interview
Demo連結：https://d1cdm1glqbkaza.cloudfront.net/



## Tech Stack

| 層級 | 技術 |
|------|------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4 |
| Backend | Node.js 20, Express 5, TypeScript |
| ORM | TypeORM 0.3 |
| Database | PostgreSQL 16 |
| DevOps | Docker Compose, GitHub Actions, AWS ECS/Fargate, AWS ECR |

## 專案結構

```
jk-interview/
├── frontend/         # Next.js 應用
├── backend/          # Express API 服務
├── docker-compose.yml
└── .env              # 根目錄環境變數
```

## 快速開始

### 前置需求

- Docker & Docker Compose
- Node.js 20（本地開發用）

### 使用 Docker Compose 啟動

```bash
# 複製環境變數範本
cp .env.example .env  # 或直接編輯 .env

# 啟動所有服務（資料庫 + 後端）
docker compose up
```

- Backend API：http://localhost:4000
- Database：localhost:5432

### 本地開發

**啟動資料庫**
```bash
docker compose up db
```

**Backend**
```bash
cd backend
npm install
npm run dev       # port 4000，支援熱重載
```

**Frontend**
```bash
cd frontend
npm install
npm run dev       # port 3000
```

## 環境變數

### 根目錄 `.env`

```env
POSTGRES_HOST=db
POSTGRES_USER=appuser
POSTGRES_PASSWORD=apppassword
POSTGRES_DB=appdb
API_HOST=http://localhost:3000
```

### `frontend/.env.local`

```env
NEXT_PUBLIC_API_HOST=http://localhost:4000
```

### Backend（由 docker-compose 注入）

| 變數 | 說明 | 預設值 |
|------|------|--------|
| `NODE_ENV` | 執行環境 | `development` |
| `PORT` | 伺服器 port | `4000` |
| `ALLOWED_ORIGINS` | CORS 允許來源 | `http://localhost:3000` |

## API 文件

Base URL：`http://localhost:4000/api`

### 公益組織 `/charities`

| Method | 路徑 | 說明 |
|--------|------|------|
| `GET` | `/charities` | 列表（支援分頁與關鍵字搜尋） |
| `GET` | `/charities/:id` | 取得單筆 |
| `POST` | `/charities` | 新增 |
| `PATCH` | `/charities/:id` | 更新 |
| `DELETE` | `/charities/:id` | 刪除 |

**GET /charities Query Params**

| 參數 | 說明 |
|------|------|
| `page` | 頁碼（預設 1） |
| `limit` | 每頁筆數 |
| `q` | 關鍵字搜尋 |

**回應格式**
```json
{
  "total": 100,
  "page": 1,
  "limit": 20,
  "totalPages": 5,
  "hasNext": true,
  "hasPrev": false,
  "data": [...]
}
```

## 資料庫 Migration

```bash
cd backend

# 執行 migration
npm run migration:run

# 還原上一次 migration
npm run migration:revert

# 產生新 migration
npm run migration:generate -- src/db/migrations/MigrationName

# 查看 migration 狀態
npm run migration:show
```

## 部署

透過 GitHub Actions 自動部署至 AWS ECS/Fargate（推送至 `master` 分支觸發）：

1. 建置 Docker image 並推送至 AWS ECR
2. 渲染 ECS Task Definition
3. 部署至 ECS 並執行 Production migration

**AWS 設定**
- Region：ap-southeast-2（Sydney）
- Cluster：`jkos-interview-prod`
