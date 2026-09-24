import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user-model';
import { Response } from '../models/response';
import { UserFormModel } from '../models/user-form-model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public isLoading = signal<boolean>(false);
  public isModifying = signal<boolean>(false);
  private users = signal<UserModel[]>([]);
  private apiURL = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  public getUsers(): UserModel[] {
    return this.users();
  }

  public fetchUser() {
    this.isLoading.set(true);
    this.http.get<Response<UserModel[]>>(this.apiURL).subscribe({
      next: (res) => {
        if (res.success) {
          this.users.set(res.data);
        }
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  public createUser(user: UserFormModel) {
    return this.http.post<Response<UserModel[]>>(this.apiURL, { ...user });
  }

  public updateUser(id: string, user: UserFormModel) {
    delete user.password;
    return this.http.put<Response<UserModel[]>>(this.apiURL + `/${id}`, user);
  }

  public resetPassword(id: string, newPassword: string) {
    return this.http.patch<Response<any>>(this.apiURL + `/reset-password/${id}`, { newPassword });
  }

  public deleteOne(id:string){
    return this.http.delete<Response<any>>(this.apiURL + `/${id}`);
  }
}
