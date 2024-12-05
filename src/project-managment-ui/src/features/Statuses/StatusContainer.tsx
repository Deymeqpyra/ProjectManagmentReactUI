import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { StatusService } from './Services/StatusServices' 
import { StatusDto } from '../../dto/StatusDto'
import TableStatuses from './Components/TableStatuses'
import CreateStatus from './Components/CreateStatus'
import useEditStatus from './hooks/useEditStatus'
import useDeleteStatus from './hooks/useDeleteStatus'

Modal.setAppElement('#root')

const StatusContainer = () => {
  const [statuses, setStatuses] = useState<StatusDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    handleEditStatus,
    isEditing,
    editedStatus,
    error: editError,
  } = useEditStatus()
  const {
    handleDeleteStatus: deleteStatus,
    isDeleting,
    deletedStatusId,
    error: deleteError,
  } = useDeleteStatus()


  const handleAddStatus = (newStatus: StatusDto) => {
    setStatuses((prevStatuses) => [...prevStatuses, newStatus])
    setIsModalOpen(false)
  }

  const handleDeleteStatus = async (statusId: string) => {
    if (window.confirm('Are you sure you want to delete this status?')) {
      await deleteStatus(statusId)
    }
  }

  useEffect(() => {
    if (editedStatus) {
      setStatuses((prevStatuses) =>
        prevStatuses.map((status) =>
          status.statusId === editedStatus.statusId
            ? editedStatus
            : status
        )
      )
    }
  }, [editedStatus])

  useEffect(() => {
    if (deletedStatusId) {
      setStatuses((prevStatuses) =>
        prevStatuses.filter(
          (status) => status.statusId !== deletedStatusId
        )
      )
    }
  }, [deletedStatusId])

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await StatusService.getAllStatuses()
        setStatuses(response ?? [])
      } catch (error) {
        setError('Failed to load statuses')
      } finally {
        setIsLoading(false)
      }
    }
    fetchStatuses()
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
      <TableStatuses
        statuses={statuses}
        onStatusDelete={handleDeleteStatus}
        onStatusEdit={handleEditStatus}
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Create Status Modal"
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
        <h2>Create Status</h2>
        <button
          onClick={() => setIsModalOpen(false)}
          style={{
            float: 'right',
          }}
        >
          Close
        </button>
        <CreateStatus onAddStatus={handleAddStatus} />
      </Modal>
    </div>
  )
}

export default StatusContainer

