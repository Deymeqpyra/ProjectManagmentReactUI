import React, { useCallback, useState } from 'react'
import { CategoryDto } from '../../../dto/CategoryDto'
import CategoryInput from './CategoryInput'

interface TableRowProp {
  category: CategoryDto
}
const TableRow = ({ category }: TableRowProp) => {
  const [categoryTitle, setCategoryTitle] = useState(category.name)

  const memoizedSetTitle = useCallback((title: string) => {
    setCategoryTitle(title)
  }, [])

  return (
    <div>
      <tr key={category.categoryId}>
        <td>{category.categoryId}</td>
        <td>{category.name}</td>
        <td>
          <CategoryInput
            categoryTitle={categoryTitle}
            setCategoryTitle={memoizedSetTitle}
          />
        </td>
      </tr>
    </div>
  )
}

export default TableRow
