import React, { createContext, useContext, useState, ReactNode } from 'react';
import useEditPriority from '../hooks/useEditPriority';
import useDeletePriority from '../hooks/useDeletePriority'; 
import { PriorityDto } from '../../../dto/PriorityDto';

interface PriorityContextProps {
  priorities: PriorityDto[];
  editPriority: (id: string, name: string) => Promise<void>;
  deletePriority: (id: string) => Promise<void>;
  updatePriority: (updatedPriority: PriorityDto) => void;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  isDeleting: boolean;
  setIsDeleting: (deleting: boolean) => void;
  error: string | null;
}

const PriorityContext = createContext<PriorityContextProps | undefined>(undefined);

export const PriorityProvider = ({ children }: { children: ReactNode }) => {
  const [priorities, setPriorities] = useState<PriorityDto[]>([]);

  const updatePriority = (updatedPriority: PriorityDto) => {
    setPriorities((prev) =>
      prev.map((priority) =>
        priority.priorityId === updatedPriority.priorityId ? updatedPriority : priority
      )
    );
  };

  const {
    isEditing,
    handleEditPriority: editPriority,
    setIsEditing,
    error: editError,
  } = useEditPriority();

  const {
    isDeleting,
    handleDeletePriority: deletePriority,
    setIsDeleting,
    error: deleteError,
  } = useDeletePriority();

  const error = editError || deleteError;

  return (
    <PriorityContext.Provider
      value={{
        priorities,
        editPriority: (id, name) => editPriority(id, name),
        deletePriority,
        updatePriority,
        isEditing,
        setIsEditing,
        isDeleting,
        setIsDeleting,
        error,
      }}
    >
      {children}
    </PriorityContext.Provider>
  );
};

export const usePriorityContext = () => {
  const context = useContext(PriorityContext);
  if (!context) {
    throw new Error('usePriorityContext must be used within a PriorityProvider');
  }
  return context;
};
