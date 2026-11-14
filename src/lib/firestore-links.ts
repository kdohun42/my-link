import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  type DocumentData,
  type QuerySnapshot,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import type { LinkItem } from "@/lib/data"

/** Firestore collection path: user/anonymous/links */
export const FIRESTORE_LINKS_COLLECTION_PATH = "user/anonymous/links" as const

export type FirestoreNewLinkInput = Omit<LinkItem, "id">

/**
 * Returns the Firestore CollectionReference for user/anonymous/links
 */
export function getLinksCollectionRef() {
  return collection(db, "user", "anonymous", "links")
}

interface FirestoreTimestampLike {
  toMillis?: () => number
  toDate?: () => Date
}

/**
 * Extracts a numeric millisecond timestamp for sorting from various timestamp representations
 */
export function getTimestampMillis(val: unknown): number {
  if (!val) return 0
  if (typeof val === "object" && val !== null) {
    const ts = val as FirestoreTimestampLike
    if (typeof ts.toMillis === "function") return ts.toMillis()
    if (typeof ts.toDate === "function") return ts.toDate().getTime()
  }
  if (val instanceof Date) return val.getTime()
  if (typeof val === "number") return val
  if (typeof val === "string") {
    const parsed = Date.parse(val)
    return isNaN(parsed) ? 0 : parsed
  }
  return 0
}

/**
 * Sorts link items in descending order based on createAt (newest first)
 */
export function sortLinksByCreateAt(items: LinkItem[]): LinkItem[] {
  return [...items].sort((a, b) => {
    const timeA = getTimestampMillis(a.createAt ?? a.createdAt)
    const timeB = getTimestampMillis(b.createAt ?? b.createdAt)
    return timeB - timeA
  })
}

/**
 * Maps a Firestore document snapshot to LinkItem interface
 */
export function mapDocToLinkItem(id: string, data: DocumentData): LinkItem {
  return {
    id,
    title: data.title ?? "",
    description: data.description ?? data.href ?? "",
    href: data.href ?? "",
    icon: data.icon ?? "custom",
    ...(data.emoji !== undefined && data.emoji !== null ? { emoji: data.emoji } : {}),
    ...(data.iconBg !== undefined && data.iconBg !== null ? { iconBg: data.iconBg } : {}),
    ...(data.iconColor !== undefined && data.iconColor !== null ? { iconColor: data.iconColor } : {}),
    external: data.external ?? true,
    featured: data.featured ?? false,
    createAt: data.createAt ?? data.createdAt ?? null,
    createdAt: data.createdAt ?? data.createAt ?? null,
  }
}

/**
 * Saves a new link to Firestore at `user/anonymous/links`
 * Sets createAt with serverTimestamp() for ordering
 */
export async function addLinkToFirestore(newLink: FirestoreNewLinkInput): Promise<LinkItem> {
  const linksCol = getLinksCollectionRef()

  // Firestore rejects undefined values, so sanitize optional fields
  const docData: Record<string, unknown> = {
    title: newLink.title.trim(),
    description: (newLink.description ?? "").trim() || newLink.href.trim(),
    href: newLink.href.trim(),
    icon: newLink.icon,
    external: newLink.external ?? true,
    featured: newLink.featured ?? false,
    createAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  }

  if (newLink.emoji !== undefined && newLink.emoji !== null && newLink.emoji.trim() !== "") {
    docData.emoji = newLink.emoji.trim()
  }
  if (newLink.iconBg !== undefined && newLink.iconBg !== null && newLink.iconBg.trim() !== "") {
    docData.iconBg = newLink.iconBg.trim()
  }
  if (newLink.iconColor !== undefined && newLink.iconColor !== null && newLink.iconColor.trim() !== "") {
    docData.iconColor = newLink.iconColor.trim()
  }

  const docRef = await addDoc(linksCol, docData)

  return {
    ...newLink,
    id: docRef.id,
    createAt: new Date(),
    createdAt: new Date(),
  }
}

/**
 * Fetches all links from Firestore at `user/anonymous/links` ordered by createAt desc
 */
export async function getLinksFromFirestore(): Promise<LinkItem[]> {
  const linksCol = getLinksCollectionRef()
  let snapshot: QuerySnapshot<DocumentData>

  try {
    const q = query(linksCol, orderBy("createAt", "desc"))
    snapshot = await getDocs(q)
  } catch (err) {
    try {
      const qFallback = query(linksCol, orderBy("createdAt", "desc"))
      snapshot = await getDocs(qFallback)
    } catch {
      console.warn("Firestore query with orderBy failed, falling back to base collection:", err)
      snapshot = await getDocs(linksCol)
    }
  }

  const items = snapshot.docs.map((docSnap) => mapDocToLinkItem(docSnap.id, docSnap.data()))
  return sortLinksByCreateAt(items)
}

/**
 * Subscribes to real-time changes in Firestore at `user/anonymous/links`
 * Orders by createAt desc and automatically notifies on update
 */
export function subscribeToFirestoreLinks(
  onUpdate: (links: LinkItem[]) => void,
  onError?: (error: Error) => void
): () => void {
  const linksCol = getLinksCollectionRef()
  let isUnsubscribed = false
  let innerUnsubscribe: (() => void) | null = null

  const handleSnapshot = (snapshot: QuerySnapshot<DocumentData>) => {
    const items = snapshot.docs.map((docSnap) =>
      mapDocToLinkItem(docSnap.id, docSnap.data())
    )
    const sorted = sortLinksByCreateAt(items)
    onUpdate(sorted)
  }

  try {
    const q = query(linksCol, orderBy("createAt", "desc"))
    innerUnsubscribe = onSnapshot(
      q,
      handleSnapshot,
      (error) => {
        console.warn("Firestore onSnapshot error with orderBy createAt:", error)
        if (isUnsubscribed) return

        // Fallback to base collection listener if orderBy fails
        try {
          innerUnsubscribe = onSnapshot(
            linksCol,
            handleSnapshot,
            (fallbackError) => {
              console.warn("Firestore fallback onSnapshot error:", fallbackError)
              onError?.(fallbackError)
            }
          )
        } catch (e) {
          onError?.(e instanceof Error ? e : new Error(String(e)))
        }
      }
    )
  } catch (err) {
    console.warn("Error creating onSnapshot query, trying fallback collection:", err)
    innerUnsubscribe = onSnapshot(
      linksCol,
      handleSnapshot,
      (e) => onError?.(e instanceof Error ? e : new Error(String(e)))
    )
  }

  return () => {
    isUnsubscribed = true
    if (innerUnsubscribe) {
      innerUnsubscribe()
    }
  }
}

/**
 * Deletes a link from Firestore by document id at `user/anonymous/links`
 */
export async function deleteLinkFromFirestore(id: string): Promise<void> {
  const docRef = doc(db, "user", "anonymous", "links", id)
  await deleteDoc(docRef)
}
