import React, { useState, useEffect, useCallback } from 'react'
import { CreateTaskDto } from '../../../dto/CreateTaskDto'
import Input from './Input'
import { CategoryDto } from '../../../dto/CategoryDto'
import useCreateTask from '../hooks/useCreateTask'

interface CreateTaskProps {
  projectId: string | undefined; 
}


const CreateTask: React.FC<CreateTaskProps> = React.memo(({ projectId }) => {
  const { createTask, fetchCategories } = useCreateTask();

  const [formData, setFormData] = useState<CreateTaskDto>({
    title: '',
    description: '',
    categoryId: ''
  })
  const [categories, setCategories] = useState<CategoryDto[]>([]) 
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCategoriesAndPriorities = useCallback(async () => {
    try {
      setLoading(true)
      const categoriesResponse = await fetchCategories()
      setCategories(categoriesResponse)
    } catch (err) {
      setError('Failed to load categories or priorities')
    } finally {
      setLoading(false)
    }
  }, [fetchCategories])

  useEffect(() => {
    fetchCategoriesAndPriorities()
  }, [fetchCategoriesAndPriorities])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleCreateTask = async () => {
    if (!projectId) {
      alert('Project ID is required.')
      return
    }
    if (!formData.title || !formData.description || !formData.categoryId) {
      alert('All fields are required.')
      return
    }

    setLoading(true)
    try {
      await createTask(projectId, formData)
      setFormData({ title: '', description: '', categoryId: ''})
      alert('Task created successfully.')
    } catch (err) {
      setError('Failed to create task.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-task-form">
      <h2>Create New Task</h2>
      {error && <div className="error">{error}</div>}

      <Input
        value={formData.title}
        onChange={handleInputChange}
        label="Task Title"
        name="title"
        placeholder="Enter task title"
      />

      <Input
        value={formData.description}
        onChange={handleInputChange}
        label="Task Description"
        name="description"
        placeholder="Enter task description"
      />

      <div className="form-group">
        <label htmlFor="categoryId">Category:</label>
        <select
          id="categoryId"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleCreateTask} disabled={loading}>
        {loading ? 'Creating...' : 'Create Task'}
      </button>
    </div>
  )
})

export default CreateTask