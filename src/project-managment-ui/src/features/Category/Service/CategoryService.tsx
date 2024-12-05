import { GenericAbortSignal } from "axios";
import { HttpClient } from "../../../configs/HttpClient";
import { CategoryDto } from "../../../dto/CategoryDto";

export class CategoryService {
  private static httpClient: HttpClient = new HttpClient({
    baseURL: "http://localhost:5134/categories",
  });

  public static async getCategories(signal?: GenericAbortSignal): Promise<CategoryDto[]> {
    return await this.httpClient.get<CategoryDto[]>("GetCategories", { signal });
  }

  public static async getCategoryById(
    categoryId: string,
    signal?: GenericAbortSignal
  ): Promise<CategoryDto> {
    return await this.httpClient.get<CategoryDto>(`GetCategory/${categoryId}`, { signal });
  }

  public static async createCategory(name: string, signal?: GenericAbortSignal): Promise<CategoryDto> {
    return await this.httpClient.post<CategoryDto>("CreateCategory", { name }, { signal });
  }

  public static async updateCategory(
    categoryId: string,
    name: string,
    signal?: GenericAbortSignal
  ): Promise<CategoryDto> {
    return await this.httpClient.put<CategoryDto>(`UpdateCategory/${categoryId}`, { name }, { signal });
  }

  public static async deleteCategory(categoryId: string, signal?: GenericAbortSignal): Promise<CategoryDto> {
    return await this.httpClient.delete<CategoryDto>(`DeleteCategory/${categoryId}`, { signal });
  }
}

