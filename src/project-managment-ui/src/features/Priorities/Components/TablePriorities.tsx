import { PriorityDto } from '../../../dto/PriorityDto'
import TableRow from './TableRow'; 

interface TableProps {
  priorities: PriorityDto[],
  onPriorityEdit: (id: string, name: string) => void;
  onPriorityDelete: (id: string) => void;
}

const TablePriorities = ({
  priorities,
  onPriorityEdit,
  onPriorityDelete
}: TableProps) => {
  return (
    <div>
      <h2>Priorities List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {priorities.map((priority) => (
            <TableRow
              key={priority.priorityId}
              priority={priority}
              onPriorityDelete={onPriorityDelete}
              onPriorityEdit={onPriorityEdit}
            ></TableRow>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablePriorities

