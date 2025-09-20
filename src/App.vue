<script setup lang="ts">
import PlayingCard from "@/components/PlayingCard.vue";
import CardHand from "@/components/CardHand.vue";
import Hand from "@/components/Hand.vue";

const HAND_SPADES = [{ value: 'A', suit: 'spades' },
    { value: '2', suit: 'spades' },
    { value: '3', suit: 'spades' },
    { value: '4', suit: 'spades' },
    { value: '5', suit: 'spades' },
    { value: '6', suit: 'spades' },
    { value: '7', suit: 'spades' },
    { value: '8', suit: 'spades' },
    { value: '9', suit: 'spades' },
    { value: '10', suit: 'spades' }]

const HAND_HEARTS = [{ value: 'A', suit: 'hearts' },
    { value: '2', suit: 'hearts' },
    { value: '3', suit: 'hearts' },
    { value: '4', suit: 'hearts' },
    { value: '5', suit: 'hearts' },
    { value: '6', suit: 'hearts' },
    { value: '7', suit: 'hearts' },
    { value: '8', suit: 'hearts' },
    { value: '9', suit: 'hearts' },
    { value: '10', suit: 'hearts' }]


const HAND_KINGS = [{ value: 'K', suit: 'hearts' },
    { value: 'K', suit: 'spades' },
  { value: 'K', suit: 'clubs' },
  { value: 'K', suit: 'diamonds' },]

const HAND_BLACKJACK = [{ value: 'K', suit: 'hearts' },
    { value: 'A', suit: 'spades' }]

const HAND_STRAIGHT = [
    { value: '3', suit: 'hearts' },
    { value: '4', suit: 'diamonds' },
    { value: '5', suit: 'hearts' },
    { value: '6', suit: 'clubs' },
    { value: '7', suit: 'hearts' }]
</script>

<template>
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

  ]"/>
  <br>
  <br>
  <br>
  <br>
  <Hand :hands="[HAND_SPADES, HAND_HEARTS, HAND_KINGS, HAND_BLACKJACK, HAND_STRAIGHT]" />

</template>

<style scoped></style>
