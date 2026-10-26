"use client"

import Link from "next/link"
import { ArrowLeft, RotateCcw } from "lucide-react"
import { LinkList } from "@/components/link-list"
import { Badge } from "@/components/ui/badge"
import { AddLinkDialog } from "@/components/add-link-dialog"
import { useLinks } from "@/store/use-profile-store"

export default function LinksPage() {
  const { links, resetLinks } = useLinks()

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#0f1419] flex flex-col font-sans selection:bg-[#0064e0] selection:text-white">
      {/* Sticky Top Promo Banner (DESIGN.md promo-banner) */}
      <div className="w-full bg-[#0f1419] text-white py-2 px-4 text-center text-xs sm:text-[13px] font-bold tracking-tight flex items-center justify-center gap-2">
        <Badge variant="yellow">PORTFOLIO</Badge>
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

        {/* Header with Add Link Action */}
        <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="inline-flex">
              <Badge variant="default">CHANNELS &amp; LINKS</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0f1419] meta-heading">
              링크 &amp; 소셜 채널
            </h1>
            <p className="text-sm sm:text-base text-[#65676b] tracking-[-0.16px]">
              오픈소스 코드, 기술 블로그, 포트폴리오 및 협업 채널 모음입니다. (총 {links.length}개)
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={resetLinks}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#65676b] hover:text-[#0f1419] bg-[#f5f6f8] hover:bg-[#e4e6eb] rounded-full transition-colors cursor-pointer border border-[#ced0d4]"
              title="기본 시드 데이터로 초기화"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>초기화</span>
            </button>
            <AddLinkDialog
              buttonText="새 링크 추가"
              buttonVariant="buy"
              buttonSize="default"
            />
          </div>
        </section>

        {/* Link grid */}
        <LinkList links={links} />
      </main>
    </div>
  )
}
