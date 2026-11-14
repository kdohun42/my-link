import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyA8MHJadjaIwwCkWoivjCizhjcVxzHcW4I",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "my-link-73641.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "my-link-73641",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "my-link-73641.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "270887713225",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:270887713225:web:de268f81aa2bd1a1cc5018",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-PHR9RGSGBW"
};

// Initialize Firebase (prevent multiple initializations during Next.js HMR)
const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase services
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

// Analytics only runs in browser environments
let analytics: Analytics | null = null;
export const initAnalytics = async (): Promise<Analytics | null> => {
  if (typeof window !== "undefined") {
    const supported = await isSupported();
    if (supported) {
      analytics = getAnalytics(app);
      return analytics;
    }
  }
  return null;
};

export { app, auth, db, storage, analytics };
export default app;
