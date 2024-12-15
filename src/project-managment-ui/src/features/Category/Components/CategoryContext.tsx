import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import useEditCategory from '../hooks/useEditCategory';
import useDeleteCategory from '../hooks/useDeleteCategory';
import { CategoryDto } from '../../../dto/CategoryDto';

interface CategoryContextProps {
  categories: CategoryDto[];
  editCategory: (id: string, name: string) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  updateCategory: (updatedCategory: CategoryDto) => void;
  error: string | null;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  isDeleting: boolean;
  setIsDeleting: (deleting: boolean) => void;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<CategoryDto[]>([]);

  const { isEditing, setIsEditing, handleEditCategory, error: editError } = useEditCategory();
  const { isDeleting, setIsDeleting, handleDeleteCategory, error: deleteError } = useDeleteCategory();

  const updateCategory = useCallback((updatedCategory: CategoryDto) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.categoryId === updatedCategory.categoryId ? updatedCategory : category
      )
    );
  }, []);

  const editCategory = useCallback(
    (id: string, name: string) => handleEditCategory(id, name, updateCategory),
    [handleEditCategory, updateCategory]
  );

  const deleteCategory = useCallback(
    (id: string) => handleDeleteCategory(id),
    [handleDeleteCategory]
  );

  const error = editError || deleteError;

  return (
    <CategoryContext.Provider
      value={{
        categories,
        editCategory,
        deleteCategory,
        updateCategory,
        error,
        isEditing,
        setIsEditing,
        isDeleting,
        setIsDeleting,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = (): CategoryContextProps => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategoryContext must be used within a CategoryProvider');
  }
  return context;
};
