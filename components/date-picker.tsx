"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Props {
  date? : Date,
  setDate: (value : Date | undefined) => void
  readonly?:boolean
}

export function DatePicker(
  {
    date,
    setDate,
    readonly=false
  }:Props
) {
  date = date ? new Date(date) : undefined
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            `w-[280px] justify-start text-left font-normal bg-white`,
            `${readonly? 'bg-orange-50' : 'bg-white'}`,
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        {!readonly && <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          className={`${readonly? 'bg-orange-50' : 'bg-white'}`}
          disabled={readonly}
        />}
      </PopoverContent>
    </Popover>
  )
}

export const getDDMMYYY = (date : Date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
};

