import { Mail, ArrowUpRight } from "lucide-react"
import { cn } from "cn"
import type { LinkItem } from "@/lib/data"
import { GithubIcon, LinkedinIcon, YoutubeIcon } from "@/components/icons"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

function LinkIcon({ link }: { link: LinkItem }) {
  if (link.icon === "github") {
    return (
      <div className="w-10 h-10 rounded-xl bg-[#0f1419] text-white flex items-center justify-center shrink-0">
        <GithubIcon className="w-5 h-5" />
      </div>
    )
  }

  if (link.icon === "linkedin") {
    return (
      <div className="w-10 h-10 rounded-xl bg-[#0a66c2] text-white flex items-center justify-center shrink-0">
        <LinkedinIcon className="w-5 h-5" />
      </div>
    )
  }

  if (link.icon === "youtube") {
    return (
      <div className="w-10 h-10 rounded-xl bg-[#ff0000] text-white flex items-center justify-center shrink-0">
        <YoutubeIcon className="w-5 h-5" />
      </div>
    )
  }

  if (link.icon === "email") {
    return (
      <div className="w-10 h-10 rounded-xl bg-[#0064e0] text-white flex items-center justify-center shrink-0">
        <Mail className="w-5 h-5" />
      </div>
    )
  }

  // Emoji / text fallback for velog, notion, and custom links
  const emoji = link.emoji ?? "🔗"

  return (
    <div className="w-10 h-10 rounded-xl bg-[#f5f6f8] border border-[#e4e6eb] text-[#0f1419] flex items-center justify-center text-lg font-bold shrink-0">
      {emoji}
    </div>
  )
}

export function LinkCard({ link }: { link: LinkItem }) {
  const isExternal = link.external ?? false
  const isFeatured = link.featured ?? false

  return (
    <a
      href={link.href}
      {...(isExternal && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
      className="group block"
    >
      <Card variant={isFeatured ? "featured" : "default"}>
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <LinkIcon link={link} />
            <CardHeader>
              <CardTitle>{link.title}</CardTitle>
              <CardDescription
                className={cn(
                  isFeatured && "text-[#0064e0] font-semibold"
                )}
              >
                {link.description}
              </CardDescription>
            </CardHeader>
          </div>
          <span
            className={cn(
              "text-lg font-bold shrink-0 transition-colors",
              isFeatured
                ? "text-[#0064e0]"
                : "text-[#8a8d91] group-hover:text-[#0f1419]"
            )}
          >
            {isExternal ? <ArrowUpRight className="w-4 h-4" /> : "›"}
          </span>
        </CardContent>
      </Card>
    </a>
  )
}
