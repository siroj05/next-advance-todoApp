"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

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
import { getLevelTodo } from "@/app/_api/todo-list/api";
import { Button } from "../ui/button-ui";
import { levelTodo } from "@/app/_api/todo-list/type";
import { Input } from "../ui/input-ui";

interface Props {
  setValue : (value : any) => void
  value : any
  readonly?: boolean
}

export function ComboboxLevel(
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
      const res = await getLevelTodo(cookie.token);
      setData(res);
    }
    get();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-[200px] justify-between ${readonly? 'bg-orange-50' : 'bg-white'} rounded-md`}
          disabled={readonly}
        >
          {value
            ? data?.find((item: levelTodo) => item.CodeLevel === value)?.levelName
            : "Select level..."}
          {
            !readonly &&
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          }
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-gray-50 text-gray-700">
        <Command>
          <Input type="text" name="" id="" placeholder="Search.." className="rounded-none border-none bg-gray-50 p-2"/>
          <CommandGroup>
            <CommandGroup>
              {data?.map((data: any, i:number) => (
                <CommandItem
                  key={i}
                  value={data}
                  onSelect={() => {
                    setValue(
                      data?.CodeLevel
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === data.CodeLevel
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {data.levelName}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
