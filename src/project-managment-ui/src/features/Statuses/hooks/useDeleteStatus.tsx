import { useState, useCallback } from 'react';
import { StatusService } from '../Services/StatusServices';

const useDeleteStatus = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletedStatusId, setDeletedStatusId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteStatus = useCallback(async (statusId: string) => {
    try {
      await StatusService.deleteStatus(statusId);
      setDeletedStatusId(statusId);
      setIsDeleting(false);
    } catch (error) {
      setError('Failed to delete status');
    }
  }, []);

  return { isDeleting, deletedStatusId, error, handleDeleteStatus, setIsDeleting };
};

export default useDeleteStatus;
