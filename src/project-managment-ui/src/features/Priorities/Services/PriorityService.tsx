// src/services/PriorityService.ts
import { HttpClient } from "../../../configs/HttpClient";
import { PriorityDto } from "../../../dto/PriorityDto";
import { CreatePriorityDto } from "../../../dto/CreatePriorityDto";
import { UpdatePriorityDto } from "../../../dto/UpdatePriorityDto";

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

  static async createPriority(dto: CreatePriorityDto): Promise<PriorityDto> {
    return this.httpClient.post<PriorityDto>("/CreatePriority", dto);
  }

  static async updatePriority(priorityId: string, dto: UpdatePriorityDto): Promise<PriorityDto> {
    return this.httpClient.put<PriorityDto>(`/UpdatePriority/${priorityId}`, dto);
  }

  static async deletePriority(priorityId: string): Promise<PriorityDto> {
    return this.httpClient.delete<PriorityDto>(`/DeletePriority/${priorityId}`);
  }
}

