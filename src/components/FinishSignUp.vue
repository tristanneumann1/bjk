<template>
  <main class="finish-shell">
    <h1>Completing Sign In…</h1>
    <p id="status-message" class="finish-shell__status">{{ statusMessage }}</p>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAuth, isSignInWithEmailLink, signInWithEmailLink, getAdditionalUserInfo, type UserCredential } from 'firebase/auth'
import '@/lib/firebase.ts'
import { LOCAL_KEY_EMAIL } from '@/constants.ts'

const statusMessage = ref('Checking link…')
const pendingLink = ref('')

const completeSignIn = async () => {
  const auth = getAuth()
  const email = (window.localStorage.getItem(LOCAL_KEY_EMAIL) || '').trim()
  if (!email) {
    statusMessage.value = 'Failed to finish signing in. Please request a new link and try again.'
    return
  }

  try {
    statusMessage.value = 'Verifying sign-in link…'
    const result: UserCredential = await signInWithEmailLink(auth, email, pendingLink.value || window.location.href)
    window.localStorage.removeItem(LOCAL_KEY_EMAIL)
    const info = getAdditionalUserInfo(result)
    console.log('Firebase sign-in complete', {
      user: result.user,
      providerId: info?.providerId,
      isNewUser: info?.isNewUser,
      profile: info?.profile,
    })
    statusMessage.value = `Welcome back${info?.profile ? ', profile info logged in console.' : '!'} Signed in as ${result.user.email ?? email}.`
  } catch (error) {
    console.error('Failed to finish email link sign-in', error)
    statusMessage.value = 'Failed to finish signing in. Please request a new link and try again.'
  }
}

onMounted(() => {
  const auth = getAuth()
  const currentUrl = window.location.href
  pendingLink.value = currentUrl

  if (!isSignInWithEmailLink(auth, currentUrl)) {
    statusMessage.value = 'Invalid or expired sign-in link. Request a new one from the app.'
    return
  }

  const storedEmail = window.localStorage.getItem(LOCAL_KEY_EMAIL)
  if (storedEmail) {
    completeSignIn()
    return
  }
})
</script>

<style scoped>
.finish-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
  color: #f5f5f5;
  background: linear-gradient(135deg, #041b0b, #0b3d1b);
}

.finish-shell__status {
  max-width: 420px;
  margin: 1rem auto 0;
  line-height: 1.4;
}

.finish-shell__status {
  font-weight: 600;
}

</style>
