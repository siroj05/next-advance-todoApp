import { url } from "@/app/utils/urls";

export const getLevelTodo = async (token : any) => {
  try {
      const res = await fetch(`${url}/levelPriority`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      return data
    } catch (error) {
      console.error('Fetch error:', error);
    }
}
