import { useState, useCallback } from 'react';
import { CategoryService } from '../Service/CategoryService'; 

const useDeleteCategory = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletedCategoryId, setDeletedCategoryId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);


  const handleDeleteCategory = useCallback(async (categoryId: string) => {
    try {
      await CategoryService.deleteCategory(categoryId);
      setDeletedCategoryId(categoryId);
      setIsDeleting(false);
    } catch (error) {
      setError('Failed to delete category');
    }
  }, []);

  return { isDeleting, deletedCategoryId, error, handleDeleteCategory, setIsDeleting };
};

export default useDeleteCategory;