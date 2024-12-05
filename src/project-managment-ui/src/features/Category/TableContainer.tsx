import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { CategoryService } from './Service/CategoryService'
import { CategoryDto } from '../../dto/CategoryDto'
import TableCategories from './Components/TableCategories'
import CreateCategory from './Components/CreateCategory'
import useEditCategory from './hooks/useEditCategory'
import useDeleteCategory from './hooks/useDeleteCategory'

Modal.setAppElement('#root')

const TableContainer = () => {
  const [categories, setCategories] = useState<CategoryDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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


  const handleAddCategory = (newCategory: CategoryDto) => {
    setCategories((prevCategories) => [...prevCategories, newCategory])
    setIsModalOpen(false)
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
        const response = await CategoryService.getCategories()
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
      <button
        onClick={() => setIsModalOpen(true)}
        style={{
          width: '50px',
          float: 'right',
          border: 'none',
          padding: '10px 10px',
          fontSize: '15px',
          alignItems: 'center',
          borderRadius: '4px',
          backgroundColor: '#4CAF50',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Add
      </button>
      <TableCategories
        categories={categories}
        onCategoryDelete={handleDeleteCategory}
        onCategoryEdit={handleEditCategory}
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Create Category Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            width: '400px',
            height: '300px',
            margin: 'auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: '#1A1A1D',
          },
        }}
      >
        <h2>Create Category</h2>
        <button
          onClick={() => setIsModalOpen(false)}
          style={{
            float: 'right',
          }}
        >
          Close
        </button>
        <CreateCategory onAddCategory={handleAddCategory} />
      </Modal>
    </div>
  )
}

export default TableContainer
