import React from 'react'
import { ProjectTaskDto } from '../../../dto/ProjectTaskDto'
import "./TaskCard.css"

interface TaskCardProps {
  task: ProjectTaskDto;
  onDelete: (taskId: string) => void;
  onMarkAsCompleted: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onMarkAsCompleted }) => {
  return (
    <div className="task-card">
      <h3 className="task-card-title">{task.title}</h3>
      <p className="task-card-description">{task.description}</p>
      <p className="task-card-status">
        Status: {task.completed ? 'Completed' : 'In Progress'}
      </p>
      <div className="task-card-actions">
        <button 
          className="mark-completed" 
          onClick={() => onMarkAsCompleted(task.taskId!)}
        >
          Mark as Completed
        </button>
        <button 
          className="delete-task" 
          onClick={() => onDelete(task.taskId!)} 
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskCard
