import { useState, useCallback } from 'react';
import { PriorityService } from '../Services/PriorityService'; 
import { PriorityDto } from '../../../dto/PriorityDto'; 

const useEditPriority = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPriority, setEditedPriority] = useState<PriorityDto | null>(null);
  const [error, setError] = useState<string | null>(null);


  const handleEditPriority = useCallback(async (priorityId: string, newPriorityTitle: string) => {
    try {
      const priorityData = await PriorityService.updatePriority(priorityId, newPriorityTitle);
      setEditedPriority(priorityData);
      setIsEditing(false);
    } catch (error) {
      setError('Failed to update priority');
    }
  }, []);

  return { isEditing, editedPriority, error, handleEditPriority, setIsEditing };
};

export default useEditPriority;
