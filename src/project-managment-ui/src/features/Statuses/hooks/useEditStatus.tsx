import { useState, useCallback } from 'react';
import { StatusService } from '../Services/StatusServices'; 
import { StatusDto } from '../../../dto/StatusDto'; 

const useEditStatus = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStatus, setEditedStatus] = useState<StatusDto | null>(null);
  const [error, setError] = useState<string | null>(null);


  const handleEditStatus = useCallback(async (statusId: string, newStatusTitle: string) => {
    try {
      const statusData = await StatusService.updateStatus(statusId, newStatusTitle);
      setEditedStatus(statusData);
      setIsEditing(false);
    } catch (error) {
      setError('Failed to update status');
    }
  }, []);

  return { isEditing, editedStatus, error, handleEditStatus, setIsEditing };
};

export default useEditStatus;
