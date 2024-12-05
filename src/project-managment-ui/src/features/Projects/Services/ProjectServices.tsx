import { HttpClient } from "../../../configs/HttpClient";
import { CommentDto } from "../../../dto/CommentDto";
import { CreateProjectDto } from "../../../dto/CreateProjectDto";
import { ProjectDto } from "../../../dto/ProjectDto";
import { TagProjectDto } from "../../../dto/TagProjectDto";
import { UpdateProjectDto } from "../../../dto/UpdateProjectDto";

export class ProjectService {
  private static readonly httpClient = new HttpClient({
    baseURL: "http://localhost:5134/projects",
  });

  static async getProjects(): Promise<ProjectDto[]> {
    return ProjectService.httpClient.get<ProjectDto[]>("/getAll");
  }

  static async getProjectsByUserId(): Promise<ProjectDto[]> {
    return ProjectService.httpClient.get<ProjectDto[]>("/getAllByUser");
  }

  static async getProjectById(projectId: string): Promise<ProjectDto> {
    return ProjectService.httpClient.get<ProjectDto>(`/getById/${projectId}`);
  }

  static async createProject(dto: CreateProjectDto): Promise<ProjectDto> {
    return ProjectService.httpClient.post<ProjectDto>("/create", dto);
  }

  static async deleteProject(projectId: string): Promise<ProjectDto> {
    return ProjectService.httpClient.delete<ProjectDto>(`/deleteProject/${projectId}`);
  }

  static async updateProject(projectId: string, dto: UpdateProjectDto): Promise<ProjectDto> {
    return ProjectService.httpClient.put<ProjectDto>(`/update/${projectId}`, dto);
  }

  static async addComment(projectId: string, text: string): Promise<CommentDto> {
    return ProjectService.httpClient.post<CommentDto>(`/addComment/${projectId}`, { text });
  }

  static async deleteComment(commentId: string): Promise<CommentDto> {
    return ProjectService.httpClient.delete<CommentDto>(`/deleteComment/${commentId}`);
  }

  static async addTagToProject(tagId: string, projectId: string): Promise<TagProjectDto> {
    return ProjectService.httpClient.post<TagProjectDto>(`/AddTag/${tagId}/toProject/${projectId}`, null);
  }
}

