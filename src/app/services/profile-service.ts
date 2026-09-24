import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { ProfileModel } from '../models/profile-model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiURL = 'http://localhost:3000/api';
  private profile = signal<ProfileModel>({
    name: '',
    email: '',
    role: '',
    isActive: false,
    createdAt: '',
    updatedAt: '',
  });
  constructor(private http: HttpClient, private router :Router) { }

  public getProfile():ProfileModel{
    return this.profile()
  }

  public async logout():Promise<void> {
    localStorage.removeItem('token');
    await this.router.navigate(['login']);
  }

  public fetchProfile() {
    this.http.post<ProfileModel>(this.apiURL + '/users/profile', {}).subscribe({
      next: (response: ProfileModel) => {
        this.profile.set(response);
      },
      error: async(error) => {
        console.log(error);
        await this.router.navigate(['login']);
      },
      complete: async () => {
        if (this.getProfile().role !== 'admin') {
          await this.router.navigate(['/unauthorize']);
          return;
        }else if(this.router&&this.router.url=='/login'){
          await this.router.navigate(['/']);
          return
        }
      },
    });
  }
}
