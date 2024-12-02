
export interface ProjectTaskDto {
  taskId: string | null;
  title: string;
  completed: boolean | null;
  description: string;
  categoryId: string;
  category:{
    categoryId: string;
    name: string;
  };
  userTask:{
    userId: string;
    username: string;
  }
}
