import { LucideIcon, X } from 'lucide-react';
import React from "react";

interface Props {
  total? : number
  status : string
  color : string
  Icon : LucideIcon
}

export default function StatusTask({
  total = 0,
  status,
  color,
  Icon
}:Props) {
  return (
    <div className="border rounded-xl p-3 w-[250px] flex justify-between my-1">
      <div>
        <div className="text-gray-500 text-sm">{status}</div>
        <div className="font-bold my-2">{total}</div>
      </div>
      <div className="my-auto">
        <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center`}>
          <Icon className=" text-white" />
        </div>
      </div>
    </div>
  );
}
