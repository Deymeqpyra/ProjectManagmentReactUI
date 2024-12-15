import { HttpClient } from "../../../configs/HttpClient";
import { TagDto } from "../../../dto/TagDto";
import { CreateTagDto } from "../../../dto/CreateTagDto";

export class TagService {
  private static readonly httpClient = new HttpClient({
    baseURL: "http://localhost:5134/tags",
  });

  // Get all tags
  static async getAllTags(): Promise<TagDto[]> {
    return TagService.httpClient.get<TagDto[]>("/GetAllTags");
  }

  // Add a new tag
  static async addTag(tagName: CreateTagDto): Promise<TagDto> {
    return TagService.httpClient.post<TagDto>("/AddTag", tagName);
  }

  // Update an existing tag
  static async updateTag(tagId: string, tagName: CreateTagDto): Promise<TagDto> {
    return TagService.httpClient.put<TagDto>(`/UpdateTag/${tagId}`, tagName);
  }

  // Get a tag by ID
  static async getTagById(tagId: string): Promise<TagDto> {
    return TagService.httpClient.get<TagDto>(`/GetTagById/${tagId}`);
  }

  // Delete a tag
  static async deleteTag(tagId: string): Promise<void> {
    return TagService.httpClient.delete<void>(`/DeleteTag/${tagId}`);
  }
}
