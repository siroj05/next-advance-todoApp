"use server";
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

  const res = await fetch("http://localhost:1372/register", {
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

  const res = await fetch("http://localhost:1372/login",{
    method : "POST",
    headers: { "Content-Type": "application/json" },
    body : JSON.stringify(userLogin)
  })
  const data = await res.json()
  if(res.status == 200){
    return data
  }else{
    return data
  }

}
