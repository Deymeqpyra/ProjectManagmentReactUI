import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProjectDto } from '../../../dto/ProjectDto'
import { TagDto } from '../../../dto/TagDto'
import { ProjectService } from '../Services/ProjectServices'
import { TagService } from '../../Tags/Services/TagServices'
import TagComponent from './TagComponent'
import TagFilter from './TagFilter' // Import TagFilter
import './ProjectCardList.css'

const ProjectCardList = () => {
  const [projects, setProjects] = useState<ProjectDto[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [availableTags, setAvailableTags] = useState<TagDto[]>([]) 
  const [selectedTag, setSelectedTag] = useState<string | null>(null) 
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(3) 
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await ProjectService.getProjectsByUserId()
        setProjects(data)
      } catch (err) {
        setError('Failed to fetch projects.')
      } finally {
        setLoading(false)
      }
    }

    const fetchAvailableTags = async () => {
      try {
        const tags = await TagService.getAllTags()
        setAvailableTags(tags)
      } catch (err) {
        setError('Failed to fetch available tags.')
      }
    }

    fetchProjects()
    fetchAvailableTags()
  }, [])

  const filteredProjects = selectedTag
    ? projects.filter((project) =>
        project.tagProjects.some(({ tag }) => tag.name === selectedTag)
      )
    : projects

  const indexOfLastProject = currentPage * itemsPerPage
  const indexOfFirstProject = indexOfLastProject - itemsPerPage
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject)

  const handleNavigateToTasks = (projectId: string) => {
    navigate(`/tasks/${projectId}`)
  }

  const handleDelete = async (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await ProjectService.deleteProject(projectId)
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.projectId !== projectId)
        )
      } catch (err) {
        setError('Failed to delete the project.')
      }
    }
  }

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredProjects.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  if (loading) return <div>Loading projects...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="grid-container">
      <TagFilter
        availableTags={availableTags}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />

      <div className="grid">
        {currentProjects.map((project) => (
          <div key={project.projectId} className="grid-card">
            <h3 className="grid-card-title">{project.title}</h3>
            <p className="grid-card-description">{project.description}</p>

            {project.tagProjects.length > 0 && (
              <div className="tags-container">
                {project.tagProjects.map(({ tag }) => (
                  <div
                    key={tag.tagId}
                    className={`tag-label ${tag.name.toLowerCase()}`}
                  >
                    #{tag.name}
                  </div>
                ))}
              </div>
            )}

            <TagComponent
              availableTags={availableTags}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              projectId={project.projectId}
              projectTags={project.tagProjects.map(({ tag }) => tag)} 
              setError={setError}
              setProjects={setProjects}
            />

            <div className="grid-card-buttons">
              <button
                className="button-card"
                onClick={() => handleNavigateToTasks(project.projectId)}
              >
                Show Tasks
              </button>
              <button
                className="button-card delete-button"
                onClick={() => handleDelete(project.projectId)}
              >
                Delete Project
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="pagination-controls">
        <button
          className="pagination-button"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {Math.ceil(filteredProjects.length / itemsPerPage)}
        </span>
        <button
          className="pagination-button"
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(filteredProjects.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default ProjectCardList
