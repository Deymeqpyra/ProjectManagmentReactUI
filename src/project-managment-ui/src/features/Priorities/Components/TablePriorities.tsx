import { PriorityDto } from '../../../dto/PriorityDto'
import { PriorityProvider } from './PriorityContext'
import TableRow from './TableRow'

interface TableProps {
  priorities: PriorityDto[]
}

const TablePriorities = ({
  priorities
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
            <PriorityProvider>
              <TableRow
                key={priority.priorityId}
                priority={priority}
              ></TableRow>
            </PriorityProvider>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablePriorities
