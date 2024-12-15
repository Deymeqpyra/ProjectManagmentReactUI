import { useState, memo } from 'react'
import { CategoryDto } from '../../../dto/CategoryDto'
import CategoryInput from './CategoryInput'
import { useCategoryContext } from './CategoryContext'
import ErrorMessage from '../../../components/layout/ErrorMessage'

interface TableRowProps {
  category: CategoryDto
}

const TableRowComponent = ({ category }: TableRowProps) => {
  const { editCategory, deleteCategory } = useCategoryContext()
  const [isEditing, setIsEditing] = useState(false)
  const [currentCategory, setCurrentCategory] = useState(category)
  const [errorMessage, setErrorMessage] = useState('')

  const toggleEditing = () => setIsEditing((prev) => !prev);

  const saveChanges = async () => {
    if (!currentCategory.name.trim() || currentCategory.name.length <= 3) {
      setErrorMessage('Category name is not correct');
      return;
    }
    await editCategory(currentCategory.categoryId, currentCategory.name);
    setIsEditing(false);
  };

  const handleInputChange = (newName: string) => {
    setCurrentCategory((prev) => ({ ...prev, name: newName }));
  };

  const handleDelete = async () => {
    await deleteCategory(currentCategory.categoryId);
  };

  return (
    <tr>
      <td>{currentCategory.categoryId}</td>
      <td>
        {errorMessage && <ErrorMessage error={errorMessage} />}
        {isEditing ? (
          <CategoryInput
            categoryTitle={currentCategory.name}
            setCategoryTitle={handleInputChange}
          />
        ) : (
          currentCategory.name
        )}
      </td>
      <td>
        <div style={{ display: 'flex', gap: '1em' }}>
          {isEditing ? (
            <>
              <button onClick={saveChanges}>Save</button>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          ) : (
            <>
              <button onClick={toggleEditing}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

const TableRow = memo(TableRowComponent)

export default TableRow
