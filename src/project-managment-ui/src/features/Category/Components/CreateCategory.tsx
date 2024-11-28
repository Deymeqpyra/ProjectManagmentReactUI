import React, { useCallback, useState } from 'react'
import { CategoryService } from '../Service/CategoryService'
import CategoryInput from './CategoryInput'

interface CreateCategoryProps {
  onAddCategory: (newCategory: { categoryId: string; name: string }) => void
}

const CreateCategory = ({ onAddCategory }: CreateCategoryProps) => {
  const [categoryTitle, setCategoryTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = useCallback(async () => {
    if (!categoryTitle.trim()) {
      setError('Category title is empty')
      return
    }

    try {
      const categoryService = new CategoryService()
      const createdCategory = await categoryService.createCategory(
        categoryTitle
      )
      onAddCategory({
        categoryId: createdCategory.categoryId, // Adjust based on your actual response
        name: createdCategory.name,
      })
      console.log('Success to create ' + createdCategory.name)
      setCategoryTitle('')
    } catch (error) {
      console.log('Failed to create err: ', error)
      setError('Failed to create category. Please try again!')
    }
  }, [categoryTitle])
  return (
    <div>
      <h2>Create category</h2>
      <CategoryInput
        categoryTitle={categoryTitle}
        setCategoryTitle={setCategoryTitle}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default CreateCategory
