import { useState } from "react";
import { TaskService } from "../Services/TaskService";

export const useDeleteTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteTask = async (taskId: string, onSuccess: () => void) => {
    setLoading(true);
    setError(null);
    try {
      await TaskService.deleteTask(taskId);
      onSuccess();
    } catch (err) {
      setError("Failed to delete task.");
    } finally {
      setLoading(false);
    }
  };

  return { deleteTask, loading, error };
};
