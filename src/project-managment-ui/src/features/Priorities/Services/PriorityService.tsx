// src/services/PriorityService.ts
import { HttpClient } from "../../../configs/HttpClient";
import { CreatePriorityDto } from "../../../dto/CreatePriorityDto";
import { PriorityDto } from "../../../dto/PriorityDto";

export class PriorityService {
  private static readonly httpClient = new HttpClient({
    baseURL: "http://localhost:5134/priorities", 
  });

  static async getAllPriorities(): Promise<PriorityDto[]> {
    return this.httpClient.get<PriorityDto[]>("/GetAllPriorities");
  }

  static async getPriorityById(priorityId: string): Promise<PriorityDto> {
    return this.httpClient.get<PriorityDto>(`/GetById/${priorityId}`);
  }

  static async createPriority(title: string): Promise<PriorityDto> {
    return this.httpClient.post<PriorityDto>("/CreatePriority", { title });
  }

  static async updatePriority(priorityId: string, updateTitle: CreatePriorityDto): Promise<PriorityDto> {
    return this.httpClient.put<PriorityDto>(`/UpdatePriority/${priorityId}`, updateTitle);
  }

  static async deletePriority(priorityId: string): Promise<PriorityDto> {
    return this.httpClient.delete<PriorityDto>(`/DeletePriority/${priorityId}`);
  }
}

