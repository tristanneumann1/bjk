<template>
  <section class="true-count-guess" aria-label="Guess the final true count">
    <h2>Guess the Final True Count</h2>
    <p>Since the counter is hidden, enter your best estimate before seeing the results.</p>
    <form class="true-count-guess__form" @submit.prevent="submitGuess">
      <v-text-field
        v-model="guessInput"
        label="Final true count"
        type="number"
        variant="outlined"
        hide-details="auto"
        density="compact"
        autocomplete="off"
        autofocus
      />
      <v-btn type="submit" color="primary" variant="flat">Reveal stats</v-btn>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{ submit: [guess: number | null] }>()

const guessInput = ref('')

const submitGuess = () => {
  const value = guessInput.value.trim()
  const numeric = value === '' ? null : Number(value)
  emit('submit', Number.isFinite(numeric ?? NaN) ? numeric : null)
}
</script>

<style scoped>
.true-count-guess {
  width: 100%;
  max-width: 640px;
  background: rgba(0, 0, 0, 0.55);
  border-radius: 1rem;
  padding: 1.25rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: left;
}

.true-count-guess h2 {
  margin: 0;
}

.true-count-guess p {
  margin: 0;
  opacity: 0.85;
}

.true-count-guess__form {
  display: flex;
  gap: 0.75rem;
  align-items: flex-end;
}

@media (max-width: 520px) {
  .true-count-guess__form {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
