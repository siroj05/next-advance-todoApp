import { CircleCheck } from 'lucide-react'
import React from 'react'

export default function ToastSuccess() {
  return (
    <div className="inline-block fixed bottom-0 w-[400px] bg-white border-b-4 rounded border-green-400 z-50 shadow-md">
          <div className="p-6 flex">
            <CircleCheck className="text-green-400 w-8 h-8"/>
            <span className="my-auto ml-1">
              Updated successfully!
            </span> 
          </div>
        </div>
  )
}
