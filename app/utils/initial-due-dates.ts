import { DetailListTodoModel } from "../_api/todo-list/type";
import parseDate from "./parse-date";

export const useInitialDueDates = (data: any) => {
  const result = data.reduce(
      (acc: Record<number, Date>, item: DetailListTodoModel, index: number) => {
        const date = parseDate(item.end_date);
        if (isNaN(date.getTime())) {
          console.error(
            `Invalid date format for item at index ${index}:`,
            item.start_date
          );
        } else {
          acc[index] = date;
        }
        return acc;
      },
    {}
  )
  return result
};