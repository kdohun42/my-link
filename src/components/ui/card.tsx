import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/**
 * Card components conforming to DESIGN.md
 * - default: {rounded.xl} (16px), {colors.canvas} (#ffffff), 1px {colors.hairline-soft} (#e4e6eb), hover: {colors.hairline} (#ced0d4)
 * - feature: {rounded.xxxl} (32px), {colors.canvas} (#ffffff), 1px {colors.hairline-soft} (#e4e6eb)
 * - featured: {rounded.xl} (16px), {colors.surface-soft} (#f5f6f8), hover: {colors.primary} (#0064e0)
 * - promo: {rounded.xxxl} (32px), {colors.ink-deep} (#0f1419), text {colors.canvas} (white)
 */
const cardVariants = cva(
  "transition-all duration-150 ease-out",
  {
    variants: {
      variant: {
        default:
          "rounded-2xl border border-[#e4e6eb] bg-[#ffffff] hover:border-[#ced0d4]",
        feature:
          "rounded-[32px] border border-[#e4e6eb] bg-[#ffffff] shadow-sm",
        featured:
          "rounded-2xl border border-[#e4e6eb] bg-[#f5f6f8] hover:border-[#0064e0]",
        promo:
          "rounded-[32px] bg-[#0f1419] text-[#ffffff] border border-white/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Card({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        "font-bold text-sm text-[#0f1419] tracking-tight meta-heading",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-xs text-[#65676b] tracking-[-0.14px]", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("p-5", className)}
      {...props}
    />
  )
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, cardVariants }
