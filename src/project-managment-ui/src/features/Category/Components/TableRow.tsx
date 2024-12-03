import { useState, useCallback, memo, useMemo } from "react";
import { CategoryDto } from "../../../dto/CategoryDto";
import CategoryInput from "./CategoryInput";

interface TableRowProps {
  category: CategoryDto;
  onCategoryEdit: (id: string, name: string) => void;
  onCategoryDelete: (id: string) => void;
}

const TableRowComponent = ({ category, onCategoryEdit, onCategoryDelete }: TableRowProps) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(category.name);

  const toggleEditing = useCallback(() => setEditing((prev) => !prev), []);

  const saveChanges = useCallback(() => {
    onCategoryEdit(category.categoryId, name);
    setEditing(false);
  }, [onCategoryEdit, category.categoryId, name]);

  const handleDelete = useCallback(() => {
    onCategoryDelete(category.categoryId);
  }, [onCategoryDelete, category.categoryId]);

  return (
    <tr>
      <td>{category.categoryId}</td>
      <td>
        {editing ? (
          <CategoryInput categoryTitle={name} setCategoryTitle={setName} />
        ) : (
          category.name
        )}
      </td>
      <td>
        <div style={{ display: "flex", gap: "1em" }}>
          {editing ? (
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

const TableRow = memo(TableRowComponent);

export default TableRow;
