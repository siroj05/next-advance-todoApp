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
import { Label } from "@/components/ui/label";

export default function FormAddTodo() {
  const ref = useRef<HTMLFormElement>(null);
  const userId = getCookie("userId");
  const token = getCookie("token");
  const [isSuccess, setIsSuccess] = useState<any>();
  const [date, setDate] = useState<Date>()
  const [dueDate, setDueDate] = useState<Date>()
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
          setIsSuccess(res);
          if(!res?.error?.length){
            setDate(undefined)
            setDueDate(undefined)
            setLevel('')
            ref.current?.reset();
          }
        }}
      >
        <input type="hidden" name="userId" value={userId} />
        <input type="hidden" name="token" value={token} /> 
        <input type="hidden" name="level" value={level} /> 
        <input type="hidden" name="startDate" value={date ? getDDMMYYY(date) : ''} /> 
        <input type="hidden" name="dueDate" value={dueDate ? getDDMMYYY(dueDate) : ''} /> 
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
          <div>
            <Label className="block my-1">Start Date</Label>
            <DatePicker
              date={date}
              setDate={setDate}
              label="Pick a Date"
            />
          </div>
          <div>
            <Label className="block my-1">Due Date</Label>
            <DatePicker
              date={dueDate}
              setDate={setDueDate}
              label="Pick a Date"
            />
          </div>
          <div className="mt-auto">
            <ComboboxLevel
              setValue={setLevel}
              value={level}
            />  
          </div>
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
