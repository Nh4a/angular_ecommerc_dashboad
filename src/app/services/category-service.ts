import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryFormModel, CategoryModel } from '../models/category-model';
import { Response } from '../models/response';
import { checkCleanGit } from '@angular/cli/src/commands/update/utilities/git';
import { CategoryForm } from '../components/forms/category-form/category-form';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl: string = 'http://localhost:3000';
  private categories = signal<CategoryModel[]>([]);
  public isLoading = signal<boolean>(false);
  public isModifying = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  public getActiveCategory(): number {
    return this.categories().filter((item) => item.status).length;
  }

  public getInActiveCategory(): number {
    return this.categories().filter((item) => !item.status).length;
  }

  public getCategories(): CategoryModel[] {
    return this.categories();
  }

  public fetchCategories(): void {
    this.isLoading.set(true);

    this.http.get<Response<CategoryModel[]>>(this.baseUrl + '/api/category').subscribe({
      next: (res) => {
        this.categories.set(res.data);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  public create(reqBody: CategoryFormModel): Observable<Response<CategoryFormModel>> {
    return this.http.post<Response<CategoryModel>>(this.baseUrl + '/api/category', reqBody);
  }

  public update(id: string, reqBody: CategoryFormModel): Observable<Response<CategoryModel>> {
    return this.http.put<Response<CategoryModel>>(this.baseUrl + `/api/category/${id}`, {
      ...reqBody,
    });
  }

  public _delete(id: string): void {
    this.isModifying.set(true);
    this.http.delete<Response<CategoryModel>>(this.baseUrl + '/api/category/' + id).subscribe({
      next: (res) => {
        if (res.success) {
          const removedCategory = [...this.categories()].filter((c) => c._id !== id);
          this.categories.set(removedCategory);
        }
      },
      complete: () => {
        this.isModifying.set(false);
      },
    });
  }
}
