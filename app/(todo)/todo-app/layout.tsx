import Sidebar from "@/components/sidebar";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <div className="lg:flex">
        <Sidebar />
        <div className="w-full sm:p-5 lg:my-10 overflow-auto">{children}</div>
      </div>
    </>
  );
}
