import { HttpClient } from "../../../configs/HttpClient";
import { StatusDto } from "../../../dto/StatusDto";
import { CreateStatusDto } from "../../../dto/CreateStatusDto";
import { UpdateStatusDto } from "../../../dto/UpdateStatusDto";

export class StatusService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient({
      baseURL: "http://localhost:5134/status", // API base URL for statuses
    });
  }

  // Get all statuses
  async getAllStatuses(): Promise<StatusDto[]> {
    return this.httpClient.get<StatusDto[]>("/GetAll");
  }

  // Get a single status by its ID
  async getStatusById(statusId: string): Promise<StatusDto> {
    return this.httpClient.get<StatusDto>(`/GetById/${statusId}`);
  }

  // Create a new status
  async createStatus(dto: CreateStatusDto): Promise<StatusDto> {
    return this.httpClient.post<StatusDto>("/Create", dto);
  }

  // Update an existing status
  async updateStatus(statusId: string, dto: UpdateStatusDto): Promise<StatusDto> {
    return this.httpClient.put<StatusDto>(`/Update/${statusId}`, dto);
  }

  // Delete a status by its ID
  async deleteStatus(statusId: string): Promise<StatusDto> {
    return this.httpClient.delete<StatusDto>(`/Delete/${statusId}`);
  }
}
