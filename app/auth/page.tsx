'use client'
import CardLoginForm from "@/components/card-login";
import ToastAuth from "@/components/toast-auth";
import { useState } from "react";

export default function Home() {
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  if(isSuccess){
    setTimeout(() => {
      setIsSuccess(false)
    }, 5000);
  }
  return (
    <main className="min-h-dvh">
      <div className="flex justify-end">
        {
          isSuccess &&
          <ToastAuth />
        }
      </div>
      <div className="mx-auto h-screen w-full flex items-center justify-center">
        <CardLoginForm setIsSuccess={setIsSuccess} />
      </div>
    </main>
  );
}
