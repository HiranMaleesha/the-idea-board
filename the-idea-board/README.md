# The Idea Board 💡

A modern, real-time collaborative platform where creativity meets community. Share your brilliant ideas, discover inspiration from others, and vote on the concepts that matter most.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Quick Start with Docker](#quick-start-with-docker)
- [Local Development Setup](#local-development-setup)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Trade-offs & Design Decisions](#trade-offs--design-decisions)

## 🎯 Overview

The Idea Board is a two-part web application consisting of:

1. **Landing Page** - A beautiful, responsive marketing site showcasing the platform's features
2. **Idea Board App** - An anonymous, real-time idea-sharing platform where users can:
   - Post ideas (max 280 characters)
   - Upvote ideas they love
   - See live updates as the community engages

## ✨ Features

### Landing Page
- Modern, gradient-based design with smooth animations
- Fully responsive (mobile, tablet, desktop)
- Hero section with compelling call-to-action
- Feature showcase highlighting key benefits
- Dark mode support

### Idea Board Application
- **Anonymous Posting** - No sign-up required
- **Character Limit** - 280 characters to keep ideas concise
- **Real-time Updates** - Polling mechanism for live data (5-second intervals)
- **Upvoting System** - Community-driven idea ranking
- **Persistent Storage** - All ideas stored in Firestore
- **Responsive Design** - Beautiful UI across all devices

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Build Tool**: Turbopack (development)

### Backend
- **Runtime**: Node.js 20
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: Firebase Firestore
- **Security**: Helmet, CORS, Rate Limiting

### DevOps
- **Containerization**: Docker & Docker Compose
- **Orchestration**: Kubernetes (manifests included)
- **CI/CD Ready**: Structured for easy integration

## 🏗 Architecture

```
┌─────────────────┐
│   Frontend      │
│   (Next.js)     │
│   Port: 3000    │
└────────┬────────┘
         │
         │ HTTP/REST
         │
┌────────▼────────┐
│   Backend       │
│   (Express)     │
│   Port: 5000    │
└────────┬────────┘
         │
         │ Firebase SDK
         │
┌────────▼────────┐
│   Firestore     │
│   (Database)    │
└─────────────────┘
```

### API Architecture
- RESTful API design
- JSON request/response format
- Atomic transactions for upvotes
- Error handling with proper HTTP status codes
- Rate limiting (100 requests per 15 minutes per IP)

## 📦 Prerequisites

- **Docker** (v20.10+) and **Docker Compose** (v2.0+)
- **Node.js** (v20+) - for local development
- **npm** or **yarn** - package manager
- **Firebase Project** - with Firestore enabled

### Firebase Setup

1. Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore Database
3. Create a service account:
   - Go to Project Settings → Service Accounts
   - Click "Generate New Private Key"
   - Save the JSON file securely

## 🚀 Quick Start with Docker

The easiest way to run the entire application is using Docker Compose:

### 1. Clone the Repository

```bash
git clone <repository-url>
cd the-idea-board
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
```

**Important**: Replace the values with your actual Firebase credentials from the service account JSON file.

### 3. Run with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/health

### 5. Stop the Application

```bash
docker-compose down
```

## 💻 Local Development Setup

For development with hot-reloading:

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your Firebase credentials

# Run in development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The backend will run on http://localhost:5000

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The frontend will run on http://localhost:3000

## 📚 API Documentation

Base URL: `http://localhost:5000/api`

### Endpoints

#### 1. Get All Ideas

```http
GET /api/ideas
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "abc123",
      "text": "Build a platform for sharing ideas",
      "upvotes": 42,
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T12:45:00.000Z"
    }
  ],
  "count": 1
}
```

#### 2. Create a New Idea

```http
POST /api/ideas
Content-Type: application/json

{
  "text": "Your brilliant idea here (max 280 chars)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "xyz789",
    "text": "Your brilliant idea here",
    "upvotes": 0,
    "createdAt": "2025-01-15T14:00:00.000Z",
    "updatedAt": "2025-01-15T14:00:00.000Z"
  }
}
```

#### 3. Upvote an Idea

```http
POST /api/ideas/:id/upvote
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "abc123",
    "text": "Build a platform for sharing ideas",
    "upvotes": 43,
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T14:05:00.000Z"
  }
}
```

#### 4. Get Single Idea

```http
GET /api/ideas/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "abc123",
    "text": "Build a platform for sharing ideas",
    "upvotes": 42,
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T12:45:00.000Z"
  }
}
```

#### 5. Health Check

```http
GET /health
```

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-01-15T14:00:00.000Z"
}
```

### Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

## 🌐 Deployment

### Docker Deployment

The application is fully containerized and ready for deployment to any Docker-compatible platform:

- **Docker Hub**
- **AWS ECS/Fargate**
- **Google Cloud Run**
- **Azure Container Instances**
- **DigitalOcean App Platform**

### Kubernetes Deployment

Kubernetes manifests are included in the `/k8s` directory. See [k8s/README.md](./k8s/README.md) for detailed instructions.

Quick deploy to Kubernetes:

```bash
# Create Firebase secret
kubectl create secret generic firebase-credentials \
  --from-literal=project-id='YOUR_PROJECT_ID' \
  --from-literal=private-key='YOUR_PRIVATE_KEY' \
  --from-literal=client-email='YOUR_CLIENT_EMAIL'

# Deploy backend
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml

# Deploy frontend
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml

# (Optional) Configure ingress
kubectl apply -f k8s/ingress.yaml
```

## 📁 Project Structure

```
the-idea-board/
├── backend/                    # Express.js backend
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   │   └── firebase.ts    # Firebase initialization
│   │   ├── controllers/       # Request handlers
│   │   │   └── idea.controller.ts
│   │   ├── middleware/        # Express middleware
│   │   │   └── errorHandler.ts
│   │   ├── models/            # TypeScript interfaces
│   │   │   └── idea.model.ts
│   │   ├── routes/            # API routes
│   │   │   └── idea.routes.ts
│   │   ├── services/          # Business logic
│   │   │   └── idea.service.ts
│   │   └── index.ts           # Entry point
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                   # Next.js frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── app/           # Idea Board app page
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx     # Root layout
│   │   │   ├── page.tsx       # Landing page
│   │   │   └── globals.css    # Global styles
│   │   ├── components/        # React components
│   │   │   ├── IdeaCard.tsx
│   │   │   └── IdeaInput.tsx
│   │   └── types/             # TypeScript types
│   │       └── idea.ts
│   ├── public/                # Static assets
│   ├── Dockerfile
│   ├── next.config.ts
│   ├── package.json
│   └── tailwind.config.ts
│
├── k8s/                        # Kubernetes manifests
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── ingress.yaml
│   ├── secret-template.yaml
│   └── README.md
│
├── docker-compose.yml          # Docker Compose configuration
├── .dockerignore
└── README.md                   # This file
```

## 🔐 Environment Variables

### Backend (.env)

```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="your-private-key"
FIREBASE_CLIENT_EMAIL=your-client-email

# Alternative: Use service account file
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
```

### Frontend (.env.local)

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🤔 Trade-offs & Design Decisions

### 1. Polling vs WebSockets
**Decision**: Implemented polling (5-second intervals)

**Rationale**:
- Simpler implementation and deployment
- Lower server resource usage for small-to-medium traffic
- Easier to scale horizontally
- No need for sticky sessions or WebSocket-aware load balancers

**Trade-off**: Slight delay in updates vs true real-time

### 2. Anonymous Users
**Decision**: No authentication required

**Rationale**:
- Reduces friction for user engagement
- Faster time-to-value
- Simpler architecture

**Trade-off**: No user tracking, potential for abuse (mitigated by rate limiting)

### 3. Firestore vs Traditional Database
**Decision**: Used Firestore

**Rationale**:
- Serverless, no database management overhead
- Built-in scalability
- Real-time capabilities if needed in future
- Easy to set up and deploy

**Trade-off**: Vendor lock-in, potential cost at scale

### 4. Monorepo Structure
**Decision**: Separate frontend and backend directories

**Rationale**:
- Clear separation of concerns
- Independent deployment capabilities
- Easier to containerize separately

**Trade-off**: Some code duplication (types/interfaces)

### 5. Character Limit (280)
**Decision**: Twitter-style 280 character limit

**Rationale**:
- Encourages concise, focused ideas
- Better UX for scanning multiple ideas
- Reduces storage and bandwidth

### 6. Upvote System
**Decision**: Unlimited upvotes per user (no tracking)

**Rationale**:
- Consistent with anonymous design
- Simpler implementation
- Firestore transactions ensure atomic increments

**Trade-off**: Users can upvote multiple times (acceptable for this use case)

## 🧪 Testing

```bash
# Backend tests (when implemented)
cd backend
npm test

# Frontend tests (when implemented)
cd frontend
npm test
```

## 🔧 Troubleshooting

### Docker Issues

**Problem**: Port already in use
```bash
# Find and kill process using the port
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

**Problem**: Firebase connection errors
- Verify your Firebase credentials are correct
- Ensure Firestore is enabled in your Firebase project
- Check that the private key includes `\n` for line breaks

### Development Issues

**Problem**: Module not found errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Problem**: TypeScript errors
```bash
# Rebuild TypeScript
npm run build
```

## 📝 License

This project is created as part of a technical assessment.

## 👨‍💻 Author

Built with passion and purpose for a Senior Full-Stack Developer assessment.

---

**Ready to share your ideas?** Run `docker-compose up` and visit http://localhost:3000 🚀
