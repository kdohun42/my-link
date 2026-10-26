import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/**
 * Badge components conforming to DESIGN.md
 * - yellow: {colors.warning} (#ffd83d), text {colors.ink-deep} (#0f1419)
 * - success: {colors.success} (#31a24c), text white
 * - attention: {colors.attention} (#ff8f00), text white
 * - critical: {colors.critical} (#e02424), text white
 * - status: {colors.surface-soft} (#f5f6f8), border {colors.hairline-soft} (#e4e6eb)
 */
const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-tight transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-[#f5f6f8] text-[#1c2b33] border border-[#e4e6eb]",
        yellow:
          "bg-[#ffd83d] text-[#0f1419] uppercase tracking-wider text-[10px]",
        success:
          "bg-[#31a24c] text-white",
        attention:
          "bg-[#ff8f00] text-white",
        critical:
          "bg-[#e02424] text-white",
        cobalt:
          "bg-[#0064e0] text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
