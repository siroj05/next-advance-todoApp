'use server'
import React from 'react'
import { cookies } from 'next/headers';
import { ListTodoApi } from '@/app/_api/todo-list/api';
import { DetailListTodoModel } from '@/app/_api/todo-list/type';
import StatusTask from '@/components/dashboard/status-task';
import { Check, ClipboardList, LayoutList, ListTodo, X } from 'lucide-react';


export default async function DashBoard() {

  const nextCookies = cookies()
  const token = nextCookies.get('token')
  if(!token) {
    throw new Error("Missing token")
  }
  const listTodo = await ListTodoApi(token.value)
  let totalComplete = listTodo.filter((item : DetailListTodoModel) => item.status == 'DONE')
  let totalInProgress = listTodo.filter((item : DetailListTodoModel) => item.status == 'INPROGRESS')
  let todos = listTodo.filter((item : DetailListTodoModel) => item.status == 'TODO')
  let canceled = listTodo.filter((item : DetailListTodoModel) => item.status == 'CANCELED')

  return (
    <>
      <div className='
      p-10 
      lg:flex lg:gap-2 lg:justify-center
      md:grid md:grid-cols-2 md:justify-items-center
      '>
        <StatusTask
          total={listTodo?.length}
          color='bg-blue-800'
          status='TOTAL TASK'
          Icon={ClipboardList}
        />
        <StatusTask
          total={todos?.length}
          color='bg-indigo-600 '
          status='TODOS'
          Icon={ListTodo}
        />
        <StatusTask
          total={totalInProgress?.length}
          color='bg-yellow-400'
          status='TASK IN PROGRESS'
          Icon={LayoutList}
        />
        <StatusTask
          total={totalComplete?.length}
          color='bg-green-400'
          status='COMPLETE TASK'
          Icon={Check}
        />
        <StatusTask
          total={canceled?.length}
          color='bg-red-500'
          status='CANCELED'
          Icon={X}
        />
      </div>
    </>
  )
}
