import { useState, useCallback } from 'react';
import { PriorityService } from '../Services/PriorityService'; 

const useDeletePriority = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletedPriorityId, setDeletedPriorityId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);



  const handleDeletePriority = useCallback(async (priorityId: string) => {
    try {
      await PriorityService.deletePriority(priorityId);
      setDeletedPriorityId(priorityId);
      setIsDeleting(false);
    } catch (error) {
      setError('Failed to delete priority');
    }
  }, []);

  return { isDeleting, deletedPriorityId, error, handleDeletePriority, setIsDeleting };
};

export default useDeletePriority;
