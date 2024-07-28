'use server'
import { Accordions } from "@/components/accordion";
import FormAddTodo from "./form";
import ListTodo from "./list";
import { cookies } from 'next/headers'
import { ListTodoApi } from "@/app/_api/todo-list/api";
export default async function TodoList() {
  const nextCookies = cookies(); // Get cookies object
  const token = nextCookies.get('token') // Find cookie
  if(!token) {
    throw new Error("Missing token")
  }
  const listTodo = await ListTodoApi(token.value)
  return (
    <div>
      <div className="text-4xl font-bold">Todo List</div>
      <div className="p-4 w-full border my-10 rounded-md ">
        <div className="font-semibold">Today</div>
          <Accordions countItem={`item-1`} title="Add New Task" className="bg-gray-700 border-gray-700 border-2 text-white">
            <FormAddTodo/>
          </Accordions>
          <ListTodo ListTodo={listTodo} token={token.value}/>
      </div>
    </div>
  )
}
