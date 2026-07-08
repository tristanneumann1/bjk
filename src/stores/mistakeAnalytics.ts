/**
 * Mistake analytics store.
 *
 * Default view reads ONE cumulative summary doc (Players/{uid}/Analytics/
 * mistakeSummary) — total, family roll-up, and the hard-totals heatmap. Individual
 * example hands are fetched lazily and paginated from the Mistakes subcollection
 * only when the user drills into a heatmap cell or a family tag.
 *
 * Layer: Store
 * Dependencies: firestore.ts, docs/analytics.ts, lib/mitt
 * Events consumed: usr_evt_gameEnd
 */
import { defineStore } from 'pinia'
import { computed, onScopeDispose, ref } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { where } from 'firebase/firestore'
import { getPlayerDoc, getPlayerDocsPage } from '@/lib/firestore'
import {
  ANALYTICS_SUBCOLLECTION,
  MISTAKE_SUMMARY_DOC_ID,
  MISTAKES_SUBCOLLECTION,
  type MistakeSummaryDoc,
} from '@/docs/analytics'
import type {
  FamilyCount,
  MistakeExampleFilter,
  MistakeFamily,
  StoredMistake,
} from '@/types/analytics'
import { modelEvents, userEvent } from '@/lib/mitt'
import * as userEvents from '@/lib/userEvents'

const EXAMPLES_PAGE_SIZE = 10

const filterToWheres = (filter: MistakeExampleFilter) =>
  filter.type === 'cell'
    ? [where('cellKey', '==', `${filter.total}_${filter.upcard}`)]
    : [where('families', 'array-contains', filter.family)]

const sameFilter = (a: MistakeExampleFilter | null, b: MistakeExampleFilter | null): boolean => {
  if (!a || !b || a.type !== b.type) return false
  if (a.type === 'cell' && b.type === 'cell') return a.total === b.total && a.upcard === b.upcard
  if (a.type === 'family' && b.type === 'family') return a.family === b.family
  return false
}

export const useMistakeAnalyticsStore = defineStore('mistakeAnalytics', () => {
  const auth = getAuth()
  const userId = ref<string | null>(auth.currentUser?.uid ?? null)

  // Summary (default view)
  const total = ref(0)
  const familyRollup = ref<FamilyCount[]>([])
  const hardCells = ref<Record<string, number>>({})
  const isLoading = ref(false)

  // Drill-down (lazy)
  const activeFilter = ref<MistakeExampleFilter | null>(null)
  const examples = ref<StoredMistake[]>([])
  const examplesHasMore = ref(false)
  const isLoadingExamples = ref(false)
  const lastExampleId = ref<string | null>(null)

  const hasUser = computed(() => Boolean(userId.value))
  const maxCell = computed(() => {
    const values = Object.values(hardCells.value)
    return values.length ? Math.max(...values) : 0
  })

  const resetSummary = () => {
    total.value = 0
    familyRollup.value = []
    hardCells.value = {}
  }

  const closeExamples = () => {
    activeFilter.value = null
    examples.value = []
    examplesHasMore.value = false
    lastExampleId.value = null
  }

  const fetchSummary = async () => {
    if (!userId.value) {
      resetSummary()
      return
    }
    isLoading.value = true
    try {
      const doc = await getPlayerDoc<MistakeSummaryDoc>(userId.value, [
        ANALYTICS_SUBCOLLECTION,
        MISTAKE_SUMMARY_DOC_ID,
      ])
      total.value = doc?.total ?? 0
      hardCells.value = doc?.hardCells ?? {}
      familyRollup.value = Object.entries(doc?.byFamily ?? {})
        .map(([family, count]) => ({ family: family as MistakeFamily, count: count ?? 0 }))
        .sort((a, b) => b.count - a.count)
    } catch (error) {
      console.error('Failed to fetch mistake summary', error)
      resetSummary()
    } finally {
      isLoading.value = false
    }
  }

  const loadExamplesPage = async () => {
    if (!userId.value || !activeFilter.value) return
    isLoadingExamples.value = true
    try {
      const page = await getPlayerDocsPage<StoredMistake>(userId.value, [MISTAKES_SUBCOLLECTION], {
        wheres: filterToWheres(activeFilter.value),
        pageSize: EXAMPLES_PAGE_SIZE,
        startAfterId: lastExampleId.value ?? undefined,
      })
      examples.value = [...examples.value, ...page.items]
      examplesHasMore.value = page.hasMore
      lastExampleId.value = page.lastId
    } catch (error) {
      console.error('Failed to fetch mistake examples', error)
    } finally {
      isLoadingExamples.value = false
    }
  }

  /** Open (or toggle off) the drill-down for a cell/family and load its first page. */
  const showExamples = async (filter: MistakeExampleFilter) => {
    if (sameFilter(activeFilter.value, filter)) {
      closeExamples()
      return
    }
    activeFilter.value = filter
    examples.value = []
    examplesHasMore.value = false
    lastExampleId.value = null
    await loadExamplesPage()
  }

  const loadMoreExamples = () => loadExamplesPage()

  onAuthStateChanged(auth, user => {
    userId.value = user?.uid ?? null
    closeExamples()
    void fetchSummary()
  })

  const onGameEnd = () => { void fetchSummary() }
  modelEvents.on(userEvent(userEvents.GAME_END), onGameEnd)
  onScopeDispose(() => {
    modelEvents.off(userEvent(userEvents.GAME_END), onGameEnd)
  })

  void fetchSummary()

  return {
    // summary
    total,
    familyRollup,
    hardCells,
    maxCell,
    isLoading,
    hasUser,
    fetchSummary,
    // drill-down
    activeFilter,
    examples,
    examplesHasMore,
    isLoadingExamples,
    showExamples,
    loadMoreExamples,
    closeExamples,
  }
})
