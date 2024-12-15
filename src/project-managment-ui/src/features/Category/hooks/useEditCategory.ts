import { useState, useCallback } from 'react';
import { CategoryService } from '../Service/CategoryService'; 
import { CategoryDto } from '../../../dto/CategoryDto'; 

const useEditCategory = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEditCategory = useCallback(async (
    categoryId: string,
    newCategoryTitle: string,
    onCategoryUpdated: (updatedCategory: CategoryDto) => void
  ) => {
    try {
      const updatedCategory = await CategoryService.updateCategory(categoryId, newCategoryTitle);
      onCategoryUpdated(updatedCategory); 
      setIsEditing(false);
    } catch (error) {
      setError('Failed to update category');
    }
  }, []);

  return { isEditing, error, handleEditCategory, setIsEditing };
};

export default useEditCategory;
