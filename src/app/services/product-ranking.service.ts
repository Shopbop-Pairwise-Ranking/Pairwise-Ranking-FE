import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductRankingService {
  http = inject(HttpClient);

  getProducts(userId: string, category: string, gender: string): Observable<any> {
    const params = `?userId=${userId}&category=${category}&gender=${gender}`;
    return this.http.get(`${environment.apiBaseUrl}/api/getProducts${params}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  submitRankings(payload: any, userId: string, categoryId: string): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/api/update-ranking/user/${userId}/category/${categoryId}`, payload);
  }

}
