"use client";
import { AddTodoApi } from "@/app/_api/todo-list/api";
import { Button } from "@/components/ui/button-ui";
import { Input } from "@/components/ui/input-ui";
import { Textarea } from "@/components/ui/text-area";
import { setCookie, getCookie } from "cookies-next";
import { useRef, useState } from "react";
import AddTodoButton from "./add-todo";
import ToastSuccess from "@/components/toast-success";
import { DatePicker } from "@/components/date-picker";
import { getDDMMYYY } from "@/components/date-picker";
import { ComboboxLevel } from "@/components/combobox/combobox";

export default function FormAddTodo() {
  const ref = useRef<HTMLFormElement>(null);
  const userId = getCookie("userId");
  const token = getCookie("token");
  const [isSuccess, setIsSuccess] = useState<any>();
  const [date, setDate] = useState<Date>()
  const [level, setLevel] = useState<any>()

  if (isSuccess) {
    setTimeout(() => {
      setIsSuccess(false);
    }, 1000);
  }
  
  return (
    <>
      <form
        className="text-gray-700"
        ref={ref}
        action={async (formData) => {
          let res = await AddTodoApi(formData);
          // console.log(res)
          setIsSuccess(res);
          if(!res?.error?.length){
            setDate(undefined)
            setLevel('')
            ref.current?.reset();
          }
        }}
      >
        <input type="hidden" name="userId" value={userId} />
        <input type="hidden" name="token" value={token} /> 
        <input type="hidden" name="level" value={level} /> 
        <input type="hidden" name="startDate" value={date ? getDDMMYYY(date) : ''} /> 
        <Input
          className="my-1"
          id="title"
          name="title"
          placeholder="Write Title"
          maxLength={50}
        />
        <Textarea
          id="description"
          name="description"
          placeholder="Write Description"
          className="my-2"
          maxLength={1000}
        />
        <div className="flex gap-1">
          <DatePicker
            date={date}
            setDate={setDate}
          />
          <ComboboxLevel
            setValue={setLevel}
            value={level}
          />
        </div>
        <div className="flex justify-end w-full">
          <AddTodoButton>Save</AddTodoButton>
        </div>
      </form>
      <div className="flex justify-end">
        {isSuccess?.success && (
          <>
            <ToastSuccess>{isSuccess?.message}</ToastSuccess>
          </>
        )}
      </div>
    </>
  );
}
