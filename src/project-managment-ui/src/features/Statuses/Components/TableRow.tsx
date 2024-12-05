import { useState, useCallback, memo } from "react";
import { StatusDto } from "../../../dto/StatusDto";
import StatusInput from "./StatusInput";

interface TableRowProps {
  status: StatusDto;
  onStatusEdit: (id: string, name: string) => void;
  onStatusDelete: (id: string) => void;
}

const TableRowComponent = ({ status, onStatusEdit, onStatusDelete }: TableRowProps) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(status.statusName);

  const toggleEditing = useCallback(() => setEditing((prev) => !prev), []);

  const saveChanges = useCallback(() => {
    onStatusEdit(status.statusId, name);
    setEditing(false);
  }, [onStatusEdit, status.statusId, name]);

  const handleDelete = useCallback(() => {
    onStatusDelete(status.statusId);
  }, [onStatusDelete, status.statusId]);

  return (
    <tr>
      <td>{status.statusId}</td>
      <td>
        {editing ? (
          <StatusInput statusTitle={name} setStatusTitle={setName} />
        ) : (
          status.statusName
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

