import React, { useCallback } from 'react'

interface CategoryInputProps {
  categoryTitle: string
  setCategoryTitle: (title: string) => void
}

const CategoryInputComponent = ({
  categoryTitle,
  setCategoryTitle,
}: CategoryInputProps) => {
  const memoizedSetCategoryTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCategoryTitle(event.target.value)
    },
    [setCategoryTitle]
  )
  return (
    <div>
      <input
        type="text"
        value={categoryTitle}
        onChange={memoizedSetCategoryTitle}
      />
    </div>
  )
}
const CategoryInput = React.memo(CategoryInputComponent)

export default CategoryInput
