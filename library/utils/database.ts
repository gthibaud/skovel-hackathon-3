// import { db } from "../lib/firebase";

/**
 * Subscribe to real-time update of a document
 * @param collection Collection path
 * @param docId Document identifier
 * @param onUpdate On snapshot update, call this function
 * @returns Unsubscribe function
 */
// export const subscribeToDoc = async (
//     collection: string,
//     docId: string,
//     onUpdate: (document: DocumentData | undefined) => void,
// ): Promise<Unsubscribe> => {
//     throw new Error('Not implemented');
//     // return onSnapshot(doc(db, collection, docId), (doc) => onUpdate({
//     //     ...doc.data(),
//     //     id: doc.id
//     // }))
// };

// export const getCollection = async (collectionId: string, ...filters: QueryConstraint[]): Promise<any> => {
//     throw new Error('Not implemented');

// let q = null;

// // If there are some filters, we need to create a query
// if (filters && filters.length === 0) {
//     q = collection(db, collectionId);
// } else {
//     q = query(
//         collection(db, collectionId),
//         ...filters || []
//     );
// }

// const docs = await getDocs(q);
// const res: any[] = [];
// // Attention, il faut bien mettre le champ id après le reste des champs pour l'override au cas où il existe dans le doc
// docs.forEach((doc) => res.push({
//     ...doc.data(),
//     id: doc.id
// }));
// return res;
// };

/**
 * Fetches a document from the database
 * @param collectionId Collection id
 * @param docId Document id
 * @returns An object composed of the document data and the document id
 */
export const getDoc = async (collectionId: string, docId: string): Promise<any> => {
    throw new Error('Not implemented');

    // const document = await getDocFirebase(doc(db, collectionId, docId));
    // // Attention, il faut bien mettre le champ id après le reste des champs pour l'override au cas où il existe dans le doc
    // const res = {
    //     ...document.data(),
    //     id: document.id,
    // }
    // return res;
};

export const addDoc = async (collectionId: string, data: any): Promise<any> => {
    throw new Error('Not implemented');

    // return await addDocFirebase(collection(db, collectionId), data);
};

export const setDoc = async (collectionId: string, docId: string, data: any): Promise<any> => {
    throw new Error('Not implemented');

    // return await setDocFirebase(doc(db, collectionId, docId), data);
};

export const updateDoc = async (collectionId: string, docId: string, data: any): Promise<any> => {
    throw new Error('Not implemented');

    // return await updateDocFirebase(doc(db, collectionId, docId), data);
};

export const generateId = (collectionId: string) => {
    throw new Error('Not implemented');

    // return doc(collection(db, collectionId)).id;
};
