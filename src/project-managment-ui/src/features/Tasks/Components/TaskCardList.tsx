import React from "react";
import { ProjectTaskDto } from "../../../dto/ProjectTaskDto";
import TaskCard from "./TaskCard";
import "./TaskCardList.css"

interface TaskCardListProps {
  tasks: ProjectTaskDto[];
  onDelete: (taskId: string) => void;
  onMarkAsCompleted: (taskId: string) => void;
}

const TaskCardList: React.FC<TaskCardListProps> = ({ tasks, onDelete, onMarkAsCompleted }) => {
  return (
    <div className="task-card-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.taskId}
          task={task}
          onDelete={onDelete}
          onMarkAsCompleted={onMarkAsCompleted}
        />
      ))}
    </div>
  );
};

export default TaskCardList;
