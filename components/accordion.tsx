'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Plus } from 'lucide-react';

import { ReactNode } from "react";

interface Props {
  children : ReactNode
  title : string
  className?: string
  countItem: string
  onClick? : (value : any) => void
}

export function Accordions({children, title, className, countItem, onClick} : Props) {
  
  return (
    <Accordion type="single" onClick={(e) => onClick? onClick(e) : onClick} collapsible className={`${className} w-full my-2`}>
      <AccordionItem value={`${countItem}`}>
        <AccordionTrigger className="text-sm mx-2 flex">
          <Plus className="w-4 h-4 my-auto"/><span className="mx-2">
            {title}</span>
        </AccordionTrigger>
        <AccordionContent className="my-1 mx-2">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
