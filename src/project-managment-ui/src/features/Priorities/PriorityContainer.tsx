import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { PriorityService } from './Services/PriorityService'
import { PriorityDto } from '../../dto/PriorityDto'
import TablePriorities from './Components/TablePriorities'
import CreatePriority from './Components/CreatePriority'
import useEditPriority from './hooks/useEditPriority'
import useDeletePriority from './hooks/useDeletePriority'

Modal.setAppElement('#root')

const PriorityContainer = () => {
  const [priorities, setPriorities] = useState<PriorityDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    handleEditPriority,
    isEditing,
    editedPriority,
    error: editError,
  } = useEditPriority()
  const {
    handleDeletePriority: deletePriority,
    isDeleting,
    deletedPriorityId,
    error: deleteError,
  } = useDeletePriority()


  const handleAddPriority = (newPriority: PriorityDto) => {
    setPriorities((prevPriorities) => [...prevPriorities, newPriority])
    setIsModalOpen(false)
  }

  const handleDeletePriority = async (priorityId: string) => {
    if (window.confirm('Are you sure you want to delete this priority?')) {
      await deletePriority(priorityId)
    }
  }

  useEffect(() => {
    if (editedPriority) {
      setPriorities((prevPriorities) =>
        prevPriorities.map((priority) =>
          priority.priorityId === editedPriority.priorityId
            ? editedPriority
            : priority
        )
      )
    }
  }, [editedPriority])

  useEffect(() => {
    if (deletedPriorityId) {
      setPriorities((prevPriorities) =>
        prevPriorities.filter(
          (priority) => priority.priorityId !== deletedPriorityId
        )
      )
    }
  }, [deletedPriorityId])

  useEffect(() => {
    const fetchPriorities = async () => {
      try {
        const response = await PriorityService.getAllPriorities()
        setPriorities(response ?? [])
      } catch (error) {
        setError('Failed to load priorities')
      } finally {
        setIsLoading(false)
      }
    }
    fetchPriorities()
  }, [])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        style={{
          width: '50px',
          float: 'right',
          border: 'none',
          padding: '10px 10px',
          fontSize: '15px',
          alignItems: 'center',
          borderRadius: '4px',
          backgroundColor: '#4CAF50',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Add
      </button>
      <TablePriorities
        priorities={priorities}
        onPriorityDelete={handleDeletePriority}
        onPriorityEdit={handleEditPriority}
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Create Priority Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            width: '400px',
            height: '300px',
            margin: 'auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: '#1A1A1D',
          },
        }}
      >
        <button
          onClick={() => setIsModalOpen(false)}
          style={{
            float: 'right',
            width: '50px',
            backgroundColor: 'red'
          }}
        >
          X
        </button>
        <CreatePriority onAddPriority={handleAddPriority} />
      </Modal>
    </div>
  )
}

export default PriorityContainer

