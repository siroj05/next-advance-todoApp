import { getCookie } from "cookies-next";

export default function GetToken(){
  return {userId : getCookie("userId"),
  token : getCookie("token")}
}