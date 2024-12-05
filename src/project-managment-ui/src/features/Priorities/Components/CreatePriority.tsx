import { useCallback, useState } from 'react'
import { PriorityService } from '../Services/PriorityService'
import PriorityInput from './PriorityInput' 

interface CreatePriorityProps {
  onAddPriority: (newPriority: { priorityId: string; name: string }) => void
}

const CreatePriority = ({ onAddPriority }: CreatePriorityProps) => {
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCreatePriority = useCallback(async () => {
    if (!title.trim()) {
      setErrorMessage('Priority title cannot be empty.');
      return;
    }

    try {
      const newPriority = await PriorityService.createPriority(title);
      onAddPriority({
        priorityId: newPriority.priorityId,
        name: newPriority.name,
      });
      setTitle('');
    } catch (error) {
      setErrorMessage('Failed to create priority. Please try again.');
    }
  }, [title, onAddPriority]);

  return (
    <div>
      <h2>Create Priority</h2>
      <PriorityInput
        priorityTitle={title}
        setPriorityTitle={setTitle}
      />
      <br/>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button onClick={handleCreatePriority}>Submit</button>
    </div>
  );
};

export default CreatePriority

