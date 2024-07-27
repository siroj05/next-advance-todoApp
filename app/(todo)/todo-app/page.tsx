import { Input } from '@/components/ui/input-ui'
import React from 'react'
import { Search } from 'lucide-react';

export default function DashBoard() {
  return (
    <div className='text-black'>
      <div className="w-60 h-screen bg-stone-200 ">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Menu</h1>
      </div>
      <div className='mx-3 relative'>
        <Input id='search' name='search' placeholder='Search' className='bg-stone-200 border-orange-50'/>
        <Search className='w-4 h-4 absolute right-3 top-3 text-slate-400 outline-none text-sm '/>
      </div>
      <nav className="mt-10">
        <div className='font-semibold px-3 text-xs'>
          TASKS
        </div>
        <div className='text-sm'>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            Dashboard
          </a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            Profile
          </a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            Settings
          </a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            Logout
          </a>
        </div>
      </nav>
    </div>
    </div>
  )
}
