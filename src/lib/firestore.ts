import { getEnvVariable } from '../config';

/**
 * Generic paginated response interface
 */
export interface PaginatedResponse<T> {
  items: T[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

// Only load Firebase if we're using Firestore
const getFirebase = async () => {
  try {
    // Dynamic imports to avoid loading Firebase in environments where it's not used
    const { initializeApp } = await import('firebase/app');
    const {
      getFirestore,
      collection,
      getDocs,
      doc,
      getDoc,
      query,
      orderBy,
      limit,
      startAfter,
    } = await import('firebase/firestore');

    // Parse Firebase config from env variable or use empty object as fallback
    const firebaseConfig = (() => {
      try {
        const configStr = getEnvVariable('VITE_FIREBASE_CONFIG', '{}');
        return JSON.parse(configStr);
      } catch (e) {
        console.error('Failed to parse Firebase config:', e);
        return {};
      }
    })();

    // Initialize Firebase app
    const firebaseApp = initializeApp(firebaseConfig);
    const db = getFirestore(firebaseApp);

    return {
      db,
      collection,
      getDocs,
      doc,
      getDoc,
      query,
      orderBy,
      limit,
      startAfter,
    };
  } catch (error) {
    console.error('Failed to load Firebase:', error);
    throw new Error('Firebase is not available');
  }
};

/**
 * Get paginated documents from a Firestore collection
 *
 * @param colPath Collection path
 * @param page Page number (1-indexed)
 * @param perPage Number of items per page
 * @returns Paginated response with items and metadata
 */
export async function getPaginated<T extends { id: string }>(
  colPath: string,
  page: number,
  perPage: number
): Promise<PaginatedResponse<T>> {
  const firebase = await getFirebase();
  const { db, collection, getDocs, query, orderBy, limit, startAfter } =
    firebase;

  // First, get total count - not efficient, but Firestore doesn't provide count API
  const colRef = collection(db, colPath);
  const snapshot = await getDocs(query(colRef));
  const totalItems = snapshot.size;
  const totalPages = Math.ceil(totalItems / perPage);

  // Adjust page if it's out of bounds
  page = Math.max(1, Math.min(page, totalPages || 1));

  // Now get the actual page data with pagination
  let queryRef = query(colRef, orderBy('createdAt', 'desc'), limit(perPage));

  // If not the first page, need to use startAfter with cursor
  if (page > 1) {
    // Get the last document from the previous page
    const previousPageQuery = query(
      colRef,
      orderBy('createdAt', 'desc'),
      limit((page - 1) * perPage)
    );
    const previousPageDocs = await getDocs(previousPageQuery);
    const lastVisible = previousPageDocs.docs[previousPageDocs.docs.length - 1];

    if (lastVisible) {
      queryRef = query(
        colRef,
        orderBy('createdAt', 'desc'),
        startAfter(lastVisible),
        limit(perPage)
      );
    }
  }

  // Get the current page data
  const pageSnapshot = await getDocs(queryRef);
  const items = pageSnapshot.docs.map((docSnapshot) => {
    return { id: docSnapshot.id, ...docSnapshot.data() } as unknown as T;
  });

  return {
    items,
    totalPages,
    currentPage: page,
    totalItems,
  };
}

/**
 * Get a document by ID from a Firestore collection
 *
 * @param colPath Collection path
 * @param id Document ID
 * @returns Document data with ID
 * @throws Error if document not found
 */
export async function getById<T extends { id: string }>(
  colPath: string,
  id: string
): Promise<T> {
  const firebase = await getFirebase();
  const { db, doc, getDoc } = firebase;

  const docRef = doc(db, colPath, id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    throw new Error(`Document not found: ${colPath}/${id}`);
  }

  return { id: snapshot.id, ...snapshot.data() } as unknown as T;
}
