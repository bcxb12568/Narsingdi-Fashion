import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  type User 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDocFromServer, 
  collection, 
  getDocs, 
  getDoc,
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { Product, Order, GoogleReview, StoreSettings } from '../types';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId); /* CRITICAL: The app will break without this line */
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const ADMIN_EMAIL = 'bn692352@gmail.com';

// Skill Mandated Operation Types & Error Handler
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Mandatory connection test on boot
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    } else {
      console.warn("Firebase test connection info:", error);
    }
  }
}
testConnection();

// --- Auth Helpers ---
export function isUserAdmin(user: User | null): boolean {
  if (!user) return false;
  return user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() && user.emailVerified === true;
}

export async function loginWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

// --- Realtime Subscriptions & CRUD with Error Handling ---

export function subscribeProducts(
  onUpdate: (products: Product[]) => void,
  onError?: (error: unknown) => void
) {
  const path = 'products';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      const prods: Product[] = [];
      snapshot.forEach((d) => {
        prods.push(d.data() as Product);
      });
      // Sort pinned to top
      prods.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        if (a.isPinned && b.isPinned) {
          return (b.pinnedAt || 0) - (a.pinnedAt || 0);
        }
        return 0;
      });
      onUpdate(prods);
    },
    (err) => {
      try {
        handleFirestoreError(err, OperationType.GET, path);
      } catch (e) {
        onError?.(e);
      }
    }
  );
}

// Recursively sanitize object/array for Firestore (removes all undefined values to prevent Unsupported field value errors)
export function cleanForFirestore<T>(data: T): T {
  if (data === null || data === undefined) {
    return data;
  }

  if (Array.isArray(data)) {
    return data
      .filter((item) => item !== undefined)
      .map((item) => cleanForFirestore(item)) as unknown as T;
  }

  if (typeof data === 'object' && !(data instanceof Date)) {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(data as Record<string, any>)) {
      if (value !== undefined) {
        result[key] = cleanForFirestore(value);
      }
    }
    return result as T;
  }

  return data;
}

export async function saveProductToFirestore(product: Product): Promise<void> {
  const path = `products/${product.id}`;
  try {
    const cleaned = cleanForFirestore(product);
    await setDoc(doc(db, 'products', product.id), cleaned);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteProductFromFirestore(productId: string): Promise<void> {
  const path = `products/${productId}`;
  try {
    await deleteDoc(doc(db, 'products', productId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export function subscribeOrders(
  onUpdate: (orders: Order[]) => void,
  onError?: (error: unknown) => void
) {
  const path = 'orders';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      const orders: Order[] = [];
      snapshot.forEach((d) => {
        orders.push(d.data() as Order);
      });
      onUpdate(orders);
    },
    (err) => {
      try {
        handleFirestoreError(err, OperationType.GET, path);
      } catch (e) {
        onError?.(e);
      }
    }
  );
}

export async function createOrderInFirestore(order: Order): Promise<void> {
  const path = `orders/${order.id}`;
  try {
    const cleaned = cleanForFirestore(order);
    await setDoc(doc(db, 'orders', order.id), cleaned);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function updateOrderInFirestore(orderId: string, updates: Partial<Order>): Promise<void> {
  const path = `orders/${orderId}`;
  try {
    const cleaned = cleanForFirestore(updates);
    await setDoc(doc(db, 'orders', orderId), cleaned, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteOrderFromFirestore(orderId: string): Promise<void> {
  const path = `orders/${orderId}`;
  try {
    await deleteDoc(doc(db, 'orders', orderId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export function subscribeReviews(
  onUpdate: (reviews: GoogleReview[]) => void,
  onError?: (error: unknown) => void
) {
  const path = 'reviews';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      const revs: GoogleReview[] = [];
      snapshot.forEach((d) => {
        revs.push(d.data() as GoogleReview);
      });
      onUpdate(revs);
    },
    (err) => {
      try {
        handleFirestoreError(err, OperationType.GET, path);
      } catch (e) {
        onError?.(e);
      }
    }
  );
}

export async function saveReviewToFirestore(review: GoogleReview): Promise<void> {
  const path = `reviews/${review.id}`;
  try {
    const cleaned = cleanForFirestore(review);
    await setDoc(doc(db, 'reviews', review.id), cleaned);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function updateReviewInFirestore(reviewId: string, updates: Partial<GoogleReview>): Promise<void> {
  const path = `reviews/${reviewId}`;
  try {
    const cleaned = cleanForFirestore(updates);
    await setDoc(doc(db, 'reviews', reviewId), cleaned, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteReviewFromFirestore(reviewId: string): Promise<void> {
  const path = `reviews/${reviewId}`;
  try {
    await deleteDoc(doc(db, 'reviews', reviewId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export function subscribeStoreSettings(
  onUpdate: (settings: StoreSettings) => void,
  onError?: (error: unknown) => void
) {
  const path = 'settings/general';
  return onSnapshot(
    doc(db, 'settings', 'general'),
    (snap) => {
      if (snap.exists()) {
        onUpdate(snap.data() as StoreSettings);
      }
    },
    (err) => {
      try {
        handleFirestoreError(err, OperationType.GET, path);
      } catch (e) {
        onError?.(e);
      }
    }
  );
}

export async function saveStoreSettingsToFirestore(settings: StoreSettings): Promise<void> {
  const path = 'settings/general';
  try {
    const cleaned = cleanForFirestore(settings);
    await setDoc(doc(db, 'settings', 'general'), cleaned);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// Seed initial products and settings to Firestore if database is empty
export async function seedInitialFirestoreData(
  defaultProducts: Product[],
  defaultReviews: GoogleReview[],
  defaultSettings: StoreSettings
): Promise<void> {
  try {
    const productsSnap = await getDocs(collection(db, 'products')).catch(() => null);
    if (productsSnap && productsSnap.empty) {
      for (const prod of defaultProducts) {
        await setDoc(doc(db, 'products', prod.id), cleanForFirestore(prod)).catch(() => {});
      }
    }

    const reviewsSnap = await getDocs(collection(db, 'reviews')).catch(() => null);
    if (reviewsSnap && reviewsSnap.empty) {
      for (const rev of defaultReviews) {
        await setDoc(doc(db, 'reviews', rev.id), cleanForFirestore(rev)).catch(() => {});
      }
    }

    const settingsSnap = await getDoc(doc(db, 'settings', 'general')).catch(() => null);
    if (settingsSnap && !settingsSnap.exists()) {
      await setDoc(doc(db, 'settings', 'general'), cleanForFirestore(defaultSettings)).catch(() => {});
    }
  } catch (err) {
    console.warn('Initial seeding skipped:', err);
  }
}
