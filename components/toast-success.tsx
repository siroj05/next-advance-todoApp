import { CircleCheck } from 'lucide-react'
import React, { ReactNode } from 'react'

interface Props {
  children : ReactNode
}

export default function ToastSuccess({children}:Props) {
  return (
    <div className="inline-block fixed bottom-0 w-[400px] bg-gray-50 border-b-4 rounded border-green-400 z-50 shadow-xl">
          <div className="p-6 flex">
            <CircleCheck className="text-green-400 w-8 h-8"/>
            <span className="my-auto ml-1 text-green-600">
              {children}
            </span> 
          </div>
        </div>
  )
}
