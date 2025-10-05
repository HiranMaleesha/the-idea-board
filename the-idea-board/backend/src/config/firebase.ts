import admin from 'firebase-admin';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

let db: admin.firestore.Firestore;

export const initializeFirebase = () => {
  try {
    if (admin.apps.length === 0) {
      // Try environment variables first
      if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          }),
        });
      }
      // Fall back to service account file
      else {
        const serviceAccountPath = path.resolve(__dirname, '../../serviceAccountKey.json');
        const fs = require('fs');
        
        if (fs.existsSync(serviceAccountPath)) {
          const serviceAccount = require(serviceAccountPath);
          admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
          });
        }
        else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
          const serviceAccount = require(`../../${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);
          admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
          });
        } 
        else {
          throw new Error('No Firebase credentials found. Please set environment variables or add serviceAccountKey.json');
        }
      }
    }

    db = admin.firestore();
    db.settings({ ignoreUndefinedProperties: true });

    return db;
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    throw error;
  }
};

export const getDb = (): admin.firestore.Firestore => {
  if (!db) {
    throw new Error('Firebase not initialized. Call initializeFirebase() first.');
  }
  return db;
};
