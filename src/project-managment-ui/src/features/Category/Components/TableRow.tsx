import React, { useState, useCallback, memo, useMemo } from "react";
import { CategoryDto } from "../../../dto/CategoryDto";
import CategoryInput from "./CategoryInput";

interface TableRowProps {
  category: CategoryDto;
  onCategoryEdit: (id: string, name: string) => void;
  onCategoryDelete: (id: string) => void;
}

const TableRowComponent = ({
  category,
  onCategoryEdit,
  onCategoryDelete,
}: TableRowProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState(category.name);

  const toggleEditMode = useCallback(() => {
    setIsEditMode((prev) => !prev);
  }, []);

  const saveChanges = useCallback(() => {
    onCategoryEdit(category.categoryId, categoryTitle);
    setIsEditMode(false);
  }, [onCategoryEdit, category.categoryId, categoryTitle]);

  const deleteCategory = useCallback(() => {
    onCategoryDelete(category.categoryId);
  }, [onCategoryDelete, category.categoryId]);

  const memoizedCategoryTitle = useMemo(() => category.name, [category.name]);

  return (
    <tr>
      <td>{category.categoryId}</td>
      <td>
        {isEditMode ? (
          <CategoryInput
            categoryTitle={categoryTitle}
            setCategoryTitle={setCategoryTitle}
          />
        ) : (
          memoizedCategoryTitle
        )}
      </td>
      <td>
        <div style={{ display: "flex", gap: "1em" }}>
          {isEditMode ? (
            <>
              <button onClick={saveChanges}>Save</button>
              <button onClick={toggleEditMode}>Cancel</button>
            </>
          ) : (
            <>
              <button onClick={toggleEditMode}>Edit</button>
              <button onClick={deleteCategory}>Delete</button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

const TableRow = memo(TableRowComponent);

export default TableRow;
