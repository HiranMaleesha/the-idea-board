# Backend API

Express.js backend with TypeScript and Firebase Firestore.

## Setup

```bash
npm install
cp .env.example .env
# Edit .env with your Firebase credentials
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## API Endpoints

- `GET /health` - Health check
- `GET /api/ideas` - Get all ideas
- `GET /api/ideas/:id` - Get single idea
- `POST /api/ideas` - Create new idea
- `POST /api/ideas/:id/upvote` - Upvote an idea
