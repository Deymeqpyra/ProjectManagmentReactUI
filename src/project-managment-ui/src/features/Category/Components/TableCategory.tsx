import React from 'react'
import { CategoryDto } from '../../../dto/CategoryDto'
import TableRow from './TableRow'

interface TableProps {
  categories: CategoryDto[],
  onCategoryEdit: (id: string, name: string) => void;
  onCategoryDelete: (id: string) => void;
}

const TableCategories = ({ categories,
  onCategoryEdit,
  onCategoryDelete
 }: TableProps) => {
  return (
    <div>
      <h2>Category List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
           <TableRow
           key={category.categoryId}
           category={category}
           onCategoryDelete={onCategoryDelete}
           onCategoryEdit={onCategoryEdit}
           ></TableRow>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableCategories
