/**
 * BankrollChart — renders a line chart of balance over completed games.
 *
 * Layer: Component
 * Props: data — array of { balance (cents), date } entries in chronological order
 * Dependencies: vue-chartjs, chart.js, COLORS constant
 */

<template>
  <div class="bankroll-chart">
    <p v-if="data.length === 0" class="bankroll-chart__empty">No completed games yet.</p>
    <div v-else class="bankroll-chart__wrapper">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  type TooltipItem,
} from 'chart.js'
import { COLORS } from '@/constants/colors'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)

const props = defineProps<{
  data: { balance: number; date: Date }[]
}>()

// WHY: values are stored in cents in Firebase; divide by 100 for dollar display
const toDollars = (cents: number) => cents / 100

const chartData = computed(() => ({
  datasets: [
    {
      // WHY: linear x-axis uses {x, y} points so the axis has a true origin at 0
      // while the first game still plots at x = 1
      data: props.data.map((d, i) => ({ x: i + 1, y: toDollars(d.balance) })),
      borderColor: COLORS.primary400,
      backgroundColor: 'rgba(50, 130, 160, 0.15)',
      fill: true,
      tension: 0.3,
      pointRadius: props.data.length <= 20 ? 3 : 0,
      pointHoverRadius: 4,
    },
  ],
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx: TooltipItem<'line'>) => `$${(ctx.parsed.y ?? 0).toFixed(2)}`,
      },
    },
  },
  scales: {
    x: {
      type: 'linear' as const,
      min: 0,
      ticks: {
        color: 'rgba(255,255,255,0.7)',
        stepSize: 10,
      },
      grid: {
        color: 'rgba(255,255,255,0.1)',
      },
      title: {
        display: true,
        text: 'Last 100 Games',
        color: 'rgba(255,255,255,0.5)',
        font: { size: 11 },
      },
    },
    y: {
      ticks: {
        color: 'rgba(255,255,255,0.7)',
        callback: (value: number | string) => `$${Number(value).toFixed(0)}`,
      },
      grid: {
        color: 'rgba(255,255,255,0.1)',
      },
    },
  },
}))
</script>

<style scoped>
.bankroll-chart {
  display: flex;
  flex-direction: column;
}

.bankroll-chart__wrapper {
  /* WHY: chart.js requires a positioned parent with explicit height for responsive sizing */
  position: relative;
  min-height: 200px;
}

.bankroll-chart__empty {
  margin: 0;
  font-size: 0.875rem;
  opacity: 0.6;
  text-align: center;
  padding: 2rem 0;
}
</style>
