import { Mail, ArrowUpRight } from "lucide-react"
import { cn } from "cn"
import type { LinkItem } from "@/lib/data"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("fill-current", className)} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("fill-current", className)} viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 0 0 1.66-1.66 1.66 1.66 0 0 0-1.66-1.66 1.66 1.66 0 0 0-1.66 1.66 1.65 1.65 0 0 0 1.66 1.66m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  )
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("fill-current", className)} viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

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
