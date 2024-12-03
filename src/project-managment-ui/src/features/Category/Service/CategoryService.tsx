import { GenericAbortSignal } from "axios";
import { HttpClient } from "../../../configs/HttpClient";
import { CategoryDto } from "../../../dto/CategoryDto";

export class CategoryService {  // static vs class
  private httpClient: HttpClient; // api service implemitation using static class

  constructor(signal?: GenericAbortSignal) {
    this.httpClient = new HttpClient({
      baseURL: "http://localhost:5134/categories",
      signal,
    });
  }

  public async getCategories(): Promise<CategoryDto[]> {
    return await this.httpClient.get<CategoryDto[]>("/GetCategories");
  }

  public async getCategoryById(categoryId: string): Promise<CategoryDto> {
    return await this.httpClient.get<CategoryDto>(`/GetCategory/${categoryId}`);
  }

  public async createCategory(name: string): Promise<CategoryDto> {
    return await this.httpClient.post<CategoryDto>("/CreateCategory", { name });
  }

  public async updateCategory(categoryId: string, name: string): Promise<CategoryDto> {
    return await this.httpClient.put<CategoryDto>(`/UpdateCategory/${categoryId}`, { name });
  }

  public async deleteCategory(categoryId: string): Promise<CategoryDto> {
    return await this.httpClient.delete<CategoryDto>(`/DeleteCategory/${categoryId}`);
  }
}
