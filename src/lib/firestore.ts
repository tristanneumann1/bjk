// This doc is a model agnostic client for firestore db, model specific logic exists in the docs/ directory

import { doc, getDoc, getDocs, getFirestore, serverTimestamp, setDoc, collection } from 'firebase/firestore'
import { fbApp } from '@/lib/firebase.ts'
import {PLAYER_COLLECTION, playerDocId} from "@/docs/player.ts";

export const firestore = getFirestore(fbApp)

export const getFbDoc = async <T>(collectionId: string, address: string[]): Promise<T | null> => {
  const fbDoc = doc(firestore, collectionId, ...address)
  const snap = await getDoc(fbDoc)
  return snap.exists() ? (snap.data() as T) : null
}

export const getPlayerDoc = async <T>(playerUid: string, address: string[]): Promise<T | null> => {
  return getFbDoc(PLAYER_COLLECTION, [playerDocId(playerUid), ...address])
}

export const getFbDocs = async <T>(collectionId: string, address: string[]): Promise<(T | null)[]> => {
  const querySnapshot = await getDocs(collection(firestore, collectionId, ...address));

  return querySnapshot.docs.map(doc => {
    return doc.exists() ? (doc.data() as T) : null
  })
}

export const getPlayerDocs = async<T>(playerUid: string, address: string[]): Promise<(T | null)[]> => {
    return getFbDocs(PLAYER_COLLECTION, [playerDocId(playerUid), ...address])
}

export const upsertFbDoc = async <T>(collectionId: string, address: string[], data: Partial<T>) => {
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

// TODO, refactor to use this
export const upsertPlayerDoc = async <T>(playerUid: string, address: string[], data: Partial<T>) => {
  return upsertFbDoc(PLAYER_COLLECTION, [playerDocId(playerUid), ...address], data)
}
