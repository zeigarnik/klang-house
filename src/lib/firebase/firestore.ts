// src/lib/firebase/firestore.ts
import { 
  getFirestore, 
  type Firestore, 
  type DocumentData, 
  type QueryDocumentSnapshot, 
  type SnapshotOptions, 
  type WithFieldValue,
  type DocumentReference,
  type CollectionReference,
  type Query,
  Timestamp 
} from "firebase/firestore";
import { db } from "./config";

// 타입 변환기 팩토리
export const createConverter = <T extends DocumentData>() => ({
  toFirestore: (data: WithFieldValue<T>): DocumentData => data as DocumentData,
  fromFirestore: (snap: QueryDocumentSnapshot, options: SnapshotOptions): T => {
    const data = snap.data(options);
    // Timestamp -> Date 자동 변환 (필요시)
    return { id: snap.ref.id, ...data } as T;
  },
});

// 컬렉션 레퍼런스 타입 안전하게 가져오기
export function getTypedCollection<T extends DocumentData>(path: string) {
  return collection(db, path).withConverter(createConverter<T>());
}
export function getTypedDocRef<T extends DocumentData>(path: string, id: string) {
  return doc(db, path, id).withConverter(createConverter<T>());
}

// 자주 쓰는 것들 re-export
export { db, Timestamp, collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc, query, where, orderBy, limit, startAfter, onSnapshot, writeBatch, runTransaction, serverTimestamp } from "firebase/firestore";
