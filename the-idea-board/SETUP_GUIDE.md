# Quick Setup Guide

## Step 1: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or select existing one
3. Enable **Firestore Database** (Cloud Firestore)
4. Go to **Project Settings** → **Service Accounts**
5. Click **"Generate New Private Key"**
6. Save the JSON file

## Step 2: Backend Configuration

Create a `.env` file in the `backend` folder:

```bash
PORT=5000
NODE_ENV=development

# Copy these values from your Firebase service account JSON:
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
```

**Important Notes:**
- Keep the quotes around `FIREBASE_PRIVATE_KEY`
- Preserve the `\n` characters in the private key
- Never commit this file to version control

## Step 3: Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

## Step 4: Run the Application

### Option A: Using Docker (Recommended)

```bash
# From the root directory
docker-compose up --build
```

Access at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

### Option B: Local Development

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## Step 5: Test the Application

1. Open http://localhost:3000 in your browser
2. Click "Launch App" or "Start Sharing Ideas"
3. Post an idea (max 280 characters)
4. Upvote ideas
5. Watch for live updates every 5 seconds

## Troubleshooting

### Firebase Connection Error

If you see Firebase errors:
1. Verify your `.env` file has correct credentials
2. Ensure Firestore is enabled in Firebase Console
3. Check that the private key includes `\n` for line breaks

### Port Already in Use

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Module Not Found

```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

## Docker Compose Environment Variables

For Docker deployment, create a `.env` file in the root directory (same level as docker-compose.yml):

```bash
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
```

Then run:
```bash
docker-compose up --build
```

## Next Steps

- Read the main [README.md](./README.md) for complete documentation
- Check [k8s/README.md](./k8s/README.md) for Kubernetes deployment
- Review API documentation in the main README

---

**Need help?** Check the comprehensive README.md file for detailed information!
