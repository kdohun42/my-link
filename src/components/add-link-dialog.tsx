"use client"

import * as React from "react"
import { useState } from "react"
import { Plus, Mail, Sparkles, AlertCircle } from "lucide-react"
import { GithubIcon, LinkedinIcon, YoutubeIcon } from "@/components/icons"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useProfileStore, type NewLinkInput } from "@/store/use-profile-store"
import type { LinkItem } from "@/lib/data"
import { cn } from "cn"

const ICON_PRESETS: {
  id: LinkItem["icon"]
  label: string
  iconComp?: React.ReactNode
  emoji?: string
  defaultBg?: string
  defaultColor?: string
}[] = [
  {
    id: "custom",
    label: "커스텀",
    emoji: "🔗",
  },
  {
    id: "github",
    label: "GitHub",
    iconComp: <GithubIcon className="w-4 h-4" />,
    defaultBg: "#0f1419",
    defaultColor: "#ffffff",
  },
  {
    id: "velog",
    label: "Velog",
    emoji: "✍",
  },
  {
    id: "notion",
    label: "Notion",
    emoji: "📑",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    iconComp: <LinkedinIcon className="w-4 h-4" />,
    defaultBg: "#0a66c2",
    defaultColor: "#ffffff",
  },
  {
    id: "youtube",
    label: "YouTube",
    iconComp: <YoutubeIcon className="w-4 h-4" />,
    defaultBg: "#ff0000",
    defaultColor: "#ffffff",
  },
  {
    id: "email",
    label: "이메일",
    iconComp: <Mail className="w-4 h-4" />,
    defaultBg: "#0064e0",
    defaultColor: "#ffffff",
  },
]

const EMOJI_SUGGESTIONS = ["🔗", "🚀", "💻", "🤖", "📚", "🌐", "💡", "📝", "☕", "🎮", "🔬", "📌"]

interface AddLinkDialogProps {
  buttonText?: string
  buttonVariant?: "default" | "primary" | "buy" | "secondary" | "outline"
  buttonSize?: "default" | "sm" | "lg"
  className?: string
  onLinkAdded?: (newLink: LinkItem) => void
}

interface ValidationErrors {
  title?: string
  url?: string
  description?: string
  emoji?: string
}

function normalizeUrl(rawUrl: string, iconType: LinkItem["icon"]): string {
  const trimmed = rawUrl.trim()
  if (iconType === "email") {
    return trimmed.startsWith("mailto:") ? trimmed : `mailto:${trimmed}`
  }
  if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
    return `https://${trimmed}`
  }
  return trimmed
}

