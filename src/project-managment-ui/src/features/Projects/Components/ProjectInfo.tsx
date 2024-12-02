import React from 'react'
import { ProjectDto } from '../../../dto/ProjectDto'

interface ProjectInfoProps {
  project: ProjectDto
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ project }) => {
  return (
    <div className="project-info">
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <small>Priority: {project.priority?.name || 'No Priority'}</small>
      <br />
      <small>Status: {project.status?.statusName || 'No Status'}</small>
    </div>
  )
}

export default ProjectInfo
