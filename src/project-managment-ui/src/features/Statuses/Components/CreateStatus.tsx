import { useCallback, useState } from 'react'
import { StatusService } from '../Services/StatusServices'
import StatusInput from './StatusInput';

interface CreateStatusProps {
  onAddStatus: (newStatus: { statusId: string; statusName: string }) => void
}

const CreateStatus = ({ onAddStatus }: CreateStatusProps) => {
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCreateStatus = useCallback(async () => {
    if (!title.trim()) {
      setErrorMessage('Status title cannot be empty.');
      return;
    }

    try {
      const newStatus = await StatusService.createStatus(title);
      onAddStatus({
        statusId: newStatus.statusId,
        statusName: newStatus.statusName,
      });
      setTitle('');
    } catch (error) {
      setErrorMessage('Failed to create status. Please try again.');
    }
  }, [title, onAddStatus]);

  return (
    <div>
      <h2>Create Status</h2>
      <StatusInput
        statusTitle={title}
        setStatusTitle={setTitle}
      />
      <br/>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button onClick={handleCreateStatus}>Submit</button>
    </div>
  );
};

export default CreateStatus

