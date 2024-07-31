import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const [charCount,setCharCount] = React.useState(props.defaultValue?.toString().length??0)
    return (
      <>
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-80",
            `${props.readOnly?'bg-orange-50' : ''}`,
            className
          )}
          ref={ref}
          {...props}
          onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => setCharCount(e.target.value.length)}
        />
        <div className={`flex justify-end ${charCount == props.maxLength? 'text-red-500':''}`}>{`${charCount}/${props.maxLength}`}</div>
      </>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
