import React, { useEffect, useState } from 'react'
import { CategoryService } from './Service/CategoryService'
import { CategoryDto } from '../../dto/CategoryDto'
import TableCategories from './Components/TableCategories'
import CreateCategory from './Components/CreateCategory'
import useEditCategory from './hooks/useEditCategory'
import useDeleteCategory from './hooks/useDeleteCategory'

const TableContainer: React.FC = () => {
  const [categories, setCategories] = useState<CategoryDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const {
    handleEditCategory,
    isEditing,
    editedCategory,
    error: editError,
  } = useEditCategory()
  const {
    handleDeleteCategory: deleteCategory,
    isDeleting,
    deletedCategoryId,
    error: deleteError,
  } = useDeleteCategory()

  const categoryService = new CategoryService()

  const handleAddCategory = (newCategory: CategoryDto) => {
    setCategories((prevCategories) => [...prevCategories, newCategory])
  }

  const handleDeleteCategory = async (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await deleteCategory(categoryId)
    }
  }

  useEffect(() => {
    if (editedCategory) {
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.categoryId === editedCategory.categoryId
            ? editedCategory
            : category
        )
      )
    }
  }, [editedCategory])

  useEffect(() => {
    if (deletedCategoryId) {
      setCategories((prevCategories) =>
        prevCategories.filter(
          (category) => category.categoryId !== deletedCategoryId
        )
      )
    }
  }, [deletedCategoryId])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getCategories()
        setCategories(response ?? [])
      } catch (error) {
        setError('Failed to load categories')
      } finally {
        setIsLoading(false)
      }
    }
    fetchCategories()
  }, [])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      <CreateCategory onAddCategory={handleAddCategory} />
      <TableCategories
        categories={categories}
        onCategoryDelete={handleDeleteCategory}
        onCategoryEdit={handleEditCategory}
      />
    </div>
  )
}

export default TableContainer
