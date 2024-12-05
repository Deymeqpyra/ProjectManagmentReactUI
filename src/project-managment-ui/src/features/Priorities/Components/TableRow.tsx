import { useState, useCallback, memo } from "react";
import { PriorityDto } from "../../../dto/PriorityDto";
import PriorityInput from "./PriorityInput.tsx";

interface TableRowProps {
  priority: PriorityDto;
  onPriorityEdit: (id: string, name: string) => void;
  onPriorityDelete: (id: string) => void;
}

const TableRowComponent = ({ priority, onPriorityEdit, onPriorityDelete }: TableRowProps) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(priority.name);

  const toggleEditing = useCallback(() => setEditing((prev) => !prev), []);

  const saveChanges = useCallback(() => {
    onPriorityEdit(priority.priorityId, name);
    setEditing(false);
  }, [onPriorityEdit, priority.priorityId, name]);

  const handleDelete = useCallback(() => {
    onPriorityDelete(priority.priorityId);
  }, [onPriorityDelete, priority.priorityId]);

  return (
    <tr>
      <td>{priority.priorityId}</td>
      <td>
        {editing ? (
          <PriorityInput priorityTitle={name} setPriorityTitle={setName} />
        ) : (
          priority.name
        )}
      </td>
      <td>
        <div style={{ display: "flex", gap: "1em" }}>
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
  );
};

const TableRow = memo(TableRowComponent);

export default TableRow;

