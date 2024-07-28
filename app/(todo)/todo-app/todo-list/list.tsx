"use client";
import { Accordions } from "@/components/accordion";
import { Input } from "@/components/ui/input-ui";
import { Textarea } from "@/components/ui/text-area";
import React, { useEffect, useState } from "react";
import AddTodoButton from "./add-todo";
import { DetailListTodoModel } from "@/app/_api/todo-list/type";
import { EditTodoApi } from "@/app/_api/todo-list/api";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Plus } from "lucide-react";
import ToastSuccess from "@/components/toast-success";

interface Props {
  ListTodo: any;
  token: string;
}

export default function ListTodo({ ListTodo, token }: Props) {
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
  const [todos, setTodos] = useState<[]>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  if(isSuccess){
    setTimeout(() => {
      setIsSuccess(false)
    }, 1000);
  }

  useEffect(() => {
    setTodos(ListTodo)
  },[ListTodo])

  const handleClicAccordion = (e: any) => {
    const target = e.currentTarget;
    const childWithDataState = target.querySelector("[data-state]");
    if (childWithDataState) {
      const state = childWithDataState.getAttribute("data-state");
      if (state == "closed") setIsReadOnly(true);
    }
  };

  return (
    <>
      <form
        action={async (formData) => {
          let res = await EditTodoApi(token, formData);
          setIsSuccess(res?.success)
        }}
      >
        <Accordion type="single" 
        onClick={(e) => handleClicAccordion(e)}
         collapsible className={`w-full my-2`}>
        {todos?.map((item: DetailListTodoModel, i: number) => (
          <>
              <AccordionItem key={i} value={`item-${i+1}`}>
                <AccordionTrigger className="text-sm mx-2 flex my-2">
                  <Plus className="w-4 h-4 my-auto"/><span className="mx-2">
                    {item.title}</span>
                </AccordionTrigger>
                <AccordionContent className="my-1 mx-2">
                    <input type="hidden" name="userId" value={item.userId} />
                    <input type="hidden" name="id" value={item.id} />
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
                    />
                    <div className="flex justify-end w-full">
                      
                      {
                        isReadOnly? 
                        <AddTodoButton type="submit" onClick={() => setIsReadOnly(false)}>
                          Edit
                        </AddTodoButton> : 
                        <AddTodoButton type="button" onClick={() => setIsReadOnly(true)}>
                          Save
                        </AddTodoButton>
                      }
                    </div>
                </AccordionContent>
              </AccordionItem>
          </>
        ))}
        </Accordion>
      </form>
      <div className="flex justify-end">
        {
          isSuccess &&
          <ToastSuccess />
        }
      </div>
    </>
  );
}
