import * as React from "react"
import { cn } from "cn"

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-xs font-bold text-[#1c2b33] tracking-tight select-none",
          className
        )}
        {...props}
      />
    )
  }
)
Label.displayName = "Label"

export { Label }
