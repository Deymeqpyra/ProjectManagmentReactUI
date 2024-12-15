import React, { useCallback } from 'react';

interface PriorityInputProps {
  priorityTitle: string;
  setPriorityTitle: (title: string) => void;
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <label
        htmlFor="priority-input"
        style={{
          color: '#FFFFFF',
          marginBottom: '8px',
          fontSize: '14px',
          fontWeight: 'bold',
        }}
      >
        Priority Name
      </label>
      <input
        id="priority-input"
        style={{
          backgroundColor: '#3B1C32',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '8px',
          fontSize: '16px',
          color: '#FFFFFF',
          width: '100%',
          maxWidth: '300px',
          transition: 'border-color 0.3s ease',
        }}
        type="text"
        value={priorityTitle}
        placeholder="Enter priority name..."
        onChange={handleChange}
      />
    </div>
  );
};

const PriorityInput = React.memo(PriorityInputComponent);

export default PriorityInput;
