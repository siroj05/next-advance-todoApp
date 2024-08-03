"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  XCircle,
  CirclePlus, 
  Check
} from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import GetToken from "@/app/_api/token";
import { getStatus } from "@/app/_api/status/api";
import { Button } from "../ui/button-ui";
import { status } from "@/app/_api/status/type";

interface Props {
  setValue : (value : any) => void
  value : any
  readonly?: boolean
}

export function ComboboxStatus(
  {
    setValue,
    value,
    readonly = false
  }:Props
) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState<any>();
  const cookie = GetToken();

  React.useEffect(() => {
    async function get() {
      const res = await getStatus(cookie.token);
      setData(res);
    }
    get();
  }, []);

  const selected = data?.find((item: status) => item?.statusCode === value)?.statusName
  let Icon = data?.find((item: status) => item?.statusCode === value)?.icon

  let SelectedIcon 
  if( Icon == 'ArrowUpCircle') {SelectedIcon = ArrowUpCircle}
  else if(Icon == 'CheckCircle2') {SelectedIcon = CheckCircle2}
  else if (Icon == 'Circle'){SelectedIcon = Circle}
  else if (Icon == 'HelpCircle' ){SelectedIcon = HelpCircle}
  else if(Icon == 'XCircle') {SelectedIcon = XCircle}
  else {SelectedIcon = CirclePlus}
  return (
    <div className="flex items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            // size="sm"
            className={`w-[150px] ${readonly? 'bg-orange-50' : 'bg-white'} rounded-md`}
          >
            {value ? (
              <>
                <SelectedIcon className="mr-2 h-4 w-4 shrink-0 text-black" />
                {selected}
              </>
            ) : (
              <>+ Set status</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 bg-gray-50 text-gray-700" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {data?.map((data:status) => (
                  <CommandItem
                    key={data.statusCode}
                    value={data.statusCode}
                    onSelect={() => {
                      setValue(data.statusCode)
                      setOpen(false)
                    }}
                  >
                   {<Check
                      className={cn(
                        "mr-2 h-4 w-4 text-black",
                        value === data.statusCode
                          ? "opacity-100"
                          : "opacity-40"
                      )}
                    />}
                    <span>{data.statusName}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
