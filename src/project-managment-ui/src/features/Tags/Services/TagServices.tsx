import { HttpClient } from "../../../configs/HttpClient";
import { TagDto } from "../../../dto/TagDto";
import { CreateTagDto } from "../../../dto/CreateTagDto";

export class TagService {
  private static readonly httpClient = new HttpClient({
    baseURL: "http://localhost:5134/tags",
  });

  static async getAllTags(): Promise<TagDto[]> {
    return TagService.httpClient.get<TagDto[]>("/GetAllTags");
  }

  static async addTag(tagName: CreateTagDto): Promise<TagDto> {
    return TagService.httpClient.post<TagDto>("/AddTag", tagName);
  }

  static async updateTag(tagId: string, tagName: CreateTagDto): Promise<TagDto> {
    return TagService.httpClient.put<TagDto>(`/UpdateTag/${tagId}`, tagName);
  }

  static async getTagById(tagId: string): Promise<TagDto> {
    return TagService.httpClient.get<TagDto>(`/GetTagById/${tagId}`);
  }

  static async deleteTag(tagId: string): Promise<void> {
    return TagService.httpClient.delete<void>(`/DeleteTag/${tagId}`);
  }
}
