import { CategoryDto } from '../../../dto/CategoryDto'
import { CategoryProvider } from './CategoryContext';
import TableRow from './TableRow'

interface TableProps {
  categories: CategoryDto[]
}

const TableCategories = ({ categories,
 }: TableProps) => {
  return (
    <div>
      <h2>Categories List</h2>
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
            <CategoryProvider>
            <TableRow
           key={category.categoryId}
           category={category}
           ></TableRow>
           </CategoryProvider>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableCategories
