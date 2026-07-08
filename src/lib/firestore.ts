// This doc is a model agnostic client for firestore db, model specific logic exists in the docs/ directory

import { doc, getDoc, getDocs, getFirestore, serverTimestamp, setDoc, collection, query, limit, orderBy, getCountFromServer, startAfter, documentId, type QueryConstraint, type QueryFieldFilterConstraint, type OrderByDirection } from 'firebase/firestore'
import { fbApp } from '@/lib/firebase.ts'
import { PLAYER_COLLECTION, playerDocId } from "@/docs/player.ts"
import { FIREBASE_ENABLED, FIREBASE_ALLOWED_UIDS } from '@/constants.ts'

const isAllowed = (address: string[]) =>
  FIREBASE_ENABLED || FIREBASE_ALLOWED_UIDS.some(uid => address[0] === playerDocId(uid))

export interface QueryOptions {
  limit?: number,
  wheres?: Array<QueryFieldFilterConstraint>,
  orderBys?: Array<{ field: string; direction?: OrderByDirection }>,
}

const DEFAULT_LIMIT = 100

export const firestore = getFirestore(fbApp)

export const getFbDoc = async <T>(collectionId: string, address: string[]): Promise<T | null> => {
  if (!isAllowed(address)) return null
  const fbDoc = doc(firestore, collectionId, ...address)
  const snap = await getDoc(fbDoc)
  return snap.exists() ? (snap.data() as T) : null
}

export const getPlayerDoc = async <T>(playerUid: string, address: string[]): Promise<T | null> => {
  return getFbDoc(PLAYER_COLLECTION, [playerDocId(playerUid), ...address])
}

export const getFbDocs = async <T>(collectionId: string, address: string[], options: QueryOptions): Promise<(T | null)[]> => {
  if (!isAllowed(address)) return []
  const col = collection(firestore, collectionId, ...address)
  const orderByConstraints = (options.orderBys ?? []).map(o => orderBy(o.field, o.direction))
  const q = query(col, ...orderByConstraints, limit(options.limit ?? DEFAULT_LIMIT), ...(options.wheres ?? []))
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map(doc => {
    return doc.exists() ? (doc.data() as T) : null
  })
}

export const getPlayerDocs = async<T>(playerUid: string, address: string[], options: QueryOptions): Promise<(T | null)[]> => {
  return getFbDocs(PLAYER_COLLECTION, [playerDocId(playerUid), ...address], options)
}

export const countFbDocs = async (collectionId: string, address: string[], options: QueryOptions): Promise<number> => {
  if (!isAllowed(address)) return 0
  const col = collection(firestore, collectionId, ...address)
  const q = query(col, limit(options.limit ?? DEFAULT_LIMIT), ...(options.wheres ?? []))

  const snapshot = await getCountFromServer(q)
  return snapshot.data().count
}

export const countPlayerDocs = async(playerUid: string, address: string[], options: QueryOptions): Promise<number> => {
  return countFbDocs(PLAYER_COLLECTION, [playerDocId(playerUid), ...address], options)
}

export const upsertFbDoc = async <T>(collectionId: string, address: string[], data: Partial<T>) => {
  if (!isAllowed(address)) return
  const fbDoc = doc(firestore, collectionId, ...address)
  const snapshot = await getDoc(fbDoc)
  const payload: Record<string, unknown> = {
    ...data,
    updatedAt: serverTimestamp(),
  }

  if (!snapshot.exists()) {
    payload.createdAt = serverTimestamp()
  }

  return setDoc(fbDoc, payload, { merge: true })
}

export const upsertPlayerDoc = async <T>(playerUid: string, address: string[], data: Partial<T>) => {
  return upsertFbDoc(PLAYER_COLLECTION, [playerDocId(playerUid), ...address], data)
}

/**
 * Merge-write a payload that may contain Firestore FieldValues (e.g. increment()).
 * Used for atomic aggregate updates — no read, so it stays a single cheap write.
 */
export const incrementPlayerDoc = async (playerUid: string, address: string[], data: Record<string, unknown>) => {
  const fullAddress = [playerDocId(playerUid), ...address]
  if (!isAllowed(fullAddress)) return
  const fbDoc = doc(firestore, PLAYER_COLLECTION, ...fullAddress)
  return setDoc(fbDoc, { ...data, updatedAt: serverTimestamp() }, { merge: true })
}

export interface PageOptions {
  wheres?: Array<QueryFieldFilterConstraint>
  pageSize?: number
  /** Document id of the last item from the previous page (exclusive cursor). */
  startAfterId?: string
}

export interface DocPage<T> {
  items: T[]
  lastId: string | null
  hasMore: boolean
}

/**
 * Fetch a page of documents ordered by document id. Ordering by __name__ keeps
 * equality / array-contains queries servable WITHOUT a composite index, so this
 * supports paginated drill-down on a single-field filter.
 */
export const getFbDocsPage = async <T>(collectionId: string, address: string[], options: PageOptions): Promise<DocPage<T>> => {
  if (!isAllowed(address)) return { items: [], lastId: null, hasMore: false }
  const col = collection(firestore, collectionId, ...address)
  const pageSize = options.pageSize ?? 10
  const constraints: QueryConstraint[] = [...(options.wheres ?? []), orderBy(documentId())]
  if (options.startAfterId) constraints.push(startAfter(options.startAfterId))
  // WHY: fetch one extra to detect whether another page exists.
  const q = query(col, ...constraints, limit(pageSize + 1))
  const snapshot = await getDocs(q)
  const docs = snapshot.docs
  const hasMore = docs.length > pageSize
  const page = hasMore ? docs.slice(0, pageSize) : docs
  return {
    items: page.map(d => d.data() as T),
    lastId: page.length ? page[page.length - 1].id : null,
    hasMore,
  }
}

export const getPlayerDocsPage = async <T>(playerUid: string, address: string[], options: PageOptions): Promise<DocPage<T>> => {
  return getFbDocsPage<T>(PLAYER_COLLECTION, [playerDocId(playerUid), ...address], options)
}
