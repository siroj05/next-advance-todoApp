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
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation'
import { deleteCookie } from 'cookies-next';
export default function Sidebar() {
  const path = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const signOut = () => {
    deleteCookie('token');
    deleteCookie('nama');
    deleteCookie('userId');
    router.push('/auth', { scroll: false })

  }

  return (
    <div className="text-gray-600 relative">
        <div className="w-full absolute flex justify-end ml-8 my-2">
          <button onClick={() => setIsOpen(!isOpen)}>{isOpen? <ChevronsLeft className="w-8 h-8"/> : <ChevronsRight className="w-8 h-8"/>}</button>
        </div>
      <div className={`sticky top-0 w-[280px] h-screen bg-gray-100 border-white border-8 flex flex-col ${isOpen? 'overflow-y-auto' : 'hidden'}`}>
        <div className="p-4">
          <h1 className="text-2xl font-bold">Menu</h1>
        </div>
        <div className="mx-3 relative">
          <Input
            id="search"
            name="search"
            placeholder="Search"
            className="bg-gray-100 border-gray-300"
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
        <div className="mt-auto my-5">
          <button className="p-4 mx-1 flex" onClick={signOut}>
           <LogOut className="w-4 h-4 my-auto"/> <span className="mx-1 font-semibold">Sign out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
