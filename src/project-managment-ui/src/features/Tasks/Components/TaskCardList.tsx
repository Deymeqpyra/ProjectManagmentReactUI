import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProjectTaskDto } from '../../../dto/ProjectTaskDto'
import { TaskService } from '../Services/TaskService'
import TaskCard from './TaskCard'
import './TaskCardList.css'

const TaskCardList = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const [tasks, setTasks] = useState<ProjectTaskDto[]>([])
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
        setTasks(taskData)
      } catch (err) {
        setError('Failed to fetch tasks.')
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [projectId])

  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(taskId)
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task.taskId !== taskId)
        )
      } catch (err) {
        alert('Failed to delete task.')
      }
    }
  }

  const handleMarkAsCompleted = async (taskId: string) => {
    try {
      await taskService.finishTask(taskId)
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.taskId === taskId ? { ...task, completed: true } : task
        )
      )
    } catch (err) {
      alert('Failed to mark task as completed.')
    }
  }

  if (loading) return <div>Loading tasks...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="task-card-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.taskId}
          task={task}
          onDelete={handleDeleteTask}
          onMarkAsCompleted={handleMarkAsCompleted}
        />
      ))}
    </div>
  )
}

export default TaskCardList
