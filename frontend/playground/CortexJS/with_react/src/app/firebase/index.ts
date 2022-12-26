// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { configLoader } from "./config_loader";

const config = configLoader();

// Initialize Firebase
const app = initializeApp(config);
const auth = getAuth(app);
const database = getDatabase(app);

export const FirebaseApps = {
  app: app,
  auth: auth,
  database: database,
};
