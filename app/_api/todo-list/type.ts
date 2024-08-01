export interface AddTodoModel {
  userId: number;
  title: string;
  description: string;
  level: string;
  start_date: string;
  end_date: string;
}

export interface DetailListTodoModel {
  description : string
  end_date : string
  start_date : string
  id : number
  level : string
  title : string
  userId : string
}