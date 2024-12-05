import { useState, useCallback } from 'react';
import { CategoryService } from '../Service/CategoryService'; 
import { CategoryDto } from '../../../dto/CategoryDto'; 

const useEditCategory = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCategory, setEditedCategory] = useState<CategoryDto | null>(null);
  const [error, setError] = useState<string | null>(null);


  const handleEditCategory = useCallback(async (categoryId: string, newCategoryTitle: string) => {
    try {
      const categoryData = await CategoryService.updateCategory(categoryId, newCategoryTitle);
      setEditedCategory(categoryData);
      setIsEditing(false);
    } catch (error) {
      setError('Failed to update category');
    }
  }, []);

  return { isEditing, editedCategory, error, handleEditCategory, setIsEditing };
};

export default useEditCategory;