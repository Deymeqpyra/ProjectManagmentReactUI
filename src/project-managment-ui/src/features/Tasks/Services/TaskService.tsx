import { HttpClient } from "../../../configs/HttpClient";
import { CreateTaskDto } from "../../../dto/CreateTaskDto";
import { ProjectTaskDto } from "../../../dto/ProjectTaskDto";

export class TaskService {
  private static readonly httpClient = new HttpClient({
    baseURL: "http://localhost:5134/tasks",
  });

  static async getTasksByProjectId(projectId: string): Promise<ProjectTaskDto[]> {
    return TaskService.httpClient.get<ProjectTaskDto[]>(`/GetByProjectId/${projectId}`);
  }

  static async finishTask(taskId: string): Promise<ProjectTaskDto> {
    return TaskService.httpClient.put<ProjectTaskDto>(`/finishtask/${taskId}`, null);
  }

  static async createTask(projectId: string, taskData: CreateTaskDto): Promise<ProjectTaskDto> {
    return TaskService.httpClient.post<ProjectTaskDto>(`/CreateTask/${projectId}`, taskData);
  }

  static async deleteTask(taskId: string): Promise<ProjectTaskDto> {
    return TaskService.httpClient.delete<ProjectTaskDto>(`/Delete/${taskId}`);
  }
}

