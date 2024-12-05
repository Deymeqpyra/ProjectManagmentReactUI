import React, { useCallback } from 'react'

interface PriorityInputProps {
  priorityTitle: string
  setPriorityTitle: (title: string) => void
}

const PriorityInputComponent = ({
  priorityTitle,
  setPriorityTitle,
}: PriorityInputProps) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPriorityTitle(event.target.value);
    },
    [setPriorityTitle]
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
        value={priorityTitle}
        onChange={handleChange}
      />
    </div>
  );
};
const PriorityInput = React.memo(PriorityInputComponent)

export default PriorityInput

