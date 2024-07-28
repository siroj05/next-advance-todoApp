import { Button } from "@/components/ui/button-ui";
import { LoaderCircle } from "lucide-react";
import React, { ReactNode } from "react";
import { useFormStatus } from "react-dom";

interface Props {
  children : ReactNode
  onClick? : () => void
  type? : 'submit' | 'button'
}

export default function AddTodoButton({children, onClick, type='submit'} : Props) {
  const { pending } = useFormStatus();
  return (
    <Button
      type={`${type}`}
      size={"sm"}
      className="bg-blue-600 my-1 w-24 p-2 rounded-sm text-white hover:bg-blue-800"
      onClick={onClick}
    >
      
      {pending ? <LoaderCircle className="w-4 h-4 animate-spin" /> : `${children}`}
    </Button>
  );
}
