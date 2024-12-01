import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectCardList from "./ProjectCardList";
import CreateProject from "./CreateProject";
import "./ProjectContainer.css"; // Assuming you have a CSS file for styling

const ProjectContainer = () => {
  const [isCreatingProject, setIsCreatingProject] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleCreateProjectClick = () => {
    setIsCreatingProject(true);
  };

  const handleBackToProjects = () => {
    setIsCreatingProject(false);
    navigate('/projects');
  };

  return (
    <div className="project-container">
      <h1>Project Management</h1>

      {isCreatingProject ? (
        <div>
          <button onClick={handleBackToProjects}>Back to Projects</button>
          <CreateProject />
        </div>
      ) : (
        <div>
          <button onClick={handleCreateProjectClick}>Create New Project</button>
          <ProjectCardList />
        </div>
      )}
    </div>
  );
};

export default ProjectContainer;
