import { DetailListTodoModel } from "../_api/todo-list/type";

export const useInitialStatus = (data: any) => {
  const result = data.reduce(
      (acc: any, item: DetailListTodoModel, index: number) => {
        const status = item.status;
        acc[index] = status;
        return acc;
      },
      {})
  return result
};