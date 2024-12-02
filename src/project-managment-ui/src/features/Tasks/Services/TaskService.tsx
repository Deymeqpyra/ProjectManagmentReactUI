import { HttpClient } from "../../../configs/HttpClient";
import { CreateProjectDto } from "../../../dto/CreateProjectDto";
import { CreateTaskDto } from "../../../dto/CreateTaskDto";
import { ProjectTaskDto } from "../../../dto/ProjectTaskDto";

export class TaskService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient({
      baseURL: "http://localhost:5134/tasks",
    });
  }

  async getTasksByProjectId(projectId: string): Promise<ProjectTaskDto[]> {
    return this.httpClient.get<ProjectTaskDto[]>(`/GetByProjectId/${projectId}`);
  }

  async finishTask(taskId: string): Promise<ProjectTaskDto> {
    return this.httpClient.put<ProjectTaskDto>(`/finishtask/${taskId}`, null);
  }

  async createTask(projectId: string, taskData: CreateTaskDto): Promise<ProjectTaskDto> {
    return this.httpClient.post<ProjectTaskDto>(`/CreateTask/${projectId}`, taskData);
  }

  async deleteTask(taskId: string): Promise<ProjectTaskDto> {
    return this.httpClient.delete<ProjectTaskDto>(`/Delete/${taskId}`);
  }
}
