import { useState } from "react";
import { TaskService } from "../Services/TaskService";
import { ProjectTaskDto } from "../../../dto/ProjectTaskDto";

export const useFinishTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const finishTask = async (
    taskId: string,
    onSuccess: (updatedTask: ProjectTaskDto) => void
  ) => {
    setLoading(true);
    setError(null);
    try {
      const updatedTask = await TaskService.finishTask(taskId);
      onSuccess(updatedTask);
    } catch (err) {
      setError("Failed to mark task as completed.");
    } finally {
      setLoading(false);
    }
  };

  return { finishTask, loading, error };
};
