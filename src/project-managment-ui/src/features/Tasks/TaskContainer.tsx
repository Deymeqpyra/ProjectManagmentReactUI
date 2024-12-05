import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDeleteTask } from "./hooks/useDeleteTask";
import { useFinishTask } from "./hooks/useFinishTask";
import { TaskService } from "./Services/TaskService";
import { ProjectTaskDto } from "../../dto/ProjectTaskDto";
import CreateTask from "./Components/CreateTask";
import TaskCardList from "./Components/TaskCardList";
import "./TaskContainer.css"

const TaskContainer: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [tasks, setTasks] = useState<ProjectTaskDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false); // State to control modal visibility
  const { deleteTask } = useDeleteTask();
  const { finishTask } = useFinishTask();

  useEffect(() => {
    const fetchTasks = async () => {
      if (!projectId) {
        setError("Project ID is missing.");
        setLoading(false);
        return;
      }
      try {
        const taskData = await TaskService.getTasksByProjectId(projectId);
        setTasks(taskData);
      } catch (err) {
        setError("Failed to fetch tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [projectId]);

  const handleTaskDeleted = (taskId: string) => {
    deleteTask(taskId, () => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
    });
  };

  const handleTaskCompleted = (taskId: string) => {
    finishTask(taskId, (updatedTask) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.taskId === taskId ? updatedTask : task
        )
      );
    });
  };

  const handleTaskCreated = (newTask: ProjectTaskDto) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setShowModal(false); 
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="task-container">
      <button onClick={() => setShowModal(true)} className="open-modal-button">
        Create Task
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              onClick={() => setShowModal(false)}
              className="close-modal-button"
            >
              &times;
            </button>
            <CreateTask
              projectId={projectId!}
            />
          </div>
        </div>
      )}

      <TaskCardList
        tasks={tasks}
        onDelete={handleTaskDeleted}
        onMarkAsCompleted={handleTaskCompleted}
      />
    </div>
  );
};

export default TaskContainer;
