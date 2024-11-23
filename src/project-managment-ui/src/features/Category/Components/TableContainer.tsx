import React, { useEffect, useState } from 'react'
import { CategoryService } from '../Service/CategoryService'
import { CategoryDto } from '../../../dto/CategoryDto'
import TableCategories from './TableCategory'
import CreateCategory from './CreateCategory'

const TableContainer: React.FC = () => {
  const [categories, setCategories] = useState<CategoryDto[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const categoryService = new CategoryService()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response: CategoryDto[] = await categoryService.getCategories()
        setCategories(response ?? [])
        // console.log(response.categories + ' IN TABLE CATEGORY ')
      } catch (err) {
        setError('Failed to load categories')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleDelete = async (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await categoryService.deleteCategory(categoryId)
        setCategories((prevCategories) =>
          prevCategories.filter(
            (category) => category.categoryId !== categoryId
          )
        )
      } catch (err) {
        setError('Failed to delete category')
      }
    }
  }

  const handleEdit = (categoryId: string) => {
    alert(`Edit category with ID: ${categoryId}`)
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      <TableCategories categories={categories} />
      <CreateCategory />
    </div>
  )
}

export default TableContainer
