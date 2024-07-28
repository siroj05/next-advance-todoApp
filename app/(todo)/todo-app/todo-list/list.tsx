"use client";
import { Accordions } from "@/components/accordion";
import { Input } from "@/components/ui/input-ui";
import { Textarea } from "@/components/ui/text-area";
import React, { useEffect, useState } from "react";
import AddTodoButton from "./add-todo";
import { DetailListTodoModel } from "@/app/_api/todo-list/type";
import { DeleteTodoApi, EditTodoApi } from "@/app/_api/todo-list/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus } from "lucide-react";
import ToastSuccess from "@/components/toast-success";
import { SquarePen } from "lucide-react";
import { Trash2 } from "lucide-react";
import { DatePicker, getDDMMYYY } from "@/components/date-picker";

interface Props {
  ListTodo: any;
  token: string;
}

export default function ListTodo({ ListTodo, token }: Props) {
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
  const [todos, setTodos] = useState<DetailListTodoModel[]>([]);
  const [dates, setDates] = useState<Record<number, Date>>({});
  const [isSuccess, setIsSuccess] = useState<any>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);

  useEffect(() => {
    setTodos(ListTodo);
    const parseDate = (dateString: string): Date => {
      const [day, month, year] = dateString.split("-").map(Number);
      return new Date(year, month - 1, day);
    };

    const initialDates = ListTodo.reduce(
      (acc: Record<number, Date>, item: DetailListTodoModel, index: number) => {
        const date = parseDate(item.start_date);
        if (isNaN(date.getTime())) {
          console.error(
            `Invalid date format for item at index ${index}:`,
            item.start_date
          );
        } else {
          acc[index] = date;
        }
        return acc;
      },
      {}
    );
    setDates(initialDates);
  }, [ListTodo]);

  if (isSuccess) {
    setTimeout(() => {
      setIsSuccess(false);
    }, 1000);
  }

  const handleClicAccordion = (e: any) => {
    // console.log('ok')
    const target = e.currentTarget;
    const state = target.getAttribute("data-state");
    if (state === "closed") setIsReadOnly(true);
    // console.log(isSuccess)
    // if (isSuccess?.success){
    //   console.log('masuk')
    //   target.setAttribute("data-state", "closed");
    // }
  };

  const handleClick = () => {
    setIsReadOnly(!isReadOnly);
  };

  return (
    <>
      <form
        action={async (formData) => {
          if (!isDelete) {
            let res = await EditTodoApi(token, formData);
            setIsSuccess(res);
          } else {
            let res = await DeleteTodoApi(token, formData);
            setIsSuccess(res);
            setIsDelete(false);
          }
        }}
      >
        <Accordion type="single" collapsible className="w-full my-2">
          {todos.map((item: DetailListTodoModel, i: number) => (
            <AccordionItem
              onClick={(e) => handleClicAccordion(e)}
              key={i}
              value={`item-${i + 1}`}
            >
              <AccordionTrigger className="text-sm mx-2 flex my-2">
                <Plus className="w-4 h-4 my-auto" />
                <span className="mx-2">{item.title}</span>
              </AccordionTrigger>
              <AccordionContent className="my-1 mx-2">
                <div className="flex justify-end w-full gap-1">
                  {isReadOnly ? (
                    <AddTodoButton
                      className="bg-blue-600"
                      variant="edit"
                      type="submit"
                      onClick={handleClick}
                    >
                      <SquarePen className="w-3 h-4" />
                    </AddTodoButton>
                  ) : (
                    <AddTodoButton
                      className="bg-blue-600"
                      variant="edit"
                      type="button"
                      onClick={handleClick}
                    >
                      <SquarePen className="w-3 h-4" />
                    </AddTodoButton>
                  )}
                  <AddTodoButton
                    className="bg-red-600"
                    variant="edit"
                    type="submit"
                    onClick={() => setIsDelete(true)}
                  >
                    <Trash2 className="w-3 h-4" />
                  </AddTodoButton>
                </div>
                <input type="hidden" name="userId" value={item.userId} />
                <input type="hidden" name="id" value={item.id} />
                <input
                  type="hidden"
                  name="startDate"
                  value={dates ? getDDMMYYY(dates[i]) : ""}
                />
                <Input
                  className="my-1"
                  id="title"
                  name="title"
                  placeholder="Write Title"
                  readOnly={isReadOnly}
                  defaultValue={item.title}
                />
                <Textarea
                  readOnly={isReadOnly}
                  id="description"
                  name="description"
                  placeholder="Write Description"
                  defaultValue={item.description}
                  className="my-2"
                />
                <DatePicker
                  readonly={isReadOnly}
                  date={dates[i]}
                  setDate={(date) =>
                    setDates((prev: any) => ({ ...prev, [i]: date }))
                  }
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </form>
      <div className="flex justify-end">
        {isSuccess?.success && (
          <ToastSuccess>{isSuccess?.message}</ToastSuccess>
        )}
      </div>
    </>
  );
}
