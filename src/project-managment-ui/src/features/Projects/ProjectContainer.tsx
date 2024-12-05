import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectCardList from "./Components/ProjectCardList";
import CreateProject from "./Components/CreateProject";
import "./ProjectContainer.css";

const ProjectContainer = () => {
  const [isCreatingProject, setIsCreatingProject] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleCreateProjectClick = () => {
    setIsCreatingProject(true);
  };

  const handleBackToProjects = () => {
    setIsCreatingProject(false);
    navigate("/projects");
  };

  return (
    <div className="project-container">
      <h1 className="title">Project Management</h1>

      {isCreatingProject ? (
        <div className="create-project-section">
          <button className="btn back-button" onClick={handleBackToProjects}>
            Back to Projects
          </button>
          <CreateProject />
        </div>
      ) : (
        <div className="projects-section">
          <div className="actions">
            <button className="btn create-button" onClick={handleCreateProjectClick}>
              Create New Project
            </button>
          </div>
          <ProjectCardList />
        </div>
      )}
    </div>
  );
};

export default ProjectContainer;
