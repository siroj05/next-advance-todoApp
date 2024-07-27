"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card-ui";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import FormLogin from "@/app/auth/form";

interface Props {
  setIsSuccess : (value : boolean) => void
}

export default function CardLoginForm(
  {setIsSuccess} : Props
) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Card className="w-[420px] p-3 bg-white rounded-none shadow-lg">
      <CardHeader>
        <CardTitle>{isLogin ? "Sign In" : "Sign Up"}</CardTitle>
        <CardDescription>Hi, Welcome Back!</CardDescription>
      </CardHeader>
      <CardContent>
        <FormLogin isLogin={isLogin} setIsSuccess={setIsSuccess}/>
      </CardContent>
      <CardFooter className="flex justify-center w-full">
        {
          isLogin?
          <>
            <div className="text-sm text-center ">Not registered yet?</div>
              <button
                onClick={() => setIsLogin(false)}
                className="text-blue-700 ml-1 flex"
              >
                Create an account <ExternalLink className="w-4 h-3 my-auto" />
              </button>  
            </>
          :
          <>
            <div className="text-sm text-center ">Already have account?</div>
            <button
              onClick={() => setIsLogin(true)}
              className="text-blue-700 ml-1 flex"
            >
              Sign In <ExternalLink className="w-4 h-3 my-auto" />
            </button>  
          </>
        }
      </CardFooter>
    </Card>
  );
}
