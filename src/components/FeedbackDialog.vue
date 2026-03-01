<script setup lang="ts">
import { ref } from 'vue'

const isOpen = defineModel<boolean>({ default: false })

const message = ref('')
const replyEmail = ref('')
const status = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')

const submit = async () => {
  if (!message.value.trim()) return

  status.value = 'submitting'
  try {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
        template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        template_params: {
          message: message.value.trim(),
          reply_to: replyEmail.value.trim() || 'anonymous',
        },
      }),
    })

    if (!res.ok) throw new Error(`EmailJS error: ${res.status}`)
    status.value = 'success'
    message.value = ''
    replyEmail.value = ''
  } catch (err) {
    console.error('Failed to send feedback', err)
    status.value = 'error'
  }
}

const close = () => {
  isOpen.value = false
  status.value = 'idle'
  message.value = ''
  replyEmail.value = ''
}
</script>

<template>
  <v-dialog v-model="isOpen" max-width="440" @after-leave="status = 'idle'">
    <v-card class="feedback-card" color="#111" rounded="lg">
      <v-card-title class="feedback-card__title">Share Feedback</v-card-title>
      <v-card-subtitle class="feedback-card__subtitle">
        The site is a work in progress — feature ideas and bug reports are very welcome. Send a message
        below or reach out directly at
        <a href="mailto:support@blackjackstrategytrainer.com" class="feedback-card__email">
          support@blackjackstrategytrainer.com
        </a>.
      </v-card-subtitle>

      <v-card-text v-if="status !== 'success'" class="feedback-card__body">
        <v-textarea
          v-model="message"
          placeholder="What's on your mind?"
          rows="4"
          variant="outlined"
          hide-details
          autofocus
          :disabled="status === 'submitting'"
        />
        <v-text-field
          v-model="replyEmail"
          placeholder="Email (optional, if you want a reply)"
          type="email"
          variant="outlined"
          hide-details
          density="compact"
          :disabled="status === 'submitting'"
        />
      </v-card-text>

      <v-card-text v-else class="feedback-card__success">
        <p>Thanks — got it!</p>
      </v-card-text>

      <v-card-actions class="feedback-card__actions">
        <v-btn variant="text" @click="close">{{ status === 'success' ? 'Close' : 'Cancel' }}</v-btn>
        <v-btn
          v-if="status !== 'success'"
          color="success"
          variant="flat"
          :loading="status === 'submitting'"
          :disabled="!message.trim()"
          @click="submit"
        >
          Send
        </v-btn>
      </v-card-actions>

      <p v-if="status === 'error'" class="feedback-card__error">
        Something went wrong. Please try again.
      </p>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.feedback-card {
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #fff;
}

.feedback-card__title {
  padding-top: 1.25rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.feedback-card__subtitle {
  font-size: 0.85rem;
  opacity: 0.65;
  padding-bottom: 0;
  white-space: normal;
  -webkit-line-clamp: unset;
}

.feedback-card__email {
  color: #a5d6a7;
  word-break: break-all;
}

.feedback-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 1rem;
}

.feedback-card__success {
  padding-top: 1.5rem;
  font-size: 1rem;
  text-align: center;
  color: #a5d6a7;
}

.feedback-card__success p {
  margin: 0;
}

.feedback-card__actions {
  padding: 0.75rem 1rem 1rem;
  justify-content: flex-end;
  gap: 0.5rem;
}

.feedback-card__error {
  margin: 0 1rem 1rem;
  font-size: 0.8rem;
  color: #fecaca;
  text-align: center;
}
</style>
