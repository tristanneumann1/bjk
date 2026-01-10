import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { FIREBASE_CONFIG } from '@/constants.ts'

const PORT = 8080
const fbApp = initializeApp(FIREBASE_CONFIG)
const analytics = getAnalytics(fbApp)

const fallbackDomain = (import.meta.env.VITE_APP_DOMAIN as string | undefined)?.replace(/\/$/, '')
const finishSignUpPath = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/finishSignUp`

const resolveOrigin = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  if (fallbackDomain) {
    return fallbackDomain
  }
  return `http://localhost:${PORT}`
}

const actionCodeSettings = {
  url: `${resolveOrigin()}${finishSignUpPath}`,
  handleCodeInApp: true,
}

export { fbApp, analytics, actionCodeSettings }
