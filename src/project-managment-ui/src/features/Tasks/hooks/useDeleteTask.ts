import { useState } from "react";
import { TaskService } from "../Services/TaskService";

export const useDeleteTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const taskService = new TaskService();

  const deleteTask = async (taskId: string, onSuccess: () => void) => {
    setLoading(true);
    setError(null);
    try {
      await taskService.deleteTask(taskId);
      onSuccess(); // Call success callback to update UI
    } catch (err) {
      setError("Failed to delete task.");
    } finally {
      setLoading(false);
    }
  };

  return { deleteTask, loading, error };
};
