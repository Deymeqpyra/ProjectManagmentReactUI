import { StatusDto } from '../../../dto/StatusDto'
import TableRow from './TableRow'

interface TableProps {
  statuses: StatusDto[],
  onStatusEdit: (id: string, name: string) => void;
  onStatusDelete: (id: string) => void;
}

const TableStatuses = ({ statuses,
  onStatusEdit,
  onStatusDelete
}: TableProps) => {
  return (
    <div>
      <h2>Statuses List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {statuses.map((status) => (
            <TableRow
              key={status.statusId}
              status={status}
              onStatusDelete={onStatusDelete}
              onStatusEdit={onStatusEdit}
            ></TableRow>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableStatuses

