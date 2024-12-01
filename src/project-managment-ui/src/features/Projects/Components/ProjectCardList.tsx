import React, { useEffect, useState } from "react";
import { ProjectDto } from "../../../dto/ProjectDto";
import { ProjectService } from "../Services/ProjectServices";
import "./ProjectCardList.css"; 

const ProjectCardList = () => {
  const [projects, setProjects] = useState<ProjectDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const projectService = new ProjectService();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getProjectsByUserId();
        setProjects(data);
        console.log(data);
      } catch (err) {
        setError("Failed to fetch projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (projectId: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await projectService.deleteProject(projectId);
        setProjects((prevProjects) => prevProjects.filter(project => project.projectId !== projectId));
      } catch (err) {
        setError("Failed to delete the project.");
      }
    }
  };

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="card-list">
      {projects.map((project) => (
        <div key={project.projectId} className="card">
          <h3 className="card-title">{project.title}</h3>
          <p className="card-description">{project.description}</p>
          <small className="card-priority">Priority: {project.priority.name}</small>
          <br />
          <small className="card-status">Status: {project.status.statusName}</small>
          <br/>
          <button className="button-card">Show task</button>
          <button 
            onClick={() => handleDelete(project.projectId)}
          >
            Delete Project
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProjectCardList;
