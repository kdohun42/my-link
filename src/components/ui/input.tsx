import * as React from "react"
import { cn } from "cn"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-[#ced0d4] bg-white px-3.5 py-2 text-sm text-[#0f1419] transition-all duration-150 placeholder:text-[#8a8d91] focus-visible:outline-none focus-visible:border-[#0064e0] focus-visible:ring-2 focus-visible:ring-[#0064e0]/20 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
