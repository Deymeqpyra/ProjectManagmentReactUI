// src/services/PriorityService.ts
import { HttpClient } from "../../../configs/HttpClient";
import { PriorityDto } from "../../../dto/PriorityDto";
import { CreatePriorityDto } from "../../../dto/CreatePriorityDto";
import { UpdatePriorityDto } from "../../../dto/UpdatePriorityDto";

export class PriorityService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient({
      baseURL: "http://localhost:5134/priorities", // API base URL for priorities
    });
  }

  // Get all priorities
  async getAllPriorities(): Promise<PriorityDto[]> {
    return this.httpClient.get<PriorityDto[]>("/GetAllPriorities");
  }

  // Get a single priority by its ID
  async getPriorityById(priorityId: string): Promise<PriorityDto> {
    return this.httpClient.get<PriorityDto>(`/GetById/${priorityId}`);
  }

  // Create a new priority
  async createPriority(dto: CreatePriorityDto): Promise<PriorityDto> {
    return this.httpClient.post<PriorityDto>("/CreatePriority", dto);
  }

  // Update an existing priority
  async updatePriority(priorityId: string, dto: UpdatePriorityDto): Promise<PriorityDto> {
    return this.httpClient.put<PriorityDto>(`/UpdatePriority/${priorityId}`, dto);
  }

  // Delete a priority by its ID
  async deletePriority(priorityId: string): Promise<PriorityDto> {
    return this.httpClient.delete<PriorityDto>(`/DeletePriority/${priorityId}`);
  }
}
