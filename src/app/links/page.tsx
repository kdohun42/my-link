import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { LinkItem } from "@/lib/data"
import { LinkList } from "@/components/link-list"
import { Badge } from "@/components/ui/badge"
import linksData from "@/data/links.json"

export default function LinksPage() {
  const links = linksData as LinkItem[]

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#0f1419] flex flex-col font-sans selection:bg-[#0064e0] selection:text-white">
      {/* Sticky Top Promo Banner (DESIGN.md promo-banner) */}
      <div className="w-full bg-[#0f1419] text-white py-2 px-4 text-center text-xs sm:text-[13px] font-bold tracking-tight flex items-center justify-center gap-2">
        <Badge variant="yellow">
          PORTFOLIO
        </Badge>
        <span className="truncate">광운대학교 로봇학부 김도훈 연구 및 프로젝트 링크</span>
      </div>

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col gap-8">
        {/* Back navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#65676b] hover:text-[#0f1419] transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>메인으로 돌아가기</span>
        </Link>

        {/* Header */}
        <section className="flex flex-col gap-2">
          <div className="inline-flex">
            <Badge variant="default">
              CHANNELS &amp; LINKS
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0f1419] meta-heading">
            링크 &amp; 소셜 채널
          </h1>
          <p className="text-sm sm:text-base text-[#65676b] tracking-[-0.16px]">
            오픈소스 코드, 기술 블로그, 포트폴리오 및 협업 채널 모음입니다.
          </p>
        </section>

        {/* Link grid */}
        <LinkList links={links} />
      </main>
    </div>
  )
}
