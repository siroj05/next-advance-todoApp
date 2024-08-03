"use client";
import { Button } from "@/components/ui/button-ui";
import { Input } from "@/components/ui/input-ui";
import { loginApi, registerApi } from "../_api/auth/api";
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { setCookie, getCookie} from 'cookies-next';

interface Props {
  isLogin: boolean;
  setIsSuccess : (value : boolean) => void
}

export default function FormLogin({ 
  isLogin = true, 
  setIsSuccess
}: Props) {
  const ref = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();
  const [err, setErr] = useState<string>()
  const router = useRouter()

  return (
    <>
      {isLogin ? (
        <form 
        ref={ref}
        action={
          async (formData) => {
            let res = await loginApi(formData)
            ref.current?.reset()
            if(res.token){
              setErr('')
              router.push('/todo-app')
            }else{
              setErr(res.message)
            }
          }
        }>
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="name">Username</label>
              <Input
                id="name"
                type="text"
                name="username"
                placeholder="username"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                name="password"
              />
            </div>
            <div className="w-full">
              <Button className="bg-blue-700 text-white w-full">Sign In</Button>
              <Label className="mt-2 text-center flex justify-center text-sm text-red-600">
                {err}
              </Label>
            </div>
          </div>
        </form>
      ) : (
        <form
          ref={ref}
          action={async (formData) => {
            let res = await registerApi(formData);
            setIsSuccess(res?.success);
            ref.current?.reset();
          }}
        >
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="name">Full Name</label>
              <Input
                id="name"
                name="fullName"
                type="text"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label htmlFor="name">Username</label>
              <Input
                name="username"
                id="name"
                type="text"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Input
                name="password"
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <Button
              className="bg-blue-700 text-white w-full"
            >
              {pending ? <LoaderCircle className="w-4 h-4" /> : "Sign Up"}
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
