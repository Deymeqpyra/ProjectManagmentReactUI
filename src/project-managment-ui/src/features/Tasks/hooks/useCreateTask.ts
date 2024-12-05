import{ useCallback } from 'react'
import { TaskService } from '../Services/TaskService';
import { CategoryService } from '../../Category/Service/CategoryService';
import { CreateTaskDto } from '../../../dto/CreateTaskDto';
const useCreateTask = () => {
  
    const createTask = useCallback(async (projectId: string, taskData: CreateTaskDto) => {
      try {
        const newTask = await TaskService.createTask(projectId, taskData);
        return newTask;
      } catch (err) {
        console.error(err);
        throw err;
      }
    }, []);
  
    const fetchCategories = useCallback(async () => {
      try {
        const categoriesResponse = await CategoryService.getCategories();
        return categoriesResponse;
      } catch (err) {
        console.error(err);
        throw err;
      }
    }, []);
  
    return { createTask, fetchCategories };
  };
  
  export default useCreateTask;
  