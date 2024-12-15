import React, { createContext, useContext, useState, ReactNode } from 'react';
import useEditCategory from '../hooks/useEditCategory';
import useDeleteCategory from '../hooks/useDeleteCategory';
import { CategoryDto } from '../../../dto/CategoryDto';

interface CategoryContextProps {
  categories: CategoryDto[];
  editCategory: (id: string, name: string) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  updateCategory: (updatedCategory: CategoryDto) => void;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  isDeleting: boolean;
  setIsDeleting: (deleting: boolean) => void;
  error: string | null;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<CategoryDto[]>([]);

  const updateCategory = (updatedCategory: CategoryDto) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.categoryId === updatedCategory.categoryId ? updatedCategory : category
      )
    );
  };

  const {
    isEditing,
    handleEditCategory: editCategory,
    setIsEditing,
    error: editError,
  } = useEditCategory();

  const {
    isDeleting,
    handleDeleteCategory: deleteCategory,
    setIsDeleting,
    error: deleteError,
  } = useDeleteCategory();

  const error = editError || deleteError;

  return (
    <CategoryContext.Provider
      value={{
        categories,
        editCategory: (id, name) => editCategory(id, name, updateCategory),
        deleteCategory,
        updateCategory,
        isEditing,
        setIsEditing,
        isDeleting,
        setIsDeleting,
        error,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategoryContext must be used within a CategoryProvider');
  }
  return context;
};
