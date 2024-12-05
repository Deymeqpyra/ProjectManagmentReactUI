import { HttpClient } from '../../../configs/HttpClient'
import { CreateStatusDto } from '../../../dto/CreateStatusDto'
import { StatusDto } from '../../../dto/StatusDto'
import { UpdateStatusDto } from '../../../dto/UpdateStatusDto'

export class StatusService {
  private static httpClient: HttpClient

  static {
    this.httpClient = new HttpClient({
      baseURL: 'http://localhost:5134/status',
    })
  }

  static async getAllStatuses(): Promise<StatusDto[]> {
    return this.httpClient.get<StatusDto[]>('/GetAll')
  }

  static async getStatusById(statusId: string): Promise<StatusDto> {
    return this.httpClient.get<StatusDto>(`/GetById/${statusId}`)
  }

  static async createStatus(title: string): Promise<StatusDto> {
    return this.httpClient.post<StatusDto>('/Create', { title })
  }

  static async updateStatus(
    statusId: string,
    title: string
  ): Promise<StatusDto> {
    return this.httpClient.put<StatusDto>(`/Update/${statusId}`, title)
  }

  static async deleteStatus(statusId: string): Promise<StatusDto> {
    return this.httpClient.delete<StatusDto>(`/Delete/${statusId}`)
  }
}
