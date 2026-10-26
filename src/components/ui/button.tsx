import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/**
 * Button component conforming to DESIGN.md
 * - Pill-shaped buttons ({rounded.full}) are the dominant geometric signature.
 * - button-primary: Marketing black pill ({colors.ink-button} #0f1419)
 * - button-buy-cta: Commerce cobalt pill ({colors.primary} #0064e0)
 * - button-secondary: Outlined ghost pill (2px solid {colors.ink-deep} #0f1419)
 * - button-ghost: Outlined faint pill
 * - button-pill-tab: Category navigation pills
 */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border text-sm font-bold tracking-tight whitespace-nowrap transition-all duration-150 outline-none select-none cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0064e0] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-[#0f1419] text-white border-transparent hover:bg-[#4b4f56]",
        primary:
          "bg-[#0f1419] text-white border-transparent hover:bg-[#4b4f56]",
        buy:
          "bg-[#0064e0] text-white border-transparent hover:bg-[#004bb3] shadow-sm",
        secondary:
          "bg-transparent text-[#0f1419] border-2 border-[#0f1419] hover:bg-[#f5f6f8]",
        ghost:
          "bg-transparent text-[#0f1419] border-2 border-[#0a1317]/12 hover:bg-[#f5f6f8]",
        outline:
          "bg-white text-[#1c2b33] border border-[#ced0d4] hover:bg-[#f5f6f8]",
        pillTab:
          "bg-white text-[#1c2b33] border border-[#ced0d4] hover:bg-[#f5f6f8] px-5 py-2",
        pillTabActive:
          "bg-[#0f1419] text-white border-[#0f1419] px-5 py-2",
        link:
          "text-[#0064e0] underline-offset-4 hover:underline border-transparent rounded-none px-0 py-0",
      },
      size: {
        default: "h-10 px-5 text-sm",
        sm: "h-8 px-3.5 text-xs",
        lg: "h-12 px-7 text-base",
        icon: "size-10 rounded-full p-0",
        "icon-sm": "size-8 rounded-full p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
