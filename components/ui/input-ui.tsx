import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [charCount,setCharCount] = React.useState(props.defaultValue?.toString().length??0)
    return (
      <>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-80",
            `${props.readOnly?'bg-orange-50' : ''}`
            ,
            className
          )}
          ref={ref}
          {...props}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => setCharCount(e.target.value.length)}
        />
        {
          props.maxLength !== undefined &&
          <div className={`flex justify-end ${charCount == props.maxLength? 'text-red-500':''}`}>{`${charCount}/${props.maxLength}`}</div>
        }
      </>
      
    )
  }
)
Input.displayName = "Input"

export { Input }
