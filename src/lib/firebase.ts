import { getApp, getApps, initializeApp } from 'firebase/app';
import { connectDatabaseEmulator, getDatabase } from 'firebase/database';

const emulatorHost = __DEV__ ? process.env.EXPO_PUBLIC_FIREBASE_EMULATOR_HOST : undefined;

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: emulatorHost
    ? 'https://demo-iwamad-chat-default-rtdb.firebaseio.com'
    : process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: emulatorHost ? 'demo-iwamad-chat' : process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const existingApp = getApps().some((app) => app.name === 'iwamad-chat');

export const app = firebaseConfig.databaseURL
  ? (existingApp ? getApp('iwamad-chat') : initializeApp(firebaseConfig, 'iwamad-chat'))
  : null;
export const db = app ? getDatabase(app) : null;

if (db && emulatorHost && !existingApp) {
  connectDatabaseEmulator(db, emulatorHost, 9000);
}
