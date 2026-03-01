<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  sendSignInLinkToEmail,
  getAuth,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { actionCodeSettings } from '@/lib/firebase.ts'
import { LOCAL_KEY_EMAIL, FIREBASE_ENABLED } from '@/constants.ts'

const email = ref(window.localStorage.getItem(LOCAL_KEY_EMAIL) ?? '')
const isSubmitting = ref(false)
const isGoogleSubmitting = ref(false)
const statusMessage = ref('')
const errorMessage = ref('')
const currentUser = ref<ReturnType<typeof getAuth>['currentUser']>(null)

const auth = getAuth()

onMounted(() => {
  onAuthStateChanged(auth, user => {
    currentUser.value = user
  })
})

const googleSignIn = async () => {
  errorMessage.value = ''
  statusMessage.value = ''
  isGoogleSubmitting.value = true
  try {
    await signInWithPopup(auth, new GoogleAuthProvider())
  } catch (error) {
    console.error('Google sign-in failed', error)
    errorMessage.value = 'Google sign-in failed. Please try again.'
  } finally {
    isGoogleSubmitting.value = false
  }
}

const passwordlessSignIn = async () => {
  errorMessage.value = ''
  statusMessage.value = ''

  const trimmedEmail = email.value.trim()
  if (!trimmedEmail) {
    errorMessage.value = 'Enter an email to continue.'
    return
  }

  isSubmitting.value = true
  try {
    await sendSignInLinkToEmail(auth, trimmedEmail, actionCodeSettings)
    window.localStorage.setItem(LOCAL_KEY_EMAIL, trimmedEmail)
    statusMessage.value = `Sign-in link sent to ${trimmedEmail}`
  } catch (error) {
    console.error('Error sending sign-in link:', error)
    errorMessage.value = 'Unable to send link. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

const handleSignOut = async () => {
  try {
    await signOut(auth)
    statusMessage.value = 'Signed out.'
  } catch (error) {
    console.error('Failed to sign out', error)
    errorMessage.value = 'Unable to sign out. Please retry.'
  }
}
</script>

<template>
  <section class="auth-shell">
    <p v-if="!FIREBASE_ENABLED" class="auth-form__status">Accounts are temporarily unavailable.</p>

    <template v-else-if="!currentUser">
      <button
        class="auth-form__google"
        type="button"
        :disabled="isGoogleSubmitting"
        @click="googleSignIn"
      >
        <svg class="auth-form__google-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        {{ isGoogleSubmitting ? 'Signing in…' : 'Sign in with Google' }}
      </button>

      <div class="auth-form__divider">
        <span>or</span>
      </div>

      <form class="auth-form" @submit.prevent="passwordlessSignIn">
        <label for="email-input" class="auth-form__label">Email link</label>
        <input
          v-model="email"
          type="email"
          id="email-input"
          class="auth-form__input"
          placeholder="you@example.com"
          autocomplete="email"
          required
        />
        <button class="auth-form__submit" type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Sending…' : 'Send Sign-In Link' }}
        </button>
      </form>
    </template>

    <div v-else-if="currentUser" class="auth-current">
      <p class="auth-current__text">Signed in as: <strong>{{ currentUser.email }}</strong></p>
      <button class="auth-form__submit" type="button" @click="handleSignOut">Log Out</button>
    </div>

    <p v-if="statusMessage" class="auth-form__status">{{ statusMessage }}</p>
    <p v-if="errorMessage" class="auth-form__error">{{ errorMessage }}</p>
  </section>
</template>

<style scoped>
.auth-shell {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  max-width: 320px;
  color: #fff;
}

.auth-form__google {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: #fff;
  color: #3c4043;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.15s ease;
}

.auth-form__google:hover {
  background: #f5f5f5;
}

.auth-form__google:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-form__google-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.auth-form__divider {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.8rem;
}

.auth-form__divider::before,
.auth-form__divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.15);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.45);
  border-radius: 0.75rem;
  color: inherit;
}

.auth-form__label {
  font-size: 0.9rem;
  opacity: 0.8;
}

.auth-form__input {
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: inherit;
}

.auth-form__submit {
  padding: 0.8rem;
  border-radius: 0.5rem;
  border: none;
  background: linear-gradient(135deg, rgba(67, 160, 71, 0.95), rgba(56, 142, 60, 0.85));
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}

.auth-form__submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-form__status {
  margin: 0;
  font-size: 0.85rem;
  color: #bdfcc9;
}

.auth-form__error {
  margin: 0;
  font-size: 0.85rem;
  color: #fecaca;
}

.auth-current {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.45);
  border-radius: 0.75rem;
}

.auth-current__text {
  margin: 0;
  font-size: 0.95rem;
}
</style>
