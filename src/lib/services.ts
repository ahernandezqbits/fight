import { CollectionReference, Timestamp, and, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "./firebase";

export const firebase = {
  /**
   * Soft deletes all documents
   * @param {collection} collect firestore collection
   * @returns {query} query collection
   */
  softDeletes(collect: CollectionReference, filters: any = []): any {
    return query(collect, and(...filters, where("deleted_at", "==", null)));
  },
  /**
   * Get data from firebase
   * @param {string} firestore name
   */
  async get(dbName: string, filters: any = []): Promise<any> {
    try {
      const data: any[] = []
      const querySnapshot = await getDocs(this.softDeletes(collection(db, dbName), filters));
      querySnapshot.forEach((doc) => {
        const dataDoc: any = doc.data();
        data.push({
          ...dataDoc,
          id: doc.id
        })
      });
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  /**
   * Get data from firebase
   * @param {string} firestore name
   */
  async show(dbName: string, id: string): Promise<object> {
    try {
      try {
        const newDataRef = doc(db, dbName, id);
        const docSnap = await getDoc(newDataRef);
        if (docSnap.exists()) {
          return docSnap.data();
        }
        throw new Error("Data no encontrada");
      } catch (error: any) {
        throw new Error(error);
      }
    } catch (error: any) {
      throw new Error(error);
    }
  },
  /**
   * Post data from firebase
   * @param {string} dbName name
   * @param {object} data data to send
   */
  async post(dbName: string, data: object): Promise<void> {
    try {
      const newDataRef = doc(collection(db, dbName));
      await setDoc(newDataRef, {
        ...data,
        created_at: Timestamp.now(),
        deleted_at: null
      });
    } catch (error: any) {
      throw new Error(error);
    }
  },
  /**
   * Update data from firebase
   * @param {string} firestore name
   * @param {string} id data to be will update
   * @param {object} data data updated
   */
  async update(dbName: string, id: string, data: object): Promise<any> {
    try {
      const newDataRef = doc(db, dbName, id);
      const docSnap = await getDoc(newDataRef);
      if (docSnap.exists()) {
        await updateDoc(newDataRef, data);
        return docSnap.data();
      }
      throw new Error("Data no encontrada");
    } catch (error: any) {
      throw new Error(error);
    }
  },
  /**
   * Delete data from firebase
   * @param {string} firestore name
   * @param {string} firestore data deleted
   */
  async delete(dbName: string, id: string): Promise<any> {
    try {
      const newDataRef = doc(db, dbName, id);
      const docSnap = await getDoc(newDataRef);
      if (docSnap.exists()) {
        await updateDoc(newDataRef, {
          ...docSnap.data(),
          deleted_at: Timestamp.now(),
        });
        return docSnap.data();
      }
      throw new Error("Data no encontrada");
    } catch (error: any) {
      throw new Error(error);
    }
  }
}