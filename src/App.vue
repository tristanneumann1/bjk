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
<!--  <PlayingCard value="A" suit="spades" large />-->
<!--  <PlayingCard value="2" suit="spades" large />-->
<!--  <PlayingCard value="3" suit="spades" large />-->
<!--  <PlayingCard value="4" suit="spades" large />-->
<!--  <PlayingCard value="5" suit="spades" large />-->
<!--  <PlayingCard value="6" suit="spades" large />-->
<!--  <PlayingCard value="7" suit="spades" large />-->
<!--  <PlayingCard value="8" suit="spades" large />-->
<!--  <PlayingCard value="9" suit="spades" large />-->
<!--  <PlayingCard value="10" suit="spades" large />-->
<!--  <PlayingCard value="J" suit="spades" large />-->
<!--  <PlayingCard value="Q" suit="spades" large />-->
<!--  <PlayingCard value="K" suit="spades" large />-->

  <PlayingCard value="A" suit="hearts" />
  <PlayingCard value="2" suit="hearts" />
  <PlayingCard value="3" suit="hearts" />
  <PlayingCard value="4" suit="hearts" />
  <PlayingCard value="5" suit="hearts" />
  <PlayingCard value="6" suit="hearts" />
  <PlayingCard value="7" suit="hearts" />
  <PlayingCard value="8" suit="hearts" />
  <PlayingCard value="9" suit="hearts" />
  <PlayingCard value="10" suit="hearts" />
  <PlayingCard value="J" suit="hearts" />
  <PlayingCard value="Q" suit="hearts" />
  <PlayingCard value="K" suit="hearts" />

<!--  <PlayingCard value="A" suit="diamonds" />-->
<!--  <PlayingCard value="2" suit="diamonds" />-->
<!--  <PlayingCard value="3" suit="diamonds" />-->
<!--  <PlayingCard value="4" suit="diamonds" />-->
<!--  <PlayingCard value="5" suit="diamonds" />-->
<!--  <PlayingCard value="6" suit="diamonds" />-->
<!--  <PlayingCard value="7" suit="diamonds" />-->
<!--  <PlayingCard value="8" suit="diamonds" />-->
<!--  <PlayingCard value="9" suit="diamonds" />-->
<!--  <PlayingCard value="10" suit="diamonds" />-->
<!--  <PlayingCard value="J" suit="diamonds" />-->
<!--  <PlayingCard value="Q" suit="diamonds" />-->
<!--  <PlayingCard value="K" suit="diamonds" />-->

<!--  <PlayingCard value="A" suit="clubs" />-->
<!--  <PlayingCard value="2" suit="clubs" />-->
<!--  <PlayingCard value="3" suit="clubs" />-->
<!--  <PlayingCard value="4" suit="clubs" />-->
<!--  <PlayingCard value="5" suit="clubs" />-->
<!--  <PlayingCard value="6" suit="clubs" />-->
<!--  <PlayingCard value="7" suit="clubs" />-->
<!--  <PlayingCard value="8" suit="clubs" />-->
<!--  <PlayingCard value="9" suit="clubs" />-->
<!--  <PlayingCard value="10" suit="clubs" />-->
<!--  <PlayingCard value="J" suit="clubs" />-->
<!--  <PlayingCard value="Q" suit="clubs" />-->
<!--  <PlayingCard value="K" suit="clubs" />-->
  <PlayingCard :faceUp="false" />

  <CardHand :cards="[
    { value: 'A', suit: 'spades' },
    { value: '2', suit: 'spades' },
    { value: '3', suit: 'spades' },
    { value: '4', suit: 'spades' },
    { value: '5', suit: 'spades' },
    { value: '6', suit: 'spades' },
    { value: '7', suit: 'spades' },
    { value: '8', suit: 'spades' },
    { value: '9', suit: 'spades' },
    { value: '10', suit: 'spades' },
    // { value: 'J', suit: 'spades' },
    // { value: 'Q', suit: 'spades' },
    // { value: 'K', suit: 'spades' }

  ]" large />
</template>

<style scoped></style>
