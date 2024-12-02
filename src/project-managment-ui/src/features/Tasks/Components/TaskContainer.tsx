import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TaskService } from '../Services/TaskService'
import { CreateTaskDto } from '../../../dto/CreateTaskDto'
import CreateTask from './CreateTask' // Import CreateTask component
import TaskCardList from './TaskCardList' // Import TaskCardList component
import './TaskContainer.css'

const TaskContainer: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const taskService = new TaskService()

  useEffect(() => {
    const fetchTasks = async () => {
      if (!projectId) {
        setError('Project ID is missing.')
        setLoading(false)
        return
      }
      try {
        const taskData = await taskService.getTasksByProjectId(projectId)
      } catch (err) {
        setError('Failed to fetch tasks.')
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [projectId])

  const handleTaskCreated = (newTask: CreateTaskDto) => {}

  if (loading) return <div>Loading tasks...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="task-container">
      <div className="create-task-section">
        <CreateTask projectId={projectId} onTaskCreated={handleTaskCreated} />
      </div>

      <div className="task-list-section">
        <TaskCardList />
      </div>
    </div>
  )
}

export default TaskContainer