export function AddLinkDialog({
  buttonText = "링크 추가",
  buttonVariant = "default",
  buttonSize = "default",
  className,
  onLinkAdded,
}: AddLinkDialogProps) {
  const [open, setOpen] = useState(false)
  const addLink = useProfileStore((state) => state.addLink)
  const existingLinks = useProfileStore((state) => state.links)

  // Form states
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [description, setDescription] = useState("")
  const [icon, setIcon] = useState<LinkItem["icon"]>("custom")
  const [emoji, setEmoji] = useState("🔗")
  const [external, setExternal] = useState(true)
  const [featured, setFeatured] = useState(false)

  // Validation states
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const resetForm = () => {
    setTitle("")
    setUrl("")
    setDescription("")
    setIcon("custom")
    setEmoji("🔗")
    setExternal(true)
    setFeatured(false)
    setErrors({})
    setTouched({})
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      resetForm()
    }
  }

  const handleSelectIcon = (presetId: LinkItem["icon"], defaultEmoji?: string) => {
    setIcon(presetId)
    if (defaultEmoji) {
      setEmoji(defaultEmoji)
    }

    // Revalidate URL if it was already entered or touched
    if (url.trim()) {
      validateSingleField("url", url, presetId)
    }
  }

  const validateSingleField = (
    field: keyof ValidationErrors,
    value: string,
    currentIcon = icon
  ): string | undefined => {
    if (field === "title") {
      const trimmed = value.trim()
      if (!trimmed) return "링크 제목을 입력해주세요."
      if (trimmed.length < 2) return "제목은 2자 이상 입력해주세요."
      if (trimmed.length > 40) return "제목은 최대 40자까지 입력 가능합니다."
    }

    if (field === "url") {
      const trimmed = value.trim()
      if (!trimmed) return "이동할 URL 주소를 입력해주세요."
      if (/\s/.test(trimmed)) return "URL 주소에 공백이 포함될 수 없습니다."

      if (currentIcon === "email") {
        const emailToTest = trimmed.replace(/^mailto:/, "")
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(emailToTest)) {
          return "올바른 이메일 형식을 입력해주세요. (예: contact@example.com)"
        }
      } else {
        const formatted = normalizeUrl(trimmed, currentIcon)
        try {
          const parsed = new URL(formatted)
          const host = parsed.hostname
          if (!host.includes(".") && host !== "localhost") {
            return "유효한 웹 사이트 도메인을 입력해주세요. (예: github.com)"
          }
        } catch {
          return "유효한 URL 주소를 입력해주세요. (예: https://example.com)"
        }
      }

      // Check duplicates
      const formatted = normalizeUrl(trimmed, currentIcon).toLowerCase()
      const isDuplicate = existingLinks.some(
        (l) => l.href.trim().toLowerCase() === formatted
      )
      if (isDuplicate) {
        return "이미 목록에 등록되어 있는 링크 URL입니다."
      }
    }

    if (field === "description") {
      if (value.length > 80) return "설명은 최대 80자까지 입력 가능합니다."
    }

    if (field === "emoji") {
      if (currentIcon === "custom" || currentIcon === "velog" || currentIcon === "notion") {
        if (!value.trim()) return "표시할 이모지 또는 기호를 입력해주세요."
        if (Array.from(value).length > 4) return "이모지는 최대 4자 이하로 입력해주세요."
      }
    }

    return undefined
  }

  const handleBlur = (field: keyof ValidationErrors) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    let val = ""
    if (field === "title") val = title
    if (field === "url") val = url
    if (field === "description") val = description
    if (field === "emoji") val = emoji

    const fieldError = validateSingleField(field, val)
    setErrors((prev) => ({ ...prev, [field]: fieldError }))
  }

  const handleTitleChange = (val: string) => {
    setTitle(val)
    if (touched.title || errors.title) {
      setErrors((prev) => ({ ...prev, title: validateSingleField("title", val) }))
    }
  }

  const handleUrlChange = (val: string) => {
    setUrl(val)
    if (touched.url || errors.url) {
      setErrors((prev) => ({ ...prev, url: validateSingleField("url", val) }))
    }
  }

  const handleDescriptionChange = (val: string) => {
    setDescription(val)
    if (touched.description || errors.description) {
      setErrors((prev) => ({
        ...prev,
        description: validateSingleField("description", val),
      }))
    }
  }

  const handleEmojiChange = (val: string) => {
    setEmoji(val)
    if (touched.emoji || errors.emoji) {
      setErrors((prev) => ({ ...prev, emoji: validateSingleField("emoji", val) }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const titleErr = validateSingleField("title", title)
    const urlErr = validateSingleField("url", url)
    const descErr = validateSingleField("description", description)
    const emojiErr = validateSingleField("emoji", emoji)

    const newErrors: ValidationErrors = {
      title: titleErr,
      url: urlErr,
      description: descErr,
      emoji: emojiErr,
    }

    setTouched({
      title: true,
      url: true,
      description: true,
      emoji: true,
    })

    setErrors(newErrors)

    // Stop if any error exists
    if (titleErr || urlErr || descErr || emojiErr) {
      return
    }

    const formattedUrl = normalizeUrl(url, icon)
    const matchedPreset = ICON_PRESETS.find((p) => p.id === icon)

    const newLinkData: NewLinkInput = {
      title: title.trim(),
      href: formattedUrl,
      description: description.trim() || formattedUrl,
      icon,
      emoji: icon === "custom" || icon === "velog" || icon === "notion" ? emoji : undefined,
      iconBg: matchedPreset?.defaultBg,
      iconColor: matchedPreset?.defaultColor,
      external,
      featured,
    }

    const created = addLink(newLinkData)
    onLinkAdded?.(created)

    // Close modal and reset form
    setOpen(false)
    resetForm()
  }

  const hasAnyError = Boolean(errors.title || errors.url || errors.description || errors.emoji)

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        className={cn("inline-flex items-center gap-2 cursor-pointer", className)}
        render={
          <Button variant={buttonVariant} size={buttonSize} className={className}>
            <Plus className="w-4 h-4" />
            <span>{buttonText}</span>
          </Button>
        }
      />

      <DialogContent className="sm:max-w-[490px]">
        <DialogHeader>
          <div className="flex items-center gap-2 text-[#0064e0] text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>New Link Entry</span>
          </div>
          <DialogTitle>새로운 링크 추가</DialogTitle>
          <DialogDescription>
            프로필 페이지에 노출될 새로운 링크 정보를 입력해주세요. 로컬 상태로 즉시 반영됩니다.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4.5" noValidate>
          {/* General Error Notice */}
          {hasAnyError && (
            <div className="flex items-center gap-2 bg-[#e02424]/10 border border-[#e02424]/20 text-[#e02424] text-xs font-semibold px-3.5 py-2.5 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>입력 정보를 확인하고 잘못된 항목을 수정해주세요.</span>
            </div>
          )}

          {/* Title field */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="link-title">
                링크 제목 <span className="text-[#e02424]">*</span>
              </Label>
              <span
                className={cn(
                  "text-[11px] font-mono",
                  title.length > 40 ? "text-[#e02424] font-bold" : "text-[#8a8d91]"
                )}
              >
                {title.length}/40
              </span>
            </div>
            <Input
              id="link-title"
              placeholder="예: 기술 블로그 (Tistory), 신규 프로젝트"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              onBlur={() => handleBlur("title")}
              maxLength={45}
              className={cn(
                errors.title &&
                  "border-[#e02424] focus-visible:border-[#e02424] focus-visible:ring-[#e02424]/20"
              )}
              autoFocus
            />
            {errors.title && (
              <p className="flex items-center gap-1 text-[11px] font-semibold text-[#e02424] mt-0.5">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.title}</span>
              </p>
            )}
          </div>

          {/* URL field */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="link-url">
                URL 링크 주소 <span className="text-[#e02424]">*</span>
              </Label>
              <span className="text-[11px] text-[#8a8d91]">
                {icon === "email" ? "이메일 형식" : "https:// 자동 적용"}
              </span>
            </div>
            <Input
              id="link-url"
              placeholder={icon === "email" ? "contact@example.com" : "github.com 또는 https://example.com"}
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
              onBlur={() => handleBlur("url")}
              className={cn(
                errors.url &&
                  "border-[#e02424] focus-visible:border-[#e02424] focus-visible:ring-[#e02424]/20"
              )}
            />
            {errors.url && (
              <p className="flex items-center gap-1 text-[11px] font-semibold text-[#e02424] mt-0.5">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.url}</span>
              </p>
            )}
          </div>

          {/* Description field */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="link-desc">부가 설명 (선택)</Label>
              <span
                className={cn(
                  "text-[11px] font-mono",
                  description.length > 80 ? "text-[#e02424] font-bold" : "text-[#8a8d91]"
                )}
              >
                {description.length}/80
              </span>
            </div>
            <Input
              id="link-desc"
              placeholder="예: 최신 개발 일지와 알고리즘 풀이"
              value={description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              onBlur={() => handleBlur("description")}
              maxLength={85}
              className={cn(
                errors.description &&
                  "border-[#e02424] focus-visible:border-[#e02424] focus-visible:ring-[#e02424]/20"
              )}
            />
            {errors.description && (
              <p className="flex items-center gap-1 text-[11px] font-semibold text-[#e02424] mt-0.5">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.description}</span>
              </p>
            )}
          </div>

          {/* Icon Type Selection */}
          <div className="flex flex-col gap-2 pt-1">
            <Label>아이콘 종류</Label>
            <div className="grid grid-cols-4 gap-2">
              {ICON_PRESETS.map((preset) => {
                const isSelected = icon === preset.id
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectIcon(preset.id, preset.emoji)}
                    className={cn(
                      "flex flex-col items-center justify-center gap-1 p-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer",
                      isSelected
                        ? "border-[#0064e0] bg-[#0064e0]/5 text-[#0064e0] ring-1 ring-[#0064e0]"
                        : "border-[#e4e6eb] bg-white text-[#4b4f56] hover:bg-[#f5f6f8]"
                    )}
                  >
                    <div className="w-6 h-6 flex items-center justify-center text-sm">
                      {preset.iconComp || <span>{preset.emoji}</span>}
                    </div>
                    <span className="text-[11px] truncate w-full text-center">
                      {preset.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Emoji selector (if custom, velog, or notion) */}
          {(icon === "custom" || icon === "velog" || icon === "notion") && (
            <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-[#f5f6f8] border border-[#e4e6eb]">
              <div className="flex items-center justify-between">
                <Label className="text-[11px] text-[#65676b]">이모지 선택 / 직접 입력</Label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#65676b]">현재:</span>
                  <span className="text-base">{emoji}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {EMOJI_SUGGESTIONS.map((em) => (
                  <button
                    key={em}
                    type="button"
                    onClick={() => handleEmojiChange(em)}
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center text-sm border transition-all cursor-pointer",
                      emoji === em
                        ? "bg-white border-[#0064e0] ring-1 ring-[#0064e0] scale-105"
                        : "bg-white border-[#e4e6eb] hover:bg-[#ced0d4]/30"
                    )}
                  >
                    {em}
                  </button>
                ))}
              </div>
              <Input
                className={cn(
                  "h-8 text-xs mt-1 bg-white",
                  errors.emoji && "border-[#e02424] focus-visible:ring-[#e02424]/20"
                )}
                placeholder="직접 이모지 입력 (예: ⭐️)"
                value={emoji}
                onChange={(e) => handleEmojiChange(e.target.value)}
                onBlur={() => handleBlur("emoji")}
                maxLength={4}
              />
              {errors.emoji && (
                <p className="flex items-center gap-1 text-[11px] font-semibold text-[#e02424]">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.emoji}</span>
                </p>
              )}
            </div>
          )}

          {/* Options: External & Featured */}
          <div className="flex flex-col gap-2 pt-1 border-t border-[#e4e6eb]">
            <label className="flex items-center gap-2.5 text-xs text-[#1c2b33] cursor-pointer">
              <input
                type="checkbox"
                checked={external}
                onChange={(e) => setExternal(e.target.checked)}
                className="w-4 h-4 rounded border-[#ced0d4] text-[#0064e0] focus:ring-[#0064e0]"
              />
              <span className="font-semibold">새 탭에서 열기 (외부 링크)</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs text-[#1c2b33] cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded border-[#ced0d4] text-[#0064e0] focus:ring-[#0064e0]"
              />
              <span className="font-semibold">강조 카드 스타일 적용 (Featured)</span>
            </label>
          </div>

          <DialogFooter>
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                >
                  취소
                </Button>
              }
            />
            <Button type="submit" variant="buy">
              링크 추가하기
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
