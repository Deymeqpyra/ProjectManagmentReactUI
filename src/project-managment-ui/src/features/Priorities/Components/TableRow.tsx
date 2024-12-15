import React, { useState, useCallback, memo } from 'react'
import { usePriorityContext } from './PriorityContext'
import { PriorityDto } from '../../../dto/PriorityDto'
import PriorityInput from './PriorityInput.tsx'
import ErrorMessage from '../../../components/layout/ErrorMessage.tsx'

interface TableRowProps {
  priority: PriorityDto
}

const TableRowComponent = ({ priority }: TableRowProps) => {
  const { editPriority, deletePriority, error } = usePriorityContext()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(priority.name)

  const toggleEditing = useCallback(() => setEditing((prev) => !prev), [])

  const saveChanges = useCallback(async () => {
    await editPriority(priority.priorityId, name)
    console.log(
      'changed name' + name + ' changed priorityId ' + priority.priorityId
    )
    setEditing(false)
  }, [editPriority, priority.priorityId, name])

  const handleDelete = useCallback(async () => {
    await deletePriority(priority.priorityId)
  }, [deletePriority, priority.priorityId])

  return (
    <tr>
      <td>{priority.priorityId}</td>
      <td>
        {editing ? (
          <PriorityInput priorityTitle={name} setPriorityTitle={setName} />
        ) : (
          priority.name
        )}
        {error && <ErrorMessage error={error} />}
      </td>
      <td>
        <div style={{ display: 'flex', gap: '1em' }}>
          {editing ? (
            <>
              <button onClick={saveChanges}>Save</button>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          ) : (
            <>
              <button onClick={toggleEditing}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </>
          )}
        </div>
      </td>
    </tr>
  )
}

const TableRow = memo(TableRowComponent)

export default TableRow
