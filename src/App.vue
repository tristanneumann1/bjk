<script setup lang="ts">
import PlayingCard from "@/components/PlayingCard.vue";
import CardHand from "@/components/CardHand.vue";
</script>

<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
  <PlayingCard value="A" suit="spades" :faceUp="true" />
  <PlayingCard value="2" suit="spades" :faceUp="true" />
  <PlayingCard value="3" suit="spades" :faceUp="true" />
  <PlayingCard value="4" suit="spades" :faceUp="true" />
  <PlayingCard value="5" suit="spades" :faceUp="true" />
  <PlayingCard value="6" suit="spades" :faceUp="true" />
  <PlayingCard value="7" suit="spades" :faceUp="true" />
  <PlayingCard value="8" suit="spades" :faceUp="true" />
  <PlayingCard value="9" suit="spades" :faceUp="true" />
  <PlayingCard value="10" suit="spades" :faceUp="true" />
  <PlayingCard value="J" suit="spades" :faceUp="true" />
  <PlayingCard value="Q" suit="spades" :faceUp="true" />
  <PlayingCard value="K" suit="spades" :faceUp="true" />

  <PlayingCard value="A" suit="hearts" :faceUp="true" />
  <PlayingCard value="2" suit="hearts" :faceUp="true" />
  <PlayingCard value="3" suit="hearts" :faceUp="true" />
  <PlayingCard value="4" suit="hearts" :faceUp="true" />
  <PlayingCard value="5" suit="hearts" :faceUp="true" />
  <PlayingCard value="6" suit="hearts" :faceUp="true" />
  <PlayingCard value="7" suit="hearts" :faceUp="true" />
  <PlayingCard value="8" suit="hearts" :faceUp="true" />
  <PlayingCard value="9" suit="hearts" :faceUp="true" />
  <PlayingCard value="10" suit="hearts" :faceUp="true" />
  <PlayingCard value="J" suit="hearts" :faceUp="true" />
  <PlayingCard value="Q" suit="hearts" :faceUp="true" />
  <PlayingCard value="K" suit="hearts" :faceUp="true" />

  <PlayingCard value="A" suit="diamonds" :faceUp="true" />
  <PlayingCard value="2" suit="diamonds" :faceUp="true" />
  <PlayingCard value="3" suit="diamonds" :faceUp="true" />
  <PlayingCard value="4" suit="diamonds" :faceUp="true" />
  <PlayingCard value="5" suit="diamonds" :faceUp="true" />
  <PlayingCard value="6" suit="diamonds" :faceUp="true" />
  <PlayingCard value="7" suit="diamonds" :faceUp="true" />
  <PlayingCard value="8" suit="diamonds" :faceUp="true" />
  <PlayingCard value="9" suit="diamonds" :faceUp="true" />
  <PlayingCard value="10" suit="diamonds" :faceUp="true" />
  <PlayingCard value="J" suit="diamonds" :faceUp="true" />
  <PlayingCard value="Q" suit="diamonds" :faceUp="true" />
  <PlayingCard value="K" suit="diamonds" :faceUp="true" />

  <PlayingCard value="A" suit="clubs" :faceUp="true" />
  <PlayingCard value="2" suit="clubs" :faceUp="true" />
  <PlayingCard value="3" suit="clubs" :faceUp="true" />
  <PlayingCard value="4" suit="clubs" :faceUp="true" />
  <PlayingCard value="5" suit="clubs" :faceUp="true" />
  <PlayingCard value="6" suit="clubs" :faceUp="true" />
  <PlayingCard value="7" suit="clubs" :faceUp="true" />
  <PlayingCard value="8" suit="clubs" :faceUp="true" />
  <PlayingCard value="9" suit="clubs" :faceUp="true" />
  <PlayingCard value="10" suit="clubs" :faceUp="true" />
  <PlayingCard value="J" suit="clubs" :faceUp="true" />
  <PlayingCard value="Q" suit="clubs" :faceUp="true" />
  <PlayingCard value="K" suit="clubs" :faceUp="true" />
  <PlayingCard :faceUp="false" />

  <CardHand :cards="[
    { value: 'A', suit: 'spades' },
    { value: '2', suit: 'spades' },
    { value: '3', suit: 'spades' },
    // { value: '4', suit: 'spades' },
    // { value: '5', suit: 'spades' },
    // { value: '6', suit: 'spades' },
    // { value: '7', suit: 'spades' },
    // { value: '8', suit: 'spades' },
    // { value: '9', suit: 'spades' },
    // { value: '10', suit: 'spades' },
    // { value: 'J', suit: 'spades' }
  ]" />
</template>

<style scoped></style>
