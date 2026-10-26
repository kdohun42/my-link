"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { useEffect, useState } from "react"
import type { LinkItem } from "@/lib/data"
import initialLinksData from "@/data/links.json"

export type NewLinkInput = Omit<LinkItem, "id">

interface ProfileState {
  links: LinkItem[]
  addLink: (link: NewLinkInput) => LinkItem
  deleteLink: (id: number) => void
  resetLinks: () => void
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      links: initialLinksData as LinkItem[],
      addLink: (newLink) => {
        const currentLinks = get().links
        const nextId =
          currentLinks.length > 0
            ? Math.max(...currentLinks.map((l) => l.id)) + 1
            : 1

        const createdItem: LinkItem = {
          ...newLink,
          id: nextId,
        }

        set({
          links: [createdItem, ...currentLinks],
        })

        return createdItem
      },
      deleteLink: (id) => {
        set({
          links: get().links.filter((link) => link.id !== id),
        })
      },
      resetLinks: () => {
        set({
          links: initialLinksData as LinkItem[],
        })
      },
    }),
    {
      name: "mylink_profile_store",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

/**
 * Hydration-safe custom hook for Next.js App Router
 * Prevents SSR hydration mismatch when reading from localStorage
 */
export function useLinks() {
  const storeLinks = useProfileStore((state) => state.links)
  const addLink = useProfileStore((state) => state.addLink)
  const deleteLink = useProfileStore((state) => state.deleteLink)
  const resetLinks = useProfileStore((state) => state.resetLinks)

  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return {
    links: isHydrated ? storeLinks : (initialLinksData as LinkItem[]),
    isHydrated,
    addLink,
    deleteLink,
    resetLinks,
  }
}
