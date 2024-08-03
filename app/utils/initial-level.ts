import { DetailListTodoModel } from "../_api/todo-list/type";

export const useInitialLevel = (data: any) => {
  const result = data.reduce(
      (acc: any, item: DetailListTodoModel, index: number) => {
        const level = item.level;
        acc[index] = level;
        return acc;
      },
      {})
  return result
};