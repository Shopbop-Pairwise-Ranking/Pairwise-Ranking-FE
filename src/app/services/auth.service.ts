import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);
  private authToken = new BehaviorSubject<string | null>(null);
  private userId = new BehaviorSubject<string | null>(null);

  isAuthenticated$ = this.authToken.asObservable().pipe(
    map(token => token !== null)
  );

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/api/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token && response.userId) {
          this.authToken.next(response.token);
          this.userId.next(response.userId);
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.userId);
        }
      })
    );
  }

  signup(data: any): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/api/signup`, data);
  }

  logout(): void {
    this.authToken.next(null);
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token) {
      this.authToken.next(token);
      this.userId.next(userId);
    }

    return this.authToken.value !== null;
  }

  getToken(): string | null {
    return this.authToken.value;
  }

  getUserId(): string | null {
    return this.userId.value;
  }
}
