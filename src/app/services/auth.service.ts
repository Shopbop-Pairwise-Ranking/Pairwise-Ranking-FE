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

  isAuthenticated$ = this.authToken.asObservable().pipe(
    map(token => token !== null)
  );

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          this.authToken.next(response.token);
        }
      })
    );
  }

  signup(data: any): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/signup`, data);
  }

  logout(): void {
    this.authToken.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.authToken.value !== null;
  }

  getToken(): string | null {
    return this.authToken.value;
  }
}
