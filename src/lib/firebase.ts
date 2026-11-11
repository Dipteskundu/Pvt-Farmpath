import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  type Auth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * Firebase initializes only when an API key is present. Local dev and CI run
 * `next build` without the NEXT_PUBLIC_FIREBASE_* vars, and `getAuth` throws
 * `auth/invalid-api-key` during static export when the key is missing — which
 * aborts the whole build. With no key, `auth` is null: email/password login
 * (which goes through the Node backend) still works everywhere; only the two
 * social popups are unavailable until the vars are set (they always are in
 * Vercel, where the real config lives).
 */
const app: FirebaseApp | null = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  ? initializeApp(firebaseConfig)
  : null;

export const auth: Auth | null = app ? getAuth(app) : null;
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
