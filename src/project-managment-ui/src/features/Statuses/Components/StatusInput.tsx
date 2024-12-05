import React, { useCallback } from 'react'

interface StatusInputProps {
  statusTitle: string
  setStatusTitle: (title: string) => void
}

const StatusInputComponent = ({
  statusTitle,
  setStatusTitle,
}: StatusInputProps) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setStatusTitle(event.target.value);
    },
    [setStatusTitle]
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <input
      style={{
        display: 'flex',
        backgroundColor: '#3B1C32',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '8px',
        fontSize: '16px',
        transition: 'border-color 0.3s ease',
      }}
        type="text"
        value={statusTitle}
        onChange={handleChange}
      />
    </div>
  );
};
const StatusInput = React.memo(StatusInputComponent)

export default StatusInput

