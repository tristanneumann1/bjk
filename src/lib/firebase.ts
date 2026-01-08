import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {FIREBASE_CONFIG} from "@/constants.ts";

const PORT = 8080
const fbApp = initializeApp(FIREBASE_CONFIG);
const analytics = getAnalytics(fbApp);

const appEnv = import.meta.env.VITE_APP_ENV;

const actionCodeSettings = {
  url: appEnv === 'local' ? `http://localhost:${PORT}/bjk/finishSignUp`: 'https://tristanneumann1.github.io/bjk/finishSignUp',
  handleCodeInApp: true,
  // The domain must be configured in Firebase Hosting and owned by the project.
  // linkDomain: 'www.github.io'
};

export { fbApp, analytics, actionCodeSettings };
