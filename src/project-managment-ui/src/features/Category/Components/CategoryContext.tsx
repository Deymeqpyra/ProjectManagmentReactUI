import React, { createContext, useContext, ReactNode } from 'react';
import useEditCategory from '../hooks/useEditCategory';
import useDeleteCategory from '../hooks/useDeleteCategory';

interface CategoryContextProps {
  editCategory: (id: string, name: string) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  isDeleting: boolean;
  setIsDeleting: (deleting: boolean) => void;
  error: string | null;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const {
    isEditing,
    handleEditCategory: editCategory,
    setIsEditing,
    error: editError,
  } = useEditCategory()
  

  const {
    isDeleting,
    handleDeleteCategory: deleteCategory,
    setIsDeleting,
    error: deleteError,
  } = useDeleteCategory()

  const error = editError || deleteError

  return (
    <CategoryContext.Provider
      value={{
        editCategory,
        deleteCategory,
        isEditing,
        setIsEditing,
        isDeleting,
        setIsDeleting,
        error,
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

export const useCategoryContext = () => {
  const context = useContext(CategoryContext)
  if (!context) {
    throw new Error('useCategoryContext must be used within a CategoryProvider')
  }
  return context
}
