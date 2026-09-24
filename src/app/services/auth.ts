import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '../models/response';
import { AuthResponse } from '../models/auth-response';
import { Router } from '@angular/router';
import { ProfileService } from './profile-service';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  message = signal<string>(' ');
  private apiURL = 'http://localhost:3000/api';

  private token?: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private pfService: ProfileService,
  ) {}

  public getToken(): string {
    return localStorage.getItem('token') || '';
  }

  public login(email: string, password: string) {
    this.http
      .post<AuthResponse>(this.apiURL + '/auth/login', {
        email,
        password,
      })
      .subscribe({
        next: async (res) => {
          if (res.success) {
            localStorage.setItem('token', JSON.stringify(res.token));

            this.pfService.fetchProfile();
          }
        },
        error: (res) => {
          console.log(res);
          this.message.set(res.error.message);

          setTimeout(() => {
            this.message.set('');
          }, 10000);
        },
      });
  }
}
