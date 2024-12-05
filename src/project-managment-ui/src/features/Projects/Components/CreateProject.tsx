import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectService } from '../Services/ProjectServices';
import { PriorityService } from '../../Priorities/Services/PriorityService';
import './CreateProject.css';
import { PriorityDto } from '../../../dto/PriorityDto';
import { CreateProjectDto } from '../../../dto/CreateProjectDto';

const CreateProject = () => {
  const [formData, setFormData] = useState<CreateProjectDto>({
    title: '',
    description: '',
    priorityId: ''
  });

  const [priorities, setPriorities] = useState<PriorityDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const projectService = new ProjectService();
  const priorityService = new PriorityService(); 

  const fetchPrioritiesAndStatuses = useCallback(async () => {
    try {
      setLoading(true);
      const prioritiesResponse = await priorityService.getAllPriorities(); 
      setPriorities(prioritiesResponse);
      console.log(prioritiesResponse);
    } catch (err) {
      setError('Failed to load priorities or statuses');
    } finally {
      setLoading(false);
    }
  }, []); 

  useEffect(() => {
    fetchPrioritiesAndStatuses();
  }, [fetchPrioritiesAndStatuses]); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const projectData = await projectService.createProject(formData);  
      navigate('/projects'); 
    } catch (err) {
      setError('Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-project-container">
      <h2>Create New Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="priorityId">Priority:</label>
          <select
            id="priorityId"
            name="priorityId"
            value={formData.priorityId}
            onChange={handleChange}
            required
          >
            <option value="">Select Priority</option>
            {priorities.map((priority) => (
              <option key={priority.priorityId} value={priority.priorityId}>
                {priority.name} 
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Project'}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default CreateProject;
