import React, { useCallback } from 'react'

interface CategoryInputProps {
  categoryTitle: string
  setCategoryTitle: (title: string) => void
}

const CategoryInputComponent = ({
  categoryTitle,
  setCategoryTitle,
}: CategoryInputProps) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCategoryTitle(event.target.value);
    },
    [setCategoryTitle]
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <input
      style={{
        display: 'flex',
        backgroundColor: '#3B1C32',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '8px',
        fontSize: '16px',
        transition: 'border-color 0.3s ease',
      }}
        type="text"
        value={categoryTitle}
        onChange={handleChange}
      />
    </div>
  );
};
const CategoryInput = React.memo(CategoryInputComponent)

export default CategoryInput
