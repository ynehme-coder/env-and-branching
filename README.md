# Environment and branching

A minimal Node.js, Express, and MongoDB application base.

## Requirements

- Node.js 20 or newer
- MongoDB running locally or a MongoDB connection URI

## Setup

```powershell
npm install
Copy-Item .env.example .env
```

Set `APP_ENV` to `staging`, `preprod`, or `prod`. The matching file in `config/`
is loaded dynamically. `MONGO_URI` and `PORT` in `.env` override the JSON defaults.

## Run

```powershell
npm start
```

Development mode:

```powershell
npm run dev
```

Health check:

```text
GET http://localhost:3000/health
```

## Item API

The item CRUD endpoints are available under `/api/items`:

```text
POST   /api/items
GET    /api/items
GET    /api/items/:id
PUT    /api/items/:id
DELETE /api/items/:id
```

Create an item:

```json
{
  "name": "Example item"
}
```

## Git workflow

Git branches and commits are maintained manually. Use the `main` branch as the
base and create feature branches before adding application features.
