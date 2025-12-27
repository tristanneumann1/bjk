<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { sendSignInLinkToEmail, getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { actionCodeSettings } from '@/lib/firebase.ts'
import { LOCAL_KEY_EMAIL } from '@/constants.ts'

const email = ref(window.localStorage.getItem(LOCAL_KEY_EMAIL) ?? '')
const isSubmitting = ref(false)
const statusMessage = ref('')
const errorMessage = ref('')
const currentUser = ref<ReturnType<typeof getAuth>['currentUser']>(null)

const auth = getAuth()

onMounted(() => {
  onAuthStateChanged(auth, user => {
    currentUser.value = user
  })
})

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
    <form v-if="!currentUser" class="auth-form" @submit.prevent="passwordlessSignIn">
      <label for="email-input" class="auth-form__label">Email</label>
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
        {{ isSubmitting ? 'Sending...' : 'Send Sign-In Link' }}
      </button>
    </form>

    <div v-else class="auth-current">
      <p class="auth-current__text">Signed in as: <strong>{{ currentUser?.email }}</strong></p>
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

.auth-current__id code {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
}
</style>
