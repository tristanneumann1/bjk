import { doc, getDoc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore'
import { fbApp } from '@/lib/firebase.ts'

export const firestore = getFirestore(fbApp)

export const getFbDoc = async <T>(collectionId: string, address: string[]): Promise<T | null> => {
  const fbDoc = doc(firestore, collectionId, ...address)
  const snap = await getDoc(fbDoc)
  return snap.exists() ? (snap.data() as T) : null
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
