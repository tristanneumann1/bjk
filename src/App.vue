<script setup lang="ts">
import PlayingCard from "@/components/PlayingCard.vue";
import CardHand from "@/components/CardHand.vue";
import Chair from "@/components/Chair.vue";
import PlayerBalanceDisplay from "@/components/PlayerBalanceDisplay.vue";
import ActionSection from "@/components/ActionSection.vue";
import DealerSection from "@/components/DealerSection.vue";

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


  <div :style="{
    width: '100%',
    display: 'flex',
    gap: '2rem',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  }">
    <DealerSection />
    <ActionSection />
  </div>

  <div :style="{
    width: '100%',
    display: 'flex',
    gap: '2rem',
    alignItems: 'flex-end',
    justifyContent: 'center',
  }">
    <Chair :hands="[HAND_SPADES, HAND_HEARTS, HAND_KINGS, HAND_BLACKJACK, HAND_STRAIGHT]" />
    <Chair :hands="[HAND_SPADES, HAND_HEARTS, HAND_KINGS, HAND_BLACKJACK, HAND_STRAIGHT]" />
    <Chair :hands="[HAND_SPADES, HAND_HEARTS, HAND_KINGS, HAND_BLACKJACK, HAND_STRAIGHT]" />
  </div>
  <PlayerBalanceDisplay/>
</template>

<style>
body {
  margin: 0;
  background-color: #006400;
}
</style>
