"use server";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { AddTodoModel } from "./type";
import { redirect } from 'next/navigation'
import { url } from "@/app/utils/urls";
export const AddTodoApi = async (FormData: FormData) => {
  const title = FormData.get("title") as string;
  const description = FormData.get("description") as string;
  const level = FormData.get("level") as string;
  const userId = FormData.get("userId") as string;
  const token = FormData.get("token") as string;
  const startDate = FormData.get("startDate") as string;
  const dueDate = FormData.get("dueDate") as string;
  const status = FormData.get("status") as string;

  if(title.length > 50) return {validation : 'Max Length 10!'}
  if(description.length > 1000) return {validation : 'Max Length 1000!'}

  const todo: AddTodoModel = {
    userId: parseInt(userId),
    title: title,
    description: description,
    level : level,
    start_date: startDate,
    end_date: dueDate,
    status:status
  };
  
  const res = await fetch(`${url}/addTodo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(todo),
  });

  const data = await res.json()
  if (res.status == 200) {
    revalidatePath('/todo-app/todo-list')
    return data
  } else {
    return data;
  }
};

export const ListTodoApi = async (token : string) => {
  const res = await fetch(`${url}/todos`,{
    method : 'GET',
    headers : {
      'Content-Type' : 'application/json',
      'Authorization' : `bearer ${token}`
    }
  })
  
  const data = await res.json()
  // console.log(res)
  if(res.status == 200){
    return data
  }
  else if(res.status == 403){
    return redirect('/auth')
  }
  else{
    return data
  }
}

export const EditTodoApi = async (token : string, FormData: FormData) => {

  const id = FormData.get('id')
  const title = FormData.get('title') as string
  const description = FormData.get('description') as string
  const startDate = FormData.get("startDate") as string;
  const dueDate = FormData.get("dueDate") as string;
  const level = FormData.get("level") as string;
  const status = FormData.get("status") as string;

  if(title.length > 50) return {validation : 'Max Length 10!'}
  if(description.length > 1000) return {validation : 'Max Length 1000!'}

  const editData = {
    title : title,
    description : description,
    level : level,
    start_date: startDate,
    end_date: dueDate,
    status : status
  }
  const res = await fetch(`${url}/editTodo/${id}`,{
    method : 'PUT',
    headers : {
      'Content-Type' : 'application/json',
      'Authorization' : `bearer ${token}`
    },
    body : JSON.stringify(editData)
  })
  
  const data = await res.json()

  if(res.status == 200){
    revalidatePath('/todo-app/todo-list')
    return data
  }else{
    return data
  }
}

export const DeleteTodoApi = async (token : string, FormData:FormData) => {
  const id = FormData.get('id') as string
  const res = await fetch(`${url}/deleteTodo/${id}`,{
    method : 'DELETE',
    headers : {
      'Content-Type' : 'application/json',
      'Authorization' : `bearer ${token}`
    }
  })
  const data = await res.json()
  if(res.status == 200){
    revalidatePath('/todo-app/todo-list')
    return data
  }else{
    return data
  }
}


