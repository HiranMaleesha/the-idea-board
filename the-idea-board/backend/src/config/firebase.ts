import admin from 'firebase-admin';
import dotenv from 'dotenv';
import path from 'path';

// Load .env file from backend root directory
const envPath = path.resolve(__dirname, '../../.env');
console.log('🔍 Looking for .env file at:', envPath);
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('❌ Error loading .env file:', result.error.message);
} else {
  console.log('✅ .env file loaded successfully');
  console.log('📦 Parsed variables:', result.parsed ? Object.keys(result.parsed) : 'none');
}

// Debug: Check if env vars are loaded
console.log('🔍 Debug - Environment variables loaded:');
console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID ? `✅ Set: "${process.env.FIREBASE_PROJECT_ID}"` : '❌ Missing');
console.log('FIREBASE_PRIVATE_KEY:', process.env.FIREBASE_PRIVATE_KEY ? '✅ Set (length: ' + process.env.FIREBASE_PRIVATE_KEY?.length + ')' : '❌ Missing');
console.log('FIREBASE_CLIENT_EMAIL:', process.env.FIREBASE_CLIENT_EMAIL ? `✅ Set: "${process.env.FIREBASE_CLIENT_EMAIL}"` : '❌ Missing');

// Show all env vars that start with FIREBASE
console.log('🔍 All FIREBASE_* variables:');
Object.keys(process.env).filter(key => key.startsWith('FIREBASE')).forEach(key => {
  console.log(`  ${key}: ${process.env[key]?.substring(0, 50)}...`);
});

let db: admin.firestore.Firestore;

export const initializeFirebase = () => {
  try {
    // Check if Firebase is already initialized
    if (admin.apps.length === 0) {
      // Priority 1: Try service account file (most reliable for local dev)
      const serviceAccountPath = path.resolve(__dirname, '../../serviceAccountKey.json');
      const fs = require('fs');
      
      if (fs.existsSync(serviceAccountPath)) {
        try {
          const fileContent = fs.readFileSync(serviceAccountPath, 'utf8');
          if (!fileContent || fileContent.trim().length === 0) {
            console.error('❌ serviceAccountKey.json is empty!');
            console.log('📝 Please copy your Firebase service account JSON content into this file');
            throw new Error('Empty service account file');
          }
          const serviceAccount = JSON.parse(fileContent);
          admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
          });
          console.log('✅ Firebase initialized with service account JSON file');
        } catch (parseError: any) {
          console.error('❌ Error reading serviceAccountKey.json:', parseError.message);
          console.log('📝 Make sure the file contains valid JSON from Firebase Console');
          throw parseError;
        }
      }
      // Priority 2: Use environment variables
      else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          }),
        });
        console.log('✅ Firebase initialized with environment variables');
      }
      // Priority 3: Try GOOGLE_APPLICATION_CREDENTIALS env var
      else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        const serviceAccount = require(`../../${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
        console.log('✅ Firebase initialized with GOOGLE_APPLICATION_CREDENTIALS');
      } 
      // Fallback: Use default credentials (will fail without proper setup)
      else {
        console.error('❌ No Firebase credentials found!');
        console.log('📝 Please add serviceAccountKey.json to the backend folder');
        console.log('   OR set FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, and FIREBASE_CLIENT_EMAIL in .env');
        admin.initializeApp();
        console.log('⚠️  Firebase initialized with default credentials (will likely fail)');
      }
    }

    db = admin.firestore();
    
    // Set Firestore settings
    db.settings({
      ignoreUndefinedProperties: true,
    });

    return db;
  } catch (error) {
    console.error('❌ Error initializing Firebase:', error);
    throw error;
  }
};

export const getDb = (): admin.firestore.Firestore => {
  if (!db) {
    throw new Error('Firebase not initialized. Call initializeFirebase() first.');
  }
  return db;
};
