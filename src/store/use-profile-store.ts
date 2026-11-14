"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { useEffect, useState, useCallback, useSyncExternalStore } from "react"
import type { LinkItem } from "@/lib/data"
import initialLinksData from "@/data/links.json"
import {
  addLinkToFirestore,
  deleteLinkFromFirestore,
  subscribeToFirestoreLinks,
  getLinksFromFirestore,
} from "@/lib/firestore-links"

export type NewLinkInput = Omit<LinkItem, "id">

interface ProfileState {
  links: LinkItem[]
  setLinks: (links: LinkItem[]) => void
  addLink: (link: NewLinkInput) => Promise<LinkItem>
  deleteLink: (id: number | string) => Promise<void>
  resetLinks: () => void
  fetchLinksFromFirestore: () => Promise<LinkItem[]>
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      links: initialLinksData as LinkItem[],

      setLinks: (links) => {
        set({ links })
      },

      /**
       * Saves a new link directly to Firestore at `user/anonymous/links`
       * and immediately updates the local store so the list refreshes instantly.
       */
      addLink: async (newLink) => {
        // 1. Save to Firestore at user/anonymous/links
        const createdItem = await addLinkToFirestore(newLink)

        // 2. Immediately update local Zustand store (new link on top)
        const currentLinks = get().links
        const updated = [createdItem, ...currentLinks.filter((l) => l.id !== createdItem.id)]
        set({ links: updated })

        return createdItem
      },

      /**
       * Deletes a link from Firestore and updates store
       */
      deleteLink: async (id) => {
        if (typeof id === "string") {
          try {
            await deleteLinkFromFirestore(id)
          } catch (err) {
            console.error("Firestore 링크 삭제 실패:", err)
          }
        }

        set({
          links: get().links.filter((link) => link.id !== id),
        })
      },

      resetLinks: () => {
        set({
          links: initialLinksData as LinkItem[],
        })
      },

      /**
       * Fetches latest links from Firestore at `user/anonymous/links`
       */
      fetchLinksFromFirestore: async () => {
        try {
          const remoteLinks = await getLinksFromFirestore()
          if (remoteLinks.length > 0) {
            set({ links: remoteLinks })
          }
          return remoteLinks
        } catch (err) {
          console.warn("Firestore 링크 가져오기 실패:", err)
          return get().links
        }
      },
    }),
    {
      name: "mylink_profile_store",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

const emptySubscribe = () => () => {}

/**
 * Hydration-safe custom hook for Next.js App Router
 * Synchronizes with Firestore (user/anonymous/links) on page load and in real time
 */
export function useLinks() {
  const storeLinks = useProfileStore((state) => state.links)
  const setLinks = useProfileStore((state) => state.setLinks)
  const addLink = useProfileStore((state) => state.addLink)
  const deleteLink = useProfileStore((state) => state.deleteLink)
  const resetLinks = useProfileStore((state) => state.resetLinks)
  const fetchLinksFromFirestore = useProfileStore((state) => state.fetchLinksFromFirestore)

  // Avoid cascading renders using useSyncExternalStore
  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

  const [isFirestoreLoaded, setIsFirestoreLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const reloadLinks = useCallback(async () => {
    setIsLoading(true)
    try {
      const items = await fetchLinksFromFirestore()
      if (items.length > 0) {
        setLinks(items)
      }
    } finally {
      setIsLoading(false)
      setIsFirestoreLoaded(true)
    }
  }, [fetchLinksFromFirestore, setLinks])

  useEffect(() => {
    let isMounted = true

    // Real-time subscription to `user/anonymous/links`
    // onSnapshot immediately delivers the current state on initial subscribe (page load)
    // and automatically updates whenever links are added, modified, or removed.
    const unsubscribe = subscribeToFirestoreLinks(
      (firestoreLinks) => {
        if (!isMounted) return
        setIsFirestoreLoaded(true)
        setIsLoading(false)
        if (firestoreLinks.length > 0) {
          setLinks(firestoreLinks)
        }
      },
      (error) => {
        if (!isMounted) return
        console.warn(
          "Firestore 실시간 동기화 에러 (로컬 캐시/더미 데이터 사용):",
          error
        )
        setIsFirestoreLoaded(true)
        setIsLoading(false)
      }
    )

    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [setLinks])

  return {
    links: isHydrated ? storeLinks : (initialLinksData as LinkItem[]),
    isHydrated,
    isFirestoreLoaded,
    isLoading,
    addLink,
    deleteLink,
    resetLinks,
    reloadLinks,
  }
}
