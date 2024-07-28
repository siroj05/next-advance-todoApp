'use client'
import { Search } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { List } from "lucide-react";
import { CalendarCheck2 } from "lucide-react";
import { BetweenHorizontalStart } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { Input } from "@/components/ui/input-ui";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { ChevronsLeft } from 'lucide-react';
import { ChevronsRight } from 'lucide-react';
import { useState } from "react";
export default function Sidebar() {
  const path = usePathname()
  const [isOpen, setIsOpen] = useState<boolean>(true)
  return (
    <div className="text-black relative">
        <div className="w-full absolute flex justify-end ml-8 my-2">
          <button onClick={() => setIsOpen(!isOpen)}>{isOpen? <ChevronsLeft className="w-8 h-8"/> : <ChevronsRight className="w-8 h-8"/>}</button>
        </div>
      <div className={`sticky top-0 w-[280px] h-screen bg-white border-orange-50 border-8 ${isOpen? 'overflow-y-auto' : 'hidden'}`}>
        <div className="p-4">
          <h1 className="text-2xl font-bold">Menu</h1>
        </div>
        <div className="mx-3 relative">
          <Input
            id="search"
            name="search"
            placeholder="Search"
            className="bg-stone-200 border-orange-50"
          />
          <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400 outline-none text-sm " />
        </div>
        <nav className="mt-10">
          <Link
            href="/todo-app"
            className="font-semibold block py-2.5 px-4 my-4 rounded transition duration-200"
          >
            <div className="flex">
              <LayoutDashboard className="w-4 h-4 my-auto" />{" "}
              <span className="my-auto mx-3">Dashboard</span>
            </div>
          </Link>
          <div className="font-bold px-3 text-xs my-3">TASKS</div>
          <div className="text-sm">
            <Link
              href="/todo-app/todo-list"
              className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white mx-1
                ${path == '/todo-app/todo-list'? 'bg-gray-700 text-white' : ''}
              `}
              
              aria-disabled
            >
              <div className="flex">
                <List className="w-4 h-4 my-auto" />
                <span className="mx-3">Todo List</span>
              </div>
            </Link>
            <Link
              href="#"
              className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white mx-1
                ${path == '/todo-app/today'? 'bg-gray-700 text-white' : ''}
              `}
            >
              <div className="flex">
                <CalendarCheck2 className="w-4 h-4 my-auto" />
                <span className="mx-3">Today</span>
              </div>
            </Link>
            <a
              href="#"
              className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white mx-1
                ${path == '/todo-app/upcoming'? 'bg-gray-700 text-white' : ''}
              `}
            >
              <div className="flex">
                <BetweenHorizontalStart className="w-4 h-4 my-auto" />
                <span className="mx-3">Upcoming</span>
              </div>
            </a>
            <a
              href="#"
              className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white mx-1
                ${path == '/todo-app/calendar'? 'bg-gray-700 text-white' : ''}
              `}
            >
              <div className="flex">
                <CalendarDays className="w-4 h-4 my-auto" />
                <span className="mx-3">Calendar</span>
              </div>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
