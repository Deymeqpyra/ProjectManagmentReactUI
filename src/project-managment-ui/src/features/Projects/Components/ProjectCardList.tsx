import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectDto } from "../../../dto/ProjectDto";
import { ProjectService } from "../Services/ProjectServices";
import "./ProjectCardList.css";

const ProjectCardList = () => {
  const [projects, setProjects] = useState<ProjectDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await ProjectService.getProjectsByUserId();
        setProjects(data);
      } catch (err) {
        setError("Failed to fetch projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleNavigateToTasks = (projectId: string) => {
    navigate(`/tasks/${projectId}`);
  };

  const handleDelete = async (projectId: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await ProjectService.deleteProject(projectId);
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.projectId !== projectId)
        );
      } catch (err) {
        setError("Failed to delete the project.");
      }
    }
  };

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid-container">
      <div className="grid">
        {projects.map((project) => (
          <div key={project.projectId} className="grid-card">
            <h3 className="grid-card-title">{project.title}</h3>
            <p className="grid-card-description">{project.description}</p>
            
            <div className={`priority-tag ${project.priority.name.toLowerCase()}`}>
              Priority: {project.priority.name}
            </div>
            <br/>
            <div className={`status-tag ${project.status.statusName.toLowerCase()}`}>
              Status: {project.status.statusName}
            </div>
            
            <div className="grid-card-buttons">
              <button
                className="button-card"
                onClick={() => handleNavigateToTasks(project.projectId!)}
              >
                Show Tasks
              </button>
              <button
                className="button-card delete-button"
                onClick={() => handleDelete(project.projectId!)}
              >
                Delete Project
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCardList;
