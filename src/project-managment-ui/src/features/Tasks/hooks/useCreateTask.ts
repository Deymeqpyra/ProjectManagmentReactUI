import{ useCallback, useMemo } from 'react'
import { TaskService } from '../Services/TaskService';
import { CategoryService } from '../../Category/Service/CategoryService';
import { CreateTaskDto } from '../../../dto/CreateTaskDto';
const useCreateTask = () => {
    const taskService = useMemo(() => new TaskService(), []);
    const categoryService = useMemo(() => new CategoryService(), []);
  
    const createTask = useCallback(async (projectId: string, taskData: CreateTaskDto) => {
      try {
        const newTask = await taskService.createTask(projectId, taskData);
        return newTask;
      } catch (err) {
        console.error(err);
        throw err;
      }
    }, [taskService]);
  
    const fetchCategories = useCallback(async () => {
      try {
        const categoriesResponse = await categoryService.getCategories();
        return categoriesResponse;
      } catch (err) {
        console.error(err);
        throw err;
      }
    }, [categoryService]);
  
    return { createTask, fetchCategories };
  };
  
  export default useCreateTask;
  