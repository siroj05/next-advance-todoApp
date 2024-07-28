"use server";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { AddTodoModel } from "./type";

export const AddTodoApi = async (FormData: FormData) => {
  const title = FormData.get("title") as string;
  const description = FormData.get("description") as string;
  const userId = FormData.get("userId") as string;
  const token = FormData.get("token") as string;
  const todo: AddTodoModel = {
    userId: parseInt(userId),
    title: title,
    description: description,
    start_date: "05-08-2024",
    end_date: "07-09-2024",
  };

  const res = await fetch("http://localhost:1372/addTodo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(todo),
  });

  const data = await res.json()
  // console.log(data)
  if (res.status == 200) {
    // return data
    revalidatePath('/todo-app/todo-list')
  } else {
    return data;
  }
};

export const ListTodoApi = async (token : string) => {
  const res = await fetch('http://localhost:1372/todos',{
    method : 'GET',
    headers : {
      'Content-Type' : 'application/json',
      'Authorization' : `bearer ${token}`
    }
  })
  const data = res.json()
  if(res.status == 200){
    return data
  }else{
    return data
  }
}

export const EditTodoApi = async (token : string, FormData: FormData) => {

  const id = FormData.get('id')
  const title = FormData.get('title') as string
  const description = FormData.get('description') as string
  console.log(FormData)
  
  const editData = {
    title : title,
    description : description
  }

  const res = await fetch(`http://localhost:1372/editTodo/${id}`,{
    method : 'PUT',
    headers : {
      'Content-Type' : 'application/json',
      'Authorization' : `bearer ${token}`
    },
    body : JSON.stringify(editData)
  })
  const data = await res.json()
  console.log(data)
  if(res.status == 200){
    revalidatePath('/todo-app/todo-list')
    return data
  }else{
    return data
  }
}


