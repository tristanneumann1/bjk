import type {Timestamp} from "firebase/firestore";

export type BaseDoc = {
  createdAt?: Timestamp
  updatedAt?: Timestamp
}
