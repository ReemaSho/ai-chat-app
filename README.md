# AI Chat App

A full-stack ChatGPT-style application built with:

- Node.js
- Express
- TypeScript
- PostgreSQL
- Sequelize
- React
- Vite
- Tailwind CSS
- OpenRouter AI streaming

## Features

- Create chats
- Store messages in PostgreSQL
- Stream AI responses in real time
- ChatGPT-style light UI
- Sidebar with chat history
- Auto-scroll messages
- Markdown AI responses
- Simple user context

## Project Structure

```txt
ai-chat-app-2/
│
├── src/                 # Backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   └── index.ts
│
├── frontend/            # React frontend
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       ├── hooks/
│       ├── pages/
│       └── types/
│
├── package.json
└── README.md
```

## 1. Clone and Install

```
Clone and Install
```

Then install frontend dependencies:

```
cd frontend
npm install
cd ..
```

## 2. Create PostgreSQL Database

```
createdb -U postgres -h localhost -p 5433 chatgpt
```

## 3. Create .env

Create a .env file in the root folder:

```
PORT=8000

DB_HOST=localhost
DB_PORT=5433
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=chatgpt

OPENROUTER_API_KEY=your_openrouter_api_key_here
```

## 4. Get OpenRouter API Key

```
https://openrouter.ai/openai/gpt-oss-20b:free/api
```

Create/copy your API key and paste it into:

```
OPENROUTER_API_KEY=your_key_here
```

## 5. Run Backend + Frontend

```
npm run dev:all
```

Backend:

```
http://localhost:8000
```

Frontend:

```
http://localhost:5173
```

## Backend Scripts

```
npm run build
npm run watch
npm run dev
npm run dev:all
```

## API Overview

Chats

Create chat:

```
POST /api/v1/chats
```

Get chats by user:

```
GET /api/v1/chats/:userId
```

Messages

Get messages:

```
GET /api/v1/chats/:chatId/messages
```

Send message with streaming:

```
POST /api/v1/messages
```

## Notes

This project currently uses a simple demo user through frontend context.

Authentication is not implemented yet.

The current demo user is:

```
{
  id: 1,
  name: "Reema"
}
```

## Future Improvements

- Real authentication
- Delete chat
- Rename chat
- Better sidebar previews
- Stop streaming button
- Message pagination
- Production migrations
