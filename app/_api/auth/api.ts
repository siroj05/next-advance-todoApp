"use server";
import { url } from '@/app/utils/urls';
import { cookies } from 'next/headers'
export interface userRegis {
  name : string
  username : string
  password : string
}

export interface userLogin {
  username : string
  password : string
}

export const registerApi = async (FormData: FormData) => {
  const fullName = FormData.get("fullName") as string;
  const username = FormData.get("username") as string;
  const password = FormData.get("password") as string;

  let dataUser : userRegis = {
    name : fullName,
    username : username,
    password : password
  }
  
  const res = await fetch(`${url}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataUser),
  });

  if (!res.ok) {
    throw new Error('Login Failed!');
  }

  const data = await res.json()

  return data

};

export const loginApi = async (FormData : FormData) => {

  const username = FormData.get("username") as string;
  const password = FormData.get("password") as string;

  let userLogin : userLogin = {
    username : username,
    password : password
  }

  const res = await fetch(`${url}/auth/login`,{
    method : "POST",
    headers: { "Content-Type": "application/json" },
    body : JSON.stringify(userLogin)
  })

  const data = await res.json()
  const maxAge = 60 * 60 * 1000
  cookies().set('token', data.token, { expires: Date.now() + maxAge });
  cookies().set('nama', data.name, { expires: Date.now() + maxAge });
  cookies().set('userId', data.userId, { expires: Date.now() + maxAge });
  
  if(res.status == 200){
    return data
  }else{
    return data
  }

}
