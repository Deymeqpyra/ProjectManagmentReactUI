import React from 'react'
import './TaskCard.css'
import { ProjectTaskDto } from '../../../dto/ProjectTaskDto'

interface TaskCardProps {
    task: ProjectTaskDto;             
    onDelete: (taskId: string) => void;
    onMarkAsCompleted: (taskId: string) => void; 
  }

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="task-card">
      <h3 className="task-card-title">{task.title}</h3>
      <p className="task-card-description">{task.description}</p>
      <p className="task-card-status">
        Status: {task.completed ? 'Completed' : 'In Progress'}
      </p>
      <div className="task-card-actions">
        <button className="mark-completed">Mark as Completed</button>
        <button className="delete-task">Delete</button>
      </div>
    </div>
  )
}

export default TaskCard
