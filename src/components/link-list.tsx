import type { LinkItem } from "@/lib/data"
import { LinkCard } from "@/components/link-card"

export function LinkList({ links }: { links: LinkItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </div>
  )
}
