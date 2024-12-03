import React, { useEffect, useState } from 'react'
import { CategoryService } from './Service/CategoryService'
import { CategoryDto } from '../../dto/CategoryDto'
import TableCategories from './Components/TableCategories'
import CreateCategory from './Components/CreateCategory'

const TableContainer: React.FC = () => {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoryService = new CategoryService();

  const handleAddCategory = (newCategory: CategoryDto) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        var categoryData = await categoryService.deleteCategory(categoryId);
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.categoryId !== categoryId)
        );
      } catch (error) {
        setError("Failed to delete category");
      }
    }
  };

  const handleEditCategory = async (categoryId: string, newCategoryTitle: string) => {
    try {
     var categoryData =  await categoryService.updateCategory(categoryId, newCategoryTitle);
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.categoryId === categoryId
            ? { ...category, name: categoryData.name }
            : category
        )
      );
    } catch (error) {
      setError("Failed to update category");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getCategories();
        setCategories(response ?? []);
      } catch (error) {
        setError("Failed to load categories");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <CreateCategory onAddCategory={handleAddCategory} />
      <TableCategories
        categories={categories}
        onCategoryDelete={handleDeleteCategory}
        onCategoryEdit={handleEditCategory}
      />
    </div>
  );
};

export default TableContainer
