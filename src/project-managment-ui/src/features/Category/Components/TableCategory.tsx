import React from 'react'
import { CategoryDto } from '../../../dto/CategoryDto'

interface TableProps {
  categories: CategoryDto[]
}

const TableCategories = ({ categories }: TableProps) => {
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
            <tr key={category.categoryId}>
              <td>{category.categoryId}</td>
              <td>{category.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableCategories
