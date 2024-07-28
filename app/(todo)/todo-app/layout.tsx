import Sidebar from "@/components/sidebar";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <div className="flex min-h-dvh">
          <Sidebar />
        <div className="p-10 w-full overflow-auto">{children}</div>
      </div>
    </>
  );
}
