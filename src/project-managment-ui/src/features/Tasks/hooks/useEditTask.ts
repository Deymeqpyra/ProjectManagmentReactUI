import { useState } from "react";
import { TaskService } from "../Services/TaskService";
import { ProjectTaskDto } from "../../../dto/ProjectTaskDto";

export const useEditTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const taskService = new TaskService();

  const editTask = async (
    taskId: string,
    updatedData: Partial<ProjectTaskDto>,
    onSuccess: (updatedTask: ProjectTaskDto) => void
  ) => {
    setLoading(true);
    setError(null);
    try {
      const updatedTask = await taskService.finishTask(taskId); 
      onSuccess(updatedTask);
    } catch (err) {
      setError("Failed to edit task.");
    } finally {
      setLoading(false);
    }
  };

  return { editTask, loading, error };
};
