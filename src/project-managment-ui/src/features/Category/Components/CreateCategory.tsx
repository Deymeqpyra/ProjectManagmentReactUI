import React, { useCallback, useState } from 'react'
import { CategoryService } from '../Service/CategoryService'
import CategoryInput from './CategoryInput'

interface CreateCategoryProps {
  onAddCategory: (newCategory: { categoryId: string; name: string }) => void
}

const CreateCategory = ({ onAddCategory }: CreateCategoryProps) => {
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCreateCategory = useCallback(async () => {
    if (!title.trim()) {
      setErrorMessage('Category title cannot be empty.');
      return;
    }

    try {
      const categoryService = new CategoryService();
      const newCategory = await categoryService.createCategory(title);
      onAddCategory({
        categoryId: newCategory.categoryId,
        name: newCategory.name,
      });
      setTitle('');
    } catch (error) {
      setErrorMessage('Failed to create category. Please try again.');
    }
  }, [title, onAddCategory]);

  return (
    <div>
      <h2>Create Category</h2>
      <CategoryInput
        categoryTitle={title}
        setCategoryTitle={setTitle}
      />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button onClick={handleCreateCategory}>Submit</button>
    </div>
  );
};

export default CreateCategory
