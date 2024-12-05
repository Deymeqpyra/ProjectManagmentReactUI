import { useState } from "react";
import { TaskService } from "../Services/TaskService";
import { ProjectTaskDto } from "../../../dto/ProjectTaskDto";

export const useFinishTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const taskService = new TaskService();

  const finishTask = async (
    taskId: string,
    onSuccess: (updatedTask: ProjectTaskDto) => void
  ) => {
    setLoading(true);
    setError(null);
    try {
      const updatedTask = await taskService.finishTask(taskId);
      onSuccess(updatedTask); // Call success callback to update UI
    } catch (err) {
      setError("Failed to mark task as completed.");
    } finally {
      setLoading(false);
    }
  };

  return { finishTask, loading, error };
};
