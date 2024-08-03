"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { deleteCookie } from "cookies-next";
import {
  LayoutList,
  CircleCheck,
  List,
  LayoutDashboard,
  ListTodo,
  X,
  ChevronsLeft,
  ChevronsRight,
  LogOut,
  Menu
} from "lucide-react";

export default function Sidebar() {
  const path = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const signOut = () => {
    deleteCookie("token");
    deleteCookie("nama");
    deleteCookie("userId");
    router.push("/auth", { scroll: false });
  };

  return (
   <>
    <div className="text-gray-600 relative lg:flex lg:justify-start sm:flex sm:justify-end  ">
      <div className="lg:w-full lg:absolute flex justify-end ml-8 sm:mx-10 my-2 z-50 sm:z-50">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <ChevronsLeft className="w-8 h-8" />
          ) : (
            <>
              <ChevronsRight className="w-8 h-8 sm:hidden lg:inline-block" />
              <Menu className="w-8 h-8 lg:hidden" />    
            </>
          )}
        </button>
      </div>
      <div
        className={`lg:sticky sm:fixed top-0  sm:z-50 h-screen bg-gray-100 border-white border-8 flex flex-col overflow-hidden transition-all ${
          isOpen ? "lg:w-[280px] sm:w-full overflow-y-auto" : "transition duration-300 ease-in-out w-0"
        } `}
      >
        <div className="p-4 sm:flex sm:justify-between">
          <h1 className="text-2xl font-bold">Menu</h1>
          <div className="lg:w-full flex justify-end ml-8 my-auto z-50 sm:z-50">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
                <>
                  <ChevronsLeft className="w-8 h-8 sm:hidden" />
                  <X className="w-8 h-8 lg:hidden" />    
                </>
            ) : (
              <ChevronsRight className="w-8 h-8" />
            )}
          </button>
      </div>
        </div>
        <nav className="mt-10">
          <Link
            href="/todo-app"
            className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800 hover:text-white mx-1 font-semibold
                ${path == "/todo-app" ? "bg-blue-800 text-white" : ""}
              `}
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
              className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800 hover:text-white mx-1
                ${path == "/todo-app/todo-list" ? "bg-blue-800 text-white" : ""}
              `}
              aria-disabled
            >
              <div className="flex">
                <List className="w-4 h-4 my-auto" />
                <span className="mx-3">My Task</span>
              </div>
            </Link>
            <Link
              href="#"
              className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800 hover:text-white mx-1
                ${path == "/todo-app/today" ? "bg-blue-800 text-white" : ""}
              `}
            >
              <div className="flex">
                <CircleCheck className="w-4 h-4 my-auto" />
                <span className="mx-3">Complete</span>
              </div>
            </Link>
            <a
              href="#"
              className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800 hover:text-white mx-1
                ${path == "/todo-app/upcoming" ? "bg-blue-800 text-white" : ""}
              `}
            >
              <div className="flex">
                <LayoutList className="w-4 h-4 my-auto" />
                <span className="mx-3">In Progress</span>
              </div>
            </a>
            <a
              href="#"
              className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800 hover:text-white mx-1
                ${path == "/todo-app/calendar" ? "bg-blue-800 text-white" : ""}
              `}
            >
              <div className="flex">
                <ListTodo className="w-4 h-4 my-auto" />
                <span className="mx-3">Todos</span>
              </div>
            </a>
            <a
              href="#"
              className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800 hover:text-white mx-1
                ${path == "/todo-app/calendar" ? "bg-blue-800 text-white" : ""}
              `}
            >
              <div className="flex">
                <X className="w-4 h-4 my-auto" />
                <span className="mx-3">Canceled</span>
              </div>
            </a>
          </div>
        </nav>
        <div className="mt-auto my-5">
          <button className="p-4 mx-1 flex" onClick={signOut}>
            <LogOut className="w-4 h-4 my-auto" />{" "}
            <span className="mx-1 font-semibold">Sign out</span>
          </button>
        </div>
      </div>
    </div>
   </>
  );
}
