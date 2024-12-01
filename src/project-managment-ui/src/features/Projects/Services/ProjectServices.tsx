import { HttpClient } from "../../../configs/HttpClient";
import { ProjectDto } from "../../../dto/ProjectDto";
import { CommentDto } from "../../../dto/CommentDto";
import { TagProjectDto } from "../../../dto/TagProjectDto";
import { ProjectUsersDto } from "../../../dto/ProjectUsersDto";
import { CreateProjectDto } from "../../../dto/CreateProjectDto";
import { UpdateProjectDto } from "../../../dto/UpdateProjectDto";

export class ProjectService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient({
      baseURL: "http://localhost:5134/projects",
    });
  }

  async getProjects(): Promise<ProjectDto[]> {
    return this.httpClient.get<ProjectDto[]>("/getAll");
  }

  async getProjectsByUserId(): Promise<ProjectDto[]> {
    return this.httpClient.get<ProjectDto[]>("/getAllByUser");
  }

  async getProjectById(projectId: string): Promise<ProjectDto> {
    return this.httpClient.get<ProjectDto>(`/getById/${projectId}`);
  }

  async createProject(dto: CreateProjectDto): Promise<ProjectDto> {
    return this.httpClient.post<ProjectDto>("/create", dto);
  }
  async deleteProject(projectId: string): Promise<ProjectDto> {
    return this.httpClient.delete<ProjectDto>(`/deleteProject/${projectId}`);
  }
  async updateProject(projectId: string, dto: UpdateProjectDto): Promise<ProjectDto> {
    return this.httpClient.put<ProjectDto>(`/update/${projectId}`, dto);
  }

  async addComment(projectId: string, text: string): Promise<CommentDto> {
    return this.httpClient.post<CommentDto>(`/addComment/${projectId}`, { text });
  }

  async deleteComment(commentId: string): Promise<CommentDto> {
    return this.httpClient.delete<CommentDto>(`/deleteComment/${commentId}`);
  }

  async addTagToProject(tagId: string, projectId: string): Promise<TagProjectDto> {
    return this.httpClient.post<TagProjectDto>(`/AddTag/${tagId}/toProject/${projectId}`, null);
  }
}
